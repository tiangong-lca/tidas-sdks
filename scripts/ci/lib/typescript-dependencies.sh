#!/usr/bin/env bash

require_typescript_node_runtime() {
    local expected_node_version="${1:?exact Node.js version is required}"
    local node_version

    expected_node_version="${expected_node_version#v}"
    if ! [[ "$expected_node_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "error: expected Node.js version must be an exact semantic version, found $expected_node_version" >&2
        return 1
    fi

    if ! command -v node >/dev/null 2>&1; then
        echo "error: node not found. Please install Node.js $expected_node_version" >&2
        return 1
    fi

    node_version="$(node --version)"
    if [ "$node_version" != "v$expected_node_version" ]; then
        echo "error: Node.js $expected_node_version is required, found $node_version" >&2
        return 1
    fi

    printf '%s\n' "$node_version"
}

install_typescript_dependencies() {
    local workspace_root="${1:?pnpm workspace root is required}"
    local package_manager
    local expected_pnpm_version
    local actual_pnpm_version

    if [ ! -f "$workspace_root/package.json" ]; then
        echo "error: package.json not found in $workspace_root" >&2
        return 1
    fi

    if [ ! -f "$workspace_root/pnpm-workspace.yaml" ]; then
        echo "error: pnpm-workspace.yaml not found in $workspace_root" >&2
        return 1
    fi

    if [ ! -f "$workspace_root/pnpm-lock.yaml" ]; then
        echo "error: pnpm-lock.yaml not found in $workspace_root" >&2
        return 1
    fi

    if ! command -v pnpm >/dev/null 2>&1; then
        echo "error: pnpm not found" >&2
        return 1
    fi

    if ! command -v node >/dev/null 2>&1; then
        echo "error: node not found; cannot read the root packageManager pin" >&2
        return 1
    fi

    package_manager="$(
        node -e '
            const fs = require("node:fs");
            const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
            if (typeof manifest.packageManager === "string") {
                process.stdout.write(manifest.packageManager);
            }
        ' "$workspace_root/package.json"
    )"
    if [[ ! "$package_manager" =~ ^pnpm@([0-9]+\.[0-9]+\.[0-9]+)$ ]]; then
        echo "error: packageManager must pin pnpm@<version> in $workspace_root/package.json" >&2
        return 1
    fi
    expected_pnpm_version="${BASH_REMATCH[1]}"

    actual_pnpm_version="$(pnpm --version)"
    if [ "$actual_pnpm_version" != "$expected_pnpm_version" ]; then
        echo "error: expected pnpm $expected_pnpm_version, found $actual_pnpm_version" >&2
        return 1
    fi

    (
        cd "$workspace_root"
        pnpm install --frozen-lockfile
    )
}
