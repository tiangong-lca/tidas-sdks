#!/usr/bin/env python3

from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import re
import shlex
import subprocess
import tempfile
import unittest
from pathlib import Path


SCRIPT_ROOT = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_ROOT.parent.parent


def load_script(name: str, filename: str):
    spec = importlib.util.spec_from_file_location(name, SCRIPT_ROOT / filename)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load {filename}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


detect_release_changes = load_script(
    "detect_release_changes", "detect-release-changes.py"
)
mark_generated_doc_review = load_script(
    "mark_generated_doc_review", "mark-generated-doc-review.py"
)
update_tidas_tools_pin = load_script(
    "update_tidas_tools_pin", "update-tidas-tools-pin.py"
)


class ReleaseDetectionTests(unittest.TestCase):
    def test_untagged_current_version_is_release_pending(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir)
            (repo / "sdks/typescript").mkdir(parents=True)
            (repo / "sdks/python").mkdir(parents=True)
            (repo / "sdks/typescript/package.json").write_text(
                json.dumps({"version": "0.1.46"}), encoding="utf-8"
            )
            (repo / "sdks/python/pyproject.toml").write_text(
                'version = "0.2.14"\n', encoding="utf-8"
            )
            subprocess.run(["git", "init", "-q", str(repo)], check=True)
            subprocess.run(
                ["git", "-C", str(repo), "config", "user.email", "test@example.com"],
                check=True,
            )
            subprocess.run(
                ["git", "-C", str(repo), "config", "user.name", "Automation Test"],
                check=True,
            )
            subprocess.run(["git", "-C", str(repo), "add", "."], check=True)
            subprocess.run(
                ["git", "-C", str(repo), "commit", "-qm", "fixture"], check=True
            )
            head = subprocess.check_output(
                ["git", "-C", str(repo), "rev-parse", "HEAD"], text=True
            ).strip()
            subprocess.run(
                ["git", "-C", str(repo), "tag", "python-v0.2.14"], check=True
            )

            outputs = detect_release_changes.build_outputs(repo, head, head)
            self.assertEqual("true", outputs["typescript_changed"])
            self.assertEqual("typescript-v0.1.46", outputs["typescript_tag"])
            self.assertEqual("false", outputs["python_changed"])

            subprocess.run(
                ["git", "-C", str(repo), "tag", "typescript-v0.1.46"], check=True
            )
            outputs = detect_release_changes.build_outputs(repo, head, head)
            self.assertEqual("false", outputs["typescript_changed"])
            self.assertEqual("false", outputs["any_changed"])


class GeneratedDocReviewTests(unittest.TestCase):
    def test_review_metadata_is_deterministic_and_complete(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir)
            for relative_path in mark_generated_doc_review.MARKDOWN_DOCUMENTS:
                path = repo / relative_path
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(
                    "---\n"
                    "lastReviewedAt: 2026-01-01\n"
                    "lastReviewedCommit: old\n"
                    "---\n",
                    encoding="utf-8",
                )
            config_path = repo / mark_generated_doc_review.CONFIG_DOCUMENT
            config_path.parent.mkdir(parents=True, exist_ok=True)
            config_path.write_text(
                'lastReviewedAt: "2026-01-01"\nlastReviewedCommit: "old"\n',
                encoding="utf-8",
            )

            kwargs = {
                "reviewed_at": "2026-07-27",
                "reviewed_commit": "a" * 40,
                "upstream_sha": "b" * 40,
            }
            mark_generated_doc_review.mark_documents(repo, **kwargs)
            first = {
                path: (repo / path).read_text(encoding="utf-8")
                for path in (
                    *mark_generated_doc_review.MARKDOWN_DOCUMENTS,
                    mark_generated_doc_review.CONFIG_DOCUMENT,
                )
            }
            mark_generated_doc_review.mark_documents(repo, **kwargs)
            second = {
                path: (repo / path).read_text(encoding="utf-8")
                for path in first
            }

            self.assertEqual(first, second)
            for relative_path, raw in second.items():
                self.assertIn("2026-07-27", raw, relative_path.as_posix())
                self.assertIn("a" * 40, raw, relative_path.as_posix())
            for relative_path in mark_generated_doc_review.MARKDOWN_DOCUMENTS:
                self.assertIn("b" * 40, second[relative_path])


