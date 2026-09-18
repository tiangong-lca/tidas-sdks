#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

snapshot_path_state() {
    local target="$1"
    {
        git -C "$REPO_ROOT" diff --no-ext-diff -- "$target"
        git -C "$REPO_ROOT" ls-files --others --exclude-standard -- "$target"
    }
}

require_stable_generation_output() {
    local target="$1"
    local before_state="$2"
    local after_state

    after_state="$(snapshot_path_state "$target")"
    if [ "$before_state" != "$after_state" ]; then
        echo "error: generation introduced uncommitted changes under '$target'" >&2
        git -C "$REPO_ROOT" status --short -- "$target" >&2
        exit 1
    fi
}

# Resolve the upstream source exactly once and keep the verified checkout alive for
# every stage below. Without this, the build-stage bundle-methodologies/copy-runtime
# re-resolution could silently fall back to an unverified sibling ../tidas-toolkit
# checkout and rebuild packaged artifacts from a different source than the one this
# script generated, linted, tested and pinned.
# Capture the requested mode before sourcing the helper: the helper defaults an unset
# mode to auto, while this canonical verification must default to clone.
TIDAS_TOOLS_SOURCE_MODE="${TIDAS_TOOLS_SOURCE_MODE:-clone}"
export TIDAS_TOOLS_SOURCE_MODE
source "$SCRIPT_DIR/lib/tidas-tools-source.sh"
source "$SCRIPT_DIR/lib/tidas-spec-source.sh"
TIDAS_TOOLS_ASSET_RESOLVER="$SCRIPT_DIR/tidas-tools-assets.mjs"
# Install the cleanup trap before resolving so a fetch or asset-validation failure
# still removes the temporary checkout this script created.
trap 'cleanup_tidas_spec_source; cleanup_tidas_tools_source' EXIT
resolve_tidas_tools_source "$REPO_ROOT"
export TIDAS_TOOLS_PATH="$RESOLVED_TIDAS_TOOLS_PATH"
echo "[typescript] verified tidas-tools source: $TIDAS_TOOLS_PATH (pin $TIDAS_TOOLS_SHA)"

resolve_tidas_spec_source "$REPO_ROOT"
export TIDAS_SPEC_ARCHIVE_PATH="$RESOLVED_TIDAS_SPEC_ARCHIVE"
export TIDAS_SPEC_SCHEMA_DIR="$(spec_schema_dir)"
export TIDAS_SPEC_METHODOLOGY_DIR="$(spec_methodology_dir)"
export TIDAS_SPEC_ASSET_ROOT="$(spec_asset_root)"
trap 'cleanup_tidas_spec_source; cleanup_tidas_tools_source' EXIT

before_generated_state="$(snapshot_path_state "sdks/typescript/src")"

echo "[typescript] verifying candidate-bound public rules"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run verify-public-rules)

echo "[typescript] regenerating package sources"
TIDAS_TOOLS_SOURCE_MODE=verified-path \
    "$REPO_ROOT/scripts/ci/generate-typescript-sdk.sh" --defer-advisory-typecheck
require_stable_generation_output "sdks/typescript/src" "$before_generated_state"

echo "[typescript] lint"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run lint)

echo "[typescript] typecheck"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run typecheck)

echo "[typescript] test"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run test)

echo "[typescript] examples"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run check:examples)

echo "[typescript] build"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match run build)

echo "[typescript] pack verification"
(
    pack_dir="$(mktemp -d)"
    trap 'rm -rf -- "$pack_dir"' EXIT
    cd "$REPO_ROOT"
    pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match pack --pack-destination "$pack_dir" >/dev/null
    find "$pack_dir" -maxdepth 1 -type f -name '*.tgz' -print -quit | grep -q .
)

echo "[typescript] verification complete"
