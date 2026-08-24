#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/typescript-dependencies.sh"

test_root="$(mktemp -d)"
pnpm_log="$test_root/pnpm.log"
trap 'find "$test_root" -depth -delete' EXIT

workspace_root="$test_root/workspace"
mkdir -p "$workspace_root/sdks/typescript"
printf '%s\n' '{"packageManager":"pnpm@11.23.0"}' >"$workspace_root/package.json"
: >"$workspace_root/pnpm-workspace.yaml"
: >"$workspace_root/pnpm-lock.yaml"

fake_pnpm_version="11.23.0"
pnpm() {
    if [ "${1:-}" = "--version" ]; then
        printf '%s\n' "$fake_pnpm_version"
        return
    fi
    printf '%s|%s\n' "$PWD" "$*" >>"$pnpm_log"
}

install_typescript_dependencies "$workspace_root"

expected="$workspace_root|install --frozen-lockfile"
actual="$(cat "$pnpm_log")"
if [ "$actual" != "$expected" ]; then
    echo "error: expected '$expected', got '$actual'" >&2
    exit 1
fi

find "$workspace_root/pnpm-lock.yaml" -depth -delete
if install_typescript_dependencies "$workspace_root" >"$test_root/missing-lock.stdout" 2>"$test_root/missing-lock.stderr"; then
    echo "error: dependency installation succeeded without pnpm-lock.yaml" >&2
    exit 1
fi

if ! grep -Fq "pnpm-lock.yaml not found" "$test_root/missing-lock.stderr"; then
    echo "error: missing lockfile failure did not explain the contract" >&2
    exit 1
fi

if [ "$(wc -l <"$pnpm_log" | tr -d ' ')" != "1" ]; then
    echo "error: pnpm was invoked after the lockfile check failed" >&2
    exit 1
fi

: >"$workspace_root/pnpm-lock.yaml"
fake_pnpm_version="11.22.0"
if install_typescript_dependencies "$workspace_root" >"$test_root/version.stdout" 2>"$test_root/version.stderr"; then
    echo "error: dependency installation accepted the wrong pnpm version" >&2
    exit 1
fi

if ! grep -Fq "expected pnpm 11.23.0, found 11.22.0" "$test_root/version.stderr"; then
    echo "error: pnpm version mismatch did not explain the contract" >&2
    exit 1
fi

if [ "$(wc -l <"$pnpm_log" | tr -d ' ')" != "1" ]; then
    echo "error: pnpm install ran after the version check failed" >&2
    exit 1
fi

fake_pnpm_version="11.23.0"
printf '%s\n' '{}' >"$workspace_root/package.json"
if install_typescript_dependencies "$workspace_root" >"$test_root/missing-manager.stdout" 2>"$test_root/missing-manager.stderr"; then
    echo "error: dependency installation accepted a missing packageManager pin" >&2
    exit 1
fi

if ! grep -Fq "packageManager must pin pnpm@<version>" "$test_root/missing-manager.stderr"; then
    echo "error: missing packageManager failure did not explain the contract" >&2
    exit 1
fi

printf '%s\n' '{"packageManager":"npm@11.5.1"}' >"$workspace_root/package.json"
if install_typescript_dependencies "$workspace_root" >"$test_root/invalid-manager.stdout" 2>"$test_root/invalid-manager.stderr"; then
    echo "error: dependency installation accepted a non-pnpm packageManager pin" >&2
    exit 1
fi

if ! grep -Fq "packageManager must pin pnpm@<version>" "$test_root/invalid-manager.stderr"; then
    echo "error: invalid packageManager failure did not explain the contract" >&2
    exit 1
fi

if [ "$(wc -l <"$pnpm_log" | tr -d ' ')" != "1" ]; then
    echo "error: pnpm install ran after the packageManager contract failed" >&2
    exit 1
fi

printf '%s\n' '{"packageManager":"pnpm@11.23.0"}' >"$workspace_root/package.json"

fake_node_version="v24.19.0"
node() {
    printf '%s\n' "$fake_node_version"
}

actual_node_version="$(require_typescript_node_runtime)"
if [ "$actual_node_version" != "$fake_node_version" ]; then
    echo "error: expected Node.js runtime '$fake_node_version', got '$actual_node_version'" >&2
    exit 1
fi

fake_node_version="v23.11.0"
if require_typescript_node_runtime >"$test_root/node-version.stdout" 2>"$test_root/node-version.stderr"; then
    echo "error: TypeScript automation accepted Node.js below 24" >&2
    exit 1
fi

if ! grep -Fq "Node.js 24+ is required, found v23.11.0" "$test_root/node-version.stderr"; then
    echo "error: Node.js version mismatch did not explain the contract" >&2
    exit 1
fi

grep -Fq 'install_typescript_dependencies "$REPO_ROOT"' "$SCRIPT_DIR/generate-typescript-sdk.sh"
if grep -Fq 'install_typescript_dependencies' "$SCRIPT_DIR/verify-typescript-package.sh"; then
    echo "error: verification repeats the frozen install already owned by generation" >&2
    exit 1
fi

if grep -Fq 'if [ ! -d "$SDK_ROOT/node_modules" ]' "$SCRIPT_DIR/generate-typescript-sdk.sh"; then
    echo "error: generation may bypass the frozen pnpm install when node_modules exists" >&2
    exit 1
fi

for script in "$SCRIPT_DIR/generate-typescript-sdk.sh" "$SCRIPT_DIR/verify-typescript-package.sh"; do
    if grep -F 'pnpm --filter @tiangong-lca/tidas-sdk' "$script" | grep -Fqv -- '--fail-if-no-match'; then
        echo "error: filtered pnpm command does not fail when the SDK package is missing: $script" >&2
        exit 1
    fi
done

echo "TypeScript dependency installation contract passed."