class UpstreamPinTests(unittest.TestCase):
    def test_pin_update_is_exact_and_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir)
            pin_path = repo / update_tidas_tools_pin.SOURCE_HELPER
            pin_path.parent.mkdir(parents=True)
            pin_path.write_text(
                'TIDAS_TOOLS_SHA="${TIDAS_TOOLS_SHA:-' + "a" * 40 + '}"\n',
                encoding="utf-8",
            )

            update_tidas_tools_pin.update_pin(repo, "B" * 40)
            first = pin_path.read_text(encoding="utf-8")
            update_tidas_tools_pin.update_pin(repo, "B" * 40)
            second = pin_path.read_text(encoding="utf-8")

            self.assertEqual(first, second)
            self.assertIn("b" * 40, second)


class PnpmWorkflowContractTests(unittest.TestCase):
    TYPESCRIPT_WORKFLOWS = (
        "ci.yml",
        "publish.yml",
        "sync-from-tidas-tools.yml",
        "tag-release-from-merge.yml",
    )

    def workflow_text(self, name: str) -> str:
        return (REPO_ROOT / ".github/workflows" / name).read_text(encoding="utf-8")

    def test_typescript_workflows_use_the_pnpm_11_setup_action(self) -> None:
        for name in self.TYPESCRIPT_WORKFLOWS:
            with self.subTest(workflow=name):
                raw = self.workflow_text(name)
                self.assertIn(
                    "uses: pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2 "
                    "# v2.0.2",
                    raw,
                )
                self.assertIn("runtime: node@24.19.0", raw)
                self.assertIn("install: false", raw)
                self.assertIn("cache: true", raw)
                self.assertNotIn("pnpm/action-setup", raw)
                self.assertNotIn("actions/setup-node", raw)
                self.assertNotIn("cache: npm", raw)
                self.assertNotIn("package-lock.json", raw)
                self.assertNotIn("npm install --global", raw)

    def test_release_automation_uses_filtered_pnpm_commands(self) -> None:
        publish = self.workflow_text("publish.yml")
        typescript_publish_job = publish.split("  typescript-publish:\n", 1)[1].split(
            "\n  python-build:\n", 1
        )[0]
        self.assertIn("id-token: write", typescript_publish_job)
        self.assertNotIn("NPM_TOKEN", typescript_publish_job)
        self.assertNotIn("NODE_AUTH_TOKEN", typescript_publish_job)
        self.assertIn(
            "pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match publish "
            "--access public --provenance --no-git-checks",
            publish,
        )

        sync = self.workflow_text("sync-from-tidas-tools.yml")
        self.assertIn(
            'pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match version '
            '"$TYPESCRIPT_VERSION" --no-git-tag-version',
            sync,
        )


class UpstreamIdentityMigrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.root = Path(self.folder.name)
        self.env = {key: value for key, value in os.environ.items() if not key.startswith("GIT_")}
        config = self.root / "empty.gitconfig"
        config.write_text("")
        self.env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=str(config))
        self.source = self.root / "source"
        self.git("init", "-q", str(self.source))
        self.git("-C", str(self.source), "config", "user.name", "Fixture")
        self.git("-C", str(self.source), "config", "user.email", "fixture@example.invalid")
        self.git("-C", str(self.source), "config", "commit.gpgsign", "false")
        (self.source / "marker").write_text("exact source")
        self.git("-C", str(self.source), "add", "marker")
        self.git("-C", str(self.source), "commit", "-qm", "fixture")
        self.sha = self.git("-C", str(self.source), "rev-parse", "HEAD")
        self.remote = self.root / "upstream.git"
        self.git("clone", "--bare", "-q", str(self.source), str(self.remote))
        self.canonical = "https://github.com/tiangong-lca/tidas-toolkit.git"
        self.env.update({
            "GIT_CONFIG_COUNT": "3",
            "GIT_CONFIG_KEY_0": f"url.{self.remote.as_uri()}.insteadOf",
            "GIT_CONFIG_VALUE_0": self.canonical,
            "GIT_CONFIG_KEY_1": "credential.https://github.com.username",
            "GIT_CONFIG_VALUE_1": "selected-account",
            "GIT_CONFIG_KEY_2": "core.worktree",
            "GIT_CONFIG_VALUE_2": str(self.source),
        })
        self.marker = self.root / "asset-check.marker"
        self.resolver = self.root / "verify-assets.cjs"
        self.resolver.write_text("require('node:fs').writeFileSync(process.env.ASSET_TEST_MARKER, process.argv[3]); process.exit(process.env.ASSET_TEST_REJECT === '1' ? 1 : 0);")

    def git(self, *args: str) -> str:
        return subprocess.check_output(["git", *args], env=self.env, text=True, stderr=subprocess.DEVNULL).strip()

    def resolve(self, **overrides: str):
        env = {**self.env, "TIDAS_TOOLS_SOURCE_MODE": "clone", "TIDAS_TOOLS_SHA": self.sha,
               "SDK_TEST_ASSET_RESOLVER": str(self.resolver), "ASSET_TEST_MARKER": str(self.marker),
               "GIT_DIR": str(self.source / ".git"), "GIT_INDEX_FILE": str(self.root / "foreign-index"), **overrides}
        script = "source " + shlex.quote(str(SCRIPT_ROOT / "lib/tidas-tools-source.sh")) + "\n" + r'''
trap cleanup_tidas_tools_source EXIT
TIDAS_TOOLS_ASSET_RESOLVER="$SDK_TEST_ASSET_RESOLVER"
resolve_tidas_tools_source "$SDK_TEST_ROOT"
printf 'ROOT=%s\n' "$RESOLVED_TIDAS_TOOLS_PATH"
printf 'TOP=%s\n' "$(upstream_git -C "$RESOLVED_TIDAS_TOOLS_PATH" rev-parse --show-toplevel)"
printf 'URL=%s\n' "$(upstream_git -C "$RESOLVED_TIDAS_TOOLS_PATH" config --get remote.origin.url)"
printf 'ACCOUNT=%s\n' "$(upstream_git -C "$RESOLVED_TIDAS_TOOLS_PATH" config --get credential.https://github.com.username)"
'''
        return subprocess.run(["bash", "-e", "-c", script], env={**env, "SDK_TEST_ROOT": str(REPO_ROOT)}, text=True, capture_output=True)

    def test_exact_clone_preserves_account_config_and_isolates_parent_git_bindings(self) -> None:
        result = self.resolve()
        self.assertEqual(result.returncode, 0, result.stderr)
        values = dict(line.split("=", 1) for line in result.stdout.splitlines() if "=" in line)
        self.assertEqual(values["URL"], self.canonical)
        self.assertEqual(values["ACCOUNT"], "selected-account")
        self.assertEqual(Path(values["ROOT"]).resolve(), Path(values["TOP"]).resolve())
        self.assertNotEqual(values["TOP"], str(self.source))
        self.assertTrue(self.marker.exists())
        self.assertFalse((self.root / "foreign-index").exists())

    def test_wrong_pin_and_rejected_assets_remain_blocking(self) -> None:
        result = self.resolve(TIDAS_TOOLS_SHA="0" * 40)
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(self.marker.exists())
        result = self.resolve(ASSET_TEST_REJECT="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue(self.marker.exists())

    def test_real_workflow_clone_stores_no_automation_credential(self) -> None:
        text = (REPO_ROOT / ".github/workflows/sync-from-tidas-tools.yml").read_text()
        block = text.split("      - name: Clone upstream tidas-tools\n", 1)[1].split("      - name: Set up pnpm and Node.js", 1)[0]
        run = block.split("        run: |\n", 1)[1]
        commands = "\n".join(line[10:] for line in run.splitlines())
        # The workflow is a CI process, not a parent hook; core.worktree is tested
        # through the shared helper separately above.
        env = {**self.env, "GIT_CONFIG_COUNT": "2", "RUNNER_TEMP": str(self.root / "runner"), "REQUESTED_SHA": self.sha, "GITHUB_OUTPUT": str(self.root / "outputs"), "AUTOMATION_TOKEN": "sentinel-must-not-persist"}
        Path(env["RUNNER_TEMP"]).mkdir()
        result = subprocess.run(["bash", "-e", "-c", commands], env=env, text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        clone = Path(env["RUNNER_TEMP"]) / "tidas-tools-upstream"
        raw = subprocess.check_output(["git", "-C", str(clone), "config", "--get", "remote.origin.url"], env=env, text=True).strip()
        self.assertEqual(raw, self.canonical)
        self.assertNotIn("sentinel", raw)
        self.assertIn("resolved_sha=" + self.sha, Path(env["GITHUB_OUTPUT"]).read_text())



class TypescriptVerifySourceConsistencyTests(unittest.TestCase):
    """The TypeScript verify chain must resolve the pinned upstream exactly once and
    keep generate/build/pack on that same verified checkout. A different or injected
    sibling checkout must never influence generated or built artifacts."""

    def setUp(self) -> None:
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.root = Path(self.folder.name)
        self.env = {key: value for key, value in os.environ.items() if not key.startswith("GIT_")}
        config = self.root / "empty.gitconfig"
        config.write_text("")
        self.env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=str(config))
        self.canonical = "https://github.com/tiangong-lca/tidas-toolkit.git"

        def write_tools_checkout(directory: Path, marker: str) -> str:
            directory.mkdir(parents=True)
            methodologies = directory / "assets" / "tidas" / "methodologies"
            methodologies.mkdir(parents=True)
            entries = []
            for name in ("tidas_flows.yaml", "tidas_processes.yaml"):
                body = f"# {marker}\nflows: []\n" if name == "tidas_flows.yaml" else f"# {marker}\nprocesses: []\n"
                target = methodologies / name
                target.write_text(body)
                entries.append(
                    {
                        "path": f"assets/tidas/methodologies/{name}",
                        "kind": "methodology",
                        "sha256": hashlib.sha256(body.encode()).hexdigest(),
                        "bytes": len(body.encode()),
                    }
                )
            lock = {
                "schema_version": "tidas.asset-lock.v1",
                "source_roots": ["assets/tidas"],
                "entries": entries,
            }
            (directory / "assets" / "asset-lock.v1.json").write_text(json.dumps(lock, indent=2))
            (directory / "marker").write_text(marker)
            self.git("init", "-q", str(directory))
            self.git("-C", str(directory), "config", "user.name", "Fixture")
            self.git("-C", str(directory), "config", "user.email", "fixture@example.invalid")
            self.git("-C", str(directory), "config", "commit.gpgsign", "false")
            self.git("-C", str(directory), "add", "-A")
            self.git("-C", str(directory), "commit", "-qm", f"checkout {marker}")
            return self.git("-C", str(directory), "rev-parse", "HEAD")

        self.source = self.root / "pinned-source"
        self.pin_sha = write_tools_checkout(self.source, "fixture-set-X")
        self.remote = self.root / "upstream.git"
        self.git("clone", "--bare", "-q", str(self.source), str(self.remote))
        self.sibling = self.root / "sibling" / "tidas-tools"
        self.sibling_sha = write_tools_checkout(self.sibling, "sibling-set-Y")
        self.assertNotEqual(self.pin_sha, self.sibling_sha)
        self.resolver = SCRIPT_ROOT / "tidas-tools-assets.mjs"
        self.ts_resolver = (
            REPO_ROOT / "sdks" / "typescript" / "scripts" / "resolve-tidas-tools-path.ts"
        )
        # Stage TMPDIR lives inside the fixture-owned directory so test checkouts
        # are always cleaned up with the fixture.
        self.fixture_tmp = self.root / "tmp"
        self.fixture_tmp.mkdir()

    def git(self, *args: str) -> str:
        return subprocess.check_output(["git", *args], env=self.env, text=True, stderr=subprocess.DEVNULL).strip()

    def source_env(self) -> dict:
        env = {
            **self.env,
            "TIDAS_TOOLS_SOURCE_MODE": "clone",
            "TIDAS_TOOLS_SHA": self.pin_sha,
            "TIDAS_TOOLS_REPO_URL": self.canonical,
            "TIDAS_TOOLS_ASSET_RESOLVER": str(self.resolver),
            # Route the canonical URL to the local fixture remote, like the
            # UpstreamIdentityMigrationTests insteadOf mapping does.
            "GIT_CONFIG_COUNT": "1",
            "GIT_CONFIG_KEY_0": f"url.{self.remote.as_uri()}.insteadOf",
            "GIT_CONFIG_VALUE_0": self.canonical,
            # Injected foreign path: clone mode must ignore it entirely.
            "TIDAS_TOOLS_PATH": str(self.sibling),
        }
        return env

    def resolve_and_build_resolution(self) -> dict:
        """One bash process performs the verify-script sequence (resolve, export,
        trap-guarded) AND the build-stage resolver probe while the verified clone
        is still alive; the EXIT trap removes the temporary checkout afterwards."""
        probe = (
            'import { requireTidasToolsRepoRoot } from "'
            + str(self.ts_resolver)
            + '";\nprocess.stdout.write("RESOLVER=" + requireTidasToolsRepoRoot());'
        )
        probe_file = self.root / "resolver-probe.ts"
        probe_file.write_text(probe)
        lines = [
            "source " + shlex.quote(str(SCRIPT_ROOT / "lib/tidas-tools-source.sh")),
            'TIDAS_TOOLS_ASSET_RESOLVER="$SDK_RESOLVER"',
            "TIDAS_TOOLS_SOURCE_MODE=clone",
            "export TIDAS_TOOLS_SOURCE_MODE",
            "trap cleanup_tidas_tools_source EXIT",
            'resolve_tidas_tools_source "$SDK_TEST_ROOT"',
            'export TIDAS_TOOLS_PATH="$RESOLVED_TIDAS_TOOLS_PATH"',
            'printf "CLONE=%s\\n" "$TIDAS_TOOLS_PATH"',
            'printf "CLONE_SHA=%s\\n" "$(upstream_git -C "$TIDAS_TOOLS_PATH" rev-parse HEAD)"',
            "pnpm --filter @tiangong-lca/tidas-sdk exec tsx " + shlex.quote(str(probe_file)),
            "",
        ]
        build = subprocess.run(
            ["bash", "-e", "-c", "\n".join(lines)],
            env={
                **self.source_env(),
                "SDK_TEST_ROOT": str(REPO_ROOT),
                "SDK_RESOLVER": str(self.resolver),
                "TMPDIR": str(self.fixture_tmp),
            },
            text=True,
            capture_output=True,
        )
        self.assertEqual(build.returncode, 0, build.stderr)
        values = dict(line.split("=", 1) for line in build.stdout.splitlines() if "=" in line)
        values["SIBLING"] = str(self.sibling)
        values["SIBLING_SHA"] = self.sibling_sha
        return values

    def test_clone_resolution_ignores_the_injected_sibling_for_every_stage(self) -> None:
        values = self.resolve_and_build_resolution()
        clone = values["CLONE"]
        self.assertNotEqual(clone, str(self.sibling))
        self.assertIn("/tidas-tools.", clone)
        self.assertEqual(values["CLONE_SHA"], self.pin_sha)
        self.assertNotEqual(values["CLONE_SHA"], self.sibling_sha)
        # The build stage resolver sees exactly the same verified checkout.
        self.assertEqual(values["RESOLVER"], clone)
        self.assertNotEqual(values["RESOLVER"], str(self.sibling))
        self.assertFalse(Path(clone).exists(), "the owning process must clean its clone")

    def test_verify_script_defaults_an_unset_mode_to_clone(self) -> None:
        # Execute the real verify-typescript-package.sh prelude (SCRIPT_DIR through the
        # source/mode/trap/resolve wiring) with TIDAS_TOOLS_SOURCE_MODE unset: the script
        # must default to clone (a temp verified checkout), not the helper's auto default
        # that would select the unverified sibling and fail the pin check.
        script_text = (REPO_ROOT / "scripts/ci/verify-typescript-package.sh").read_text()
        boundary = script_text.index("before_generated_state=")
        prelude = "\n".join(script_text[:boundary].splitlines()[:-1])
        real_script_dir = 'SCRIPT_DIR=' + shlex.quote(str(SCRIPT_ROOT))
        prelude = re.sub(
            r'SCRIPT_DIR=.*',
            real_script_dir,
            prelude,
            count=1,
        )
        lines = [
            "unset TIDAS_TOOLS_SOURCE_MODE TIDAS_TOOLS_PATH",
            prelude,
            'printf "MODE=%s\\n" "$TIDAS_TOOLS_SOURCE_MODE"',
            'printf "PATH=%s\\n" "$TIDAS_TOOLS_PATH"',
            'printf "SHA=%s\\n" "$(upstream_git -C "$TIDAS_TOOLS_PATH" rev-parse HEAD)"',
            "",
        ]
        unset_env = self.source_env()
        unset_env.pop("TIDAS_TOOLS_PATH", None)
        result = subprocess.run(
            ["bash", "-e", "-c", "\n".join(lines)],
            env=unset_env,
            text=True,
            capture_output=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        values = dict(line.split("=", 1) for line in result.stdout.splitlines() if "=" in line)
        self.assertEqual(values["MODE"], "clone")
        self.assertIn("/tidas-tools.", values["PATH"])
        self.assertNotEqual(values["PATH"], str(self.sibling))
        self.assertEqual(values["SHA"], self.pin_sha)

    def test_generate_verified_path_reuse_revalidates_and_rejects_foreign_checkouts(self) -> None:
        # generate re-resolves in verified-path mode inside the same live checkout
        # lifetime: it must reuse the exact verified checkout (no second clone,
        # caller-owned lifetime) and stay fail-closed for foreign checkouts.
        script = (
            "source " + shlex.quote(str(SCRIPT_ROOT / "lib/tidas-tools-source.sh"))
            + "\nTIDAS_TOOLS_ASSET_RESOLVER=\"$SDK_RESOLVER\""
            + "\nTIDAS_TOOLS_SOURCE_MODE=clone"
            + "\nexport TIDAS_TOOLS_SOURCE_MODE"
            + "\ntrap cleanup_tidas_tools_source EXIT"
            + '\nresolve_tidas_tools_source "$SDK_TEST_ROOT"'
            + '\nexport TIDAS_TOOLS_PATH="$RESOLVED_TIDAS_TOOLS_PATH"'
            + '\nprintf "CLONE=%s\\n" "$TIDAS_TOOLS_PATH"'
            + "\nTIDAS_TOOLS_SOURCE_MODE=verified-path"
            + '\nresolve_tidas_tools_source "$SDK_TEST_ROOT"'
            + '\nprintf "REUSED=%s\\n" "$RESOLVED_TIDAS_TOOLS_PATH"'
            + '\nprintf "REUSED_TEMP=%s\\n" "$RESOLVED_TIDAS_TOOLS_IS_TEMP"'
        )
        env = {
            **self.source_env(),
            "SDK_TEST_ROOT": str(REPO_ROOT),
            "SDK_RESOLVER": str(self.resolver),
            "TMPDIR": str(self.fixture_tmp),
            # Injected foreign path before resolution: clone ignores it.
            "TIDAS_TOOLS_PATH": str(self.sibling),
        }
        ok = subprocess.run(
            ["bash", "-e", "-c", script],
            env=env,
            text=True,
            capture_output=True,
        )
        self.assertEqual(
            ok.returncode,
            0,
            f"stdout={ok.stdout!r} stderr={ok.stderr!r} script={script!r} env_TTP={env['TIDAS_TOOLS_PATH']!r}",
        )
        values = dict(line.split("=", 1) for line in ok.stdout.splitlines() if "=" in line)
        self.assertNotEqual(values["CLONE"], str(self.sibling))
        self.assertEqual(values["REUSED"], values["CLONE"])
        self.assertEqual(values["REUSED_TEMP"], "0")
        # verified-path revalidation must reject a foreign checkout (commit mismatch):
        # point TIDAS_TOOLS_PATH at the sibling AFTER resolution, replay only the
        # verified-path stage, and observe the fail-closed rejection.
        foreign_script = script.replace(
            "TIDAS_TOOLS_SOURCE_MODE=clone",
            "TIDAS_TOOLS_SOURCE_MODE=clone\nTIDAS_TOOLS_PATH=" + shlex.quote(str(self.sibling)),
            1,
        ).replace(
            '\nexport TIDAS_TOOLS_PATH="$RESOLVED_TIDAS_TOOLS_PATH"',
            '\nexport TIDAS_TOOLS_PATH="$TIDAS_TOOLS_PATH"',
            1,
        )
        foreign = subprocess.run(
            ["bash", "-e", "-c", foreign_script],
            env=env,
            text=True,
            capture_output=True,
        )
        self.assertNotEqual(foreign.returncode, 0)
        self.assertIn("commit mismatch", foreign.stderr)


if __name__ == "__main__":
    unittest.main()
