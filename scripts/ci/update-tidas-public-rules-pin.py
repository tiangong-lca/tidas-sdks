#!/usr/bin/env python3

"""Refresh the SDK's public-rule pin from its verified specification archive."""

from __future__ import annotations

import argparse
import hashlib
import json
import tarfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
SPEC_PIN = Path("scripts/ci/tidas-spec-pin.json")
RULES_PIN = Path("scripts/ci/tidas-public-rules-pin.json")
ASSET_ROOT = Path("sdks/typescript/src/contracts/public-rules-assets")
RULES = {
    "index": "assets/tidas/rules/public-rules.v1.json",
    "schema": "assets/tidas/rules/public-rules.v1.schema.json",
}
MAX_ARCHIVE_BYTES = 16 * 1024 * 1024


class PublicRulesPinError(ValueError):
    """The requested archive cannot supply the pinned public-rule identity."""


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def archive_member(archive: tarfile.TarFile, path: str) -> bytes:
    member = archive.getmember(f"package/{path}")
    if not member.isfile() or member.size > MAX_ARCHIVE_BYTES:
        raise PublicRulesPinError(f"invalid archive member: {path}")
    stream = archive.extractfile(member)
    if stream is None:
        raise PublicRulesPinError(f"unreadable archive member: {path}")
    return stream.read()


def update_public_rules(root: Path, archive_path: Path) -> bool:
    spec_pin = json.loads((root / SPEC_PIN).read_text(encoding="utf-8"))
    old_pin = json.loads((root / RULES_PIN).read_text(encoding="utf-8"))
    if spec_pin.get("package") != "@tiangong-lca/tidas-spec":
        raise PublicRulesPinError("unexpected specification package")
    if spec_pin.get("sourceRef") != f"v{spec_pin.get('version')}":
        raise PublicRulesPinError("public rules require a formal specification release")
    if old_pin.get("schema_version") != "tidas.public-rules-source.v1":
        raise PublicRulesPinError("unsupported public-rules pin")
    if old_pin.get("repository") != "https://github.com/tiangong-lca/tidas-spec.git":
        raise PublicRulesPinError("unexpected public-rules source repository")
    for role, path in RULES.items():
        bundled = root / ASSET_ROOT / Path(path).name
        if digest(bundled.read_bytes()) != old_pin.get("assets", {}).get(role, {}).get("sha256"):
            raise PublicRulesPinError(f"bundled public-rules {role} has drifted")
    if archive_path.is_symlink() or not archive_path.is_file():
        raise PublicRulesPinError("specification archive must be a regular file")
    if archive_path.stat().st_size > MAX_ARCHIVE_BYTES:
        raise PublicRulesPinError("specification archive exceeds the byte limit")
    if archive_path.name != spec_pin.get("archiveFile"):
        raise PublicRulesPinError("specification archive filename conflicts with the pin")
    if digest(archive_path.read_bytes()) != spec_pin.get("archiveSha256"):
        raise PublicRulesPinError("specification archive digest conflicts with the pin")

    with tarfile.open(archive_path, mode="r:gz") as archive:
        manifest_bytes = archive_member(archive, "spec-manifest.json")
        if digest(manifest_bytes) != spec_pin.get("manifestSha256"):
            raise PublicRulesPinError("specification manifest digest conflicts with the pin")
        manifest = json.loads(manifest_bytes)
        if manifest.get("package") != {
            "name": spec_pin["package"],
            "version": spec_pin["version"],
        }:
            raise PublicRulesPinError("specification manifest package identity conflicts with the pin")
        declared = {
            item["path"]: item["sha256"]
            for item in manifest.get("files", [])
            if isinstance(item, dict) and isinstance(item.get("path"), str)
        }
        assets = {}
        for role, path in RULES.items():
            data = archive_member(archive, path)
            actual = digest(data)
            if declared.get(path) != actual:
                raise PublicRulesPinError(f"manifest does not bind public-rules {role}")
            assets[role] = {"path": path, "sha256": actual, "bytes": data}

    index = json.loads(assets["index"]["bytes"])
    if index.get("schema_version") != 1 or not isinstance(index.get("rules_version"), str):
        raise PublicRulesPinError("public-rules index has an invalid version")
    new_pin = {
        "schema_version": old_pin["schema_version"],
        "repository": old_pin["repository"],
        "commit": spec_pin["sourceCommit"],
        "rules_version": index["rules_version"],
        "assets": {
            role: {key: assets[role][key] for key in ("path", "sha256")}
            for role in RULES
        },
        "status": "released",
        "note": (
            f"Public rules from immutable tidas-spec {spec_pin['version']} release commit "
            f"{spec_pin['sourceCommit']}; index and schema bytes match the verified "
            "package-input archive. Product execution policy remains SDK consumer-owned."
        ),
    }
    source_identity = {
        "schema_version": new_pin["schema_version"],
        "repository": new_pin["repository"],
        "commit": new_pin["commit"],
        "rules_version": new_pin["rules_version"],
        "status": new_pin["status"],
        "index_sha256": new_pin["assets"]["index"]["sha256"],
        "schema_sha256": new_pin["assets"]["schema"]["sha256"],
    }
    outputs = {
        root / RULES_PIN: (json.dumps(new_pin, indent=2, ensure_ascii=False) + "\n").encode(),
        root / ASSET_ROOT / "public-rules.v1.json": assets["index"]["bytes"],
        root / ASSET_ROOT / "public-rules.v1.schema.json": assets["schema"]["bytes"],
        root / ASSET_ROOT / "public-rules.source.v1.json": (
            json.dumps(source_identity, indent=2, ensure_ascii=False) + "\n"
        ).encode(),
    }
    changed = False
    for path, data in outputs.items():
        if path.read_bytes() != data:
            changed = True
            path.write_bytes(data)
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--root", type=Path, default=REPO_ROOT)
    args = parser.parse_args()
    try:
        changed = update_public_rules(args.root.resolve(), args.archive.absolute())
    except (OSError, KeyError, ValueError, tarfile.TarError) as exc:
        raise SystemExit(f"error: {exc}") from exc
    print("updated" if changed else "exact replay; unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
