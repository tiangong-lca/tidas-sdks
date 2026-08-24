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

before_generated_state="$(snapshot_path_state "sdks/typescript/src")"

echo "[typescript] regenerating package sources"
TIDAS_TOOLS_SOURCE_MODE="${TIDAS_TOOLS_SOURCE_MODE:-clone}" \
    "$REPO_ROOT/scripts/ci/generate-typescript-sdk.sh"
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

echo "[typescript] pack dry run"
(cd "$REPO_ROOT" && pnpm --filter @tiangong-lca/tidas-sdk --fail-if-no-match pack --dry-run >/dev/null)

echo "[typescript] verification complete"
