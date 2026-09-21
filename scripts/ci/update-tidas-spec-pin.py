#!/usr/bin/env python3

"""Apply an exact tidas_spec_released event to the SDK's immutable spec pin.

The receiver is intentionally strict: an exact replay is a no-op, a newer
version updates the pin, and a same-version/different-identity or older event
fails closed. This keeps a released version immutable even when repository
dispatch delivery is retried or reordered.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
PIN_PATH = Path("scripts/ci/tidas-spec-pin.json")
PACKAGE = "@tiangong-lca/tidas-spec"
SHA256 = re.compile(r"^[0-9a-f]{64}$")
COMMIT = re.compile(r"^[0-9a-f]{40}$")
VERSION = re.compile(r"^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$")

# The SDK qualified this exact, explicitly non-release 0.2.0 candidate before
# the public 0.2.0 archive was published. Its packaged README changed before
# publication, so it remains a one-time exception to the byte-identity rule.
REVIEWED_CANDIDATE_020 = (
    PACKAGE,
    "0.2.0",
    "58dc72f5cb2d203a00388fec71d31091911f7dde",
    "45da9de790ffcdadd1984ffc3544c67a1503c0947470a629e8252aed19100228",
    "4677b9cf864326be9d430bf9760c754c4c0c1905d90e62c161655a159fd758c7",
)
FORMAL_RELEASE_020 = (
    PACKAGE,
    "0.2.0",
    "f71ed3002048f0f6a858b93e6e71830ef16a7145",
    "40adef78b3691a7327c282afd2e0eb1a93aa38804610e9ef87c43fea9ccffda2",
    "a6ce771bd06a601c6defdddb1e49a694e42f4a9a0d549f28ca88a45ef830f75d",
)


class SpecPinError(ValueError):
    """A stale or malformed release event."""


def version_key(version: str) -> tuple[int, int, int, tuple[str, ...]]:
    match = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)(?:-(.*))?", version)
    if match is None:
        raise SpecPinError(f"invalid semantic version: {version}")
    prerelease = tuple((match.group(4) or "").split(".")) if match.group(4) else ()
    return (int(match.group(1)), int(match.group(2)), int(match.group(3)), prerelease)


def _required(payload: dict, key: str) -> str:
    value = payload.get(key)
    if not isinstance(value, str) or not value:
        raise SpecPinError(f"missing {key}")
    return value


def validate_event(payload: dict) -> dict:
    if not isinstance(payload, dict):
        raise SpecPinError("client payload must be an object")
    package = _required(payload, "package")
    if package != PACKAGE:
        raise SpecPinError(f"unexpected package: {package}")
    version = _required(payload, "version")
    source_commit = _required(payload, "source_commit")
    archive_file = _required(payload, "archive_file")
    archive_url = _required(payload, "archive_url")
    archive_sha256 = _required(payload, "archive_sha256")
    manifest_sha256 = _required(payload, "manifest_sha256")
    event_key = _required(payload, "event_key")
    if VERSION.fullmatch(version) is None:
        raise SpecPinError("version is not semantic")
    if COMMIT.fullmatch(source_commit) is None:
        raise SpecPinError("source_commit must be a lowercase 40-character SHA")
    if SHA256.fullmatch(archive_sha256) is None or SHA256.fullmatch(manifest_sha256) is None:
        raise SpecPinError("archive_sha256 and manifest_sha256 must be lowercase SHA256 values")
    expected_file = f"tiangong-lca-tidas-spec-{version}.tgz"
    expected_url = f"https://github.com/tiangong-lca/tidas-spec/releases/download/v{version}/{expected_file}"
    if archive_file != expected_file or archive_url != expected_url:
        raise SpecPinError("archive identity is not the canonical immutable GitHub asset")
    expected_key = f"{package}@{version}:{archive_sha256}:{manifest_sha256}"
    if event_key != expected_key:
        raise SpecPinError("event_key does not match the release identity")
    packages = payload.get("packages", ["typescript", "python"])
    if isinstance(packages, str):
        packages = [packages]
    if not isinstance(packages, list) or not packages or any(item not in {"typescript", "python"} for item in packages):
        raise SpecPinError("packages must contain only typescript and/or python")
    return {
        "package": package,
        "version": version,
        "sourceCommit": source_commit,
        "sourceRef": f"v{version}",
        "archiveFile": archive_file,
        "archiveSha256": archive_sha256,
        "manifestFile": "spec-manifest.json",
        "manifestPathInArchive": "package/spec-manifest.json",
        "manifestSha256": manifest_sha256,
        "releaseArchiveUrl": archive_url,
        "eventKey": event_key,
    }


def event_identity(pin: dict) -> tuple[str, str, str, str, str]:
    return (
        str(pin.get("package", "")),
        str(pin.get("version", "")),
        str(pin.get("sourceCommit", "")),
        str(pin.get("archiveSha256", "")),
        str(pin.get("manifestSha256", "")),
    )


def is_identical_candidate_promotion(current: dict, event: dict) -> bool:
    """Accept only a candidate-to-release provenance upgrade for identical bytes."""

    source_commit = str(current.get("sourceCommit", ""))
    version = str(current.get("version", ""))
    archive_file = str(current.get("archiveFile", ""))
    expected_candidate_url = (
        f"https://raw.githubusercontent.com/tiangong-lca/tidas-spec/{source_commit}/"
        f"release/{archive_file}"
    )
    return (
        current.get("package") == event["package"]
        and version == event["version"]
        and COMMIT.fullmatch(source_commit) is not None
        and current.get("sourceRef") == f"candidate/{source_commit}"
        and archive_file == event["archiveFile"]
        and current.get("archiveSha256") == event["archiveSha256"]
        and current.get("manifestSha256") == event["manifestSha256"]
        and current.get("releaseArchiveUrl") == expected_candidate_url
        and "not a formal tidas-spec release" in str(current.get("note", ""))
    )


def apply_event(pin_path: Path, payload: dict) -> bool:
    event = validate_event(payload)
    current = json.loads(pin_path.read_text(encoding="utf-8"))
    current_identity = event_identity(current)
    incoming_identity = (
        event["package"], event["version"], event["sourceCommit"], event["archiveSha256"], event["manifestSha256"]
    )
    if current_identity == incoming_identity and current.get("releaseArchiveUrl") == event["releaseArchiveUrl"]:
        return False
    current_version = current.get("version")
    if isinstance(current_version, str) and VERSION.fullmatch(current_version):
        if version_key(event["version"]) < version_key(current_version):
            raise SpecPinError(f"stale release event {event['version']} is older than pinned {current_version}")
        historical_reviewed_promotion = (
            current_identity == REVIEWED_CANDIDATE_020
            and incoming_identity == FORMAL_RELEASE_020
            and current.get("sourceRef") == "candidate/58dc72f5cb2d203a00388fec71d31091911f7dde"
            and current.get("releaseArchiveUrl") == "https://raw.githubusercontent.com/tiangong-lca/tidas-spec/58dc72f5cb2d203a00388fec71d31091911f7dde/release/tiangong-lca-tidas-spec-0.2.0.tgz"
            and "not a formal tidas-spec release" in str(current.get("note", ""))
        )
        identical_candidate_promotion = is_identical_candidate_promotion(current, event)
        if event["version"] == current_version and not (
            historical_reviewed_promotion or identical_candidate_promotion
        ):
            raise SpecPinError("conflicting release identity for an already pinned version")
    updated = dict(current)
    updated.update({
        "package": event["package"],
        "version": event["version"],
        "sourceCommit": event["sourceCommit"],
        "sourceRef": event["sourceRef"],
        "archiveFile": event["archiveFile"],
        "archiveSha256": event["archiveSha256"],
        "manifestFile": event["manifestFile"],
        "manifestPathInArchive": event["manifestPathInArchive"],
        "manifestSha256": event["manifestSha256"],
        "releaseArchiveUrl": event["releaseArchiveUrl"],
    })
    # Candidate-only provenance is not valid evidence for a later formal release.
    # Formal archives derive authored paths from their hash-verified manifest.
    updated.pop("repositoryAuthoredPaths", None)
    updated.pop("note", None)
    pin_path.write_text(json.dumps(updated, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return True


def load_payload(path: Path) -> dict:
    document = json.loads(path.read_text(encoding="utf-8"))
    return document.get("client_payload", document)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--event-file", type=Path, required=True)
    parser.add_argument("--pin-path", type=Path, default=REPO_ROOT / PIN_PATH)
    args = parser.parse_args()
    try:
        changed = apply_event(args.pin_path.resolve(), load_payload(args.event_file.resolve()))
    except (OSError, json.JSONDecodeError, SpecPinError) as exc:
        raise SystemExit(f"error: {exc}") from exc
    print("updated" if changed else "exact replay; unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
