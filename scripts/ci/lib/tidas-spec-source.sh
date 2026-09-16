#!/usr/bin/env bash

# shellcheck shell=bash

TIDAS_SPEC_REPO_URL="${TIDAS_SPEC_REPO_URL:-https://github.com/tiangong-lca/tidas-spec.git}"
TIDAS_SPEC_SOURCE_MODE="${TIDAS_SPEC_SOURCE_MODE:-auto}"
TIDAS_SPEC_PIN_PATH="${TIDAS_SPEC_PIN_PATH:-${REPO_ROOT:-.}/scripts/ci/tidas-spec-pin.json}"
TIDAS_SPEC_ARCHIVE_PATH="${TIDAS_SPEC_ARCHIVE_PATH:-}"

RESOLVED_TIDAS_SPEC_ROOT=""
RESOLVED_TIDAS_SPEC_IS_TEMP=0
RESOLVED_TIDAS_SPEC_ARCHIVE=""
RESOLVED_TIDAS_SPEC_OWNER=""
RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR=""

spec_git() {
    (
        unset GIT_ALTERNATE_OBJECT_DIRECTORIES GIT_COMMON_DIR GIT_CONFIG GIT_DIR
        unset GIT_GRAFT_FILE GIT_INDEX_FILE GIT_OBJECT_DIRECTORY GIT_PREFIX
        unset GIT_REPLACE_REF_BASE GIT_SHALLOW_FILE GIT_WORK_TREE
        command git "$@"
    )
}

spec_resolver() {
    printf '%s/scripts/ci/tidas-spec-assets.mjs\n' "${REPO_ROOT:?REPO_ROOT is required}"
}

verify_tidas_spec_archive() {
    local archive="${1:?archive is required}"
    local output owner destination
    owner="$(mktemp -d "${TMPDIR:-/tmp}/tidas-spec-source.XXXXXX")"
    destination="$owner/extracted"
    # Publish ownership before invoking the verifier so an archive/hash/manifest
    # failure still leaves the EXIT trap enough information to clean the staging
    # directory it created.
    RESOLVED_TIDAS_SPEC_OWNER="$owner"
    RESOLVED_TIDAS_SPEC_IS_TEMP=1
    output="$(node "$(spec_resolver)" verify "$archive" --pin "$TIDAS_SPEC_PIN_PATH" --extract-to "$destination")"
    RESOLVED_TIDAS_SPEC_ROOT="$(node -e 'const x=JSON.parse(process.argv[1]); process.stdout.write(x.root)' "$output")"
    RESOLVED_TIDAS_SPEC_ARCHIVE="$archive"
    RESOLVED_TIDAS_SPEC_OWNER="$owner"
}

resolve_tidas_spec_source() {
    local repo_root="${1:?repo_root is required}"
    local candidate archive source_dir
    local -a candidates=()

    if [ -n "$TIDAS_SPEC_ARCHIVE_PATH" ]; then
        verify_tidas_spec_archive "$TIDAS_SPEC_ARCHIVE_PATH"
        return 0
    fi

    case "$TIDAS_SPEC_SOURCE_MODE" in
        auto|verified-path)
            candidates+=("${TIDAS_SPEC_PATH:-}")
            candidates+=("$repo_root/tidas-spec" "$repo_root/../tidas-spec")
            for candidate in "${candidates[@]}"; do
                [ -n "$candidate" ] || continue
                archive="$candidate/release/$(node -e 'const p=require(process.argv[1]); process.stdout.write(p.archiveFile)' "$TIDAS_SPEC_PIN_PATH")"
                if [ -f "$archive" ]; then
                    TIDAS_SPEC_ARCHIVE_PATH="$archive"
                    verify_tidas_spec_archive "$archive"
                    return 0
                fi
            done
            if [ "$TIDAS_SPEC_SOURCE_MODE" = "verified-path" ]; then
                >&2 echo "[ERROR] verified-path mode requires a valid TIDAS_SPEC_PATH/release archive"
                return 1
            fi
            ;;
        clone)
            ;;
        *)
            >&2 echo "[ERROR] Unsupported TIDAS_SPEC_SOURCE_MODE: $TIDAS_SPEC_SOURCE_MODE"
            return 1
            ;;
    esac

    source_dir="$(mktemp -d "${TMPDIR:-/tmp}/tidas-spec-download.XXXXXX")"
    RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR="$source_dir"
    archive="$source_dir/$(node -e 'const p=require(process.argv[1]); process.stdout.write(p.archiveFile)' "$TIDAS_SPEC_PIN_PATH")"
    >&2 echo "[STEP] Downloading the pinned public specification archive..."
    if curl --fail --silent --show-error --location --retry 3 \
        "$(node -e 'const p=require(process.argv[1]); process.stdout.write(p.releaseArchiveUrl)' "$TIDAS_SPEC_PIN_PATH")" \
        --output "$archive"; then
        verify_tidas_spec_archive "$archive"
    else
        >&2 echo "[WARN] pinned release archive is not available; falling back to the pinned tidas-spec source commit"
        rm -rf -- "$source_dir"
        RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR=""
        clone_tidas_spec_source
    fi
}

cleanup_tidas_spec_source() {
    if [ "${RESOLVED_TIDAS_SPEC_IS_TEMP:-0}" -eq 1 ] && [ -n "${RESOLVED_TIDAS_SPEC_OWNER:-}" ]; then
        case "$RESOLVED_TIDAS_SPEC_OWNER" in
            "${TMPDIR:-/tmp}"/tidas-spec-source.*|"${TMPDIR:-/tmp}"/tidas-spec-download.*) rm -rf -- "$RESOLVED_TIDAS_SPEC_OWNER" ;;
            *) >&2 echo "[ERROR] refusing to clean an unrecognised spec owner: $RESOLVED_TIDAS_SPEC_OWNER"; return 1 ;;
        esac
    fi
    if [ -n "${RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR:-}" ]; then
        case "$RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR" in
            "${TMPDIR:-/tmp}"/tidas-spec-download.*) rm -rf -- "$RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR" ;;
            *) >&2 echo "[ERROR] refusing to clean an unrecognised spec download: $RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR"; return 1 ;;
        esac
    fi
}

clone_tidas_spec_source() {
    local source_dir repo_dir archive source_commit archive_file
    source_dir="$(mktemp -d "${TMPDIR:-/tmp}/tidas-spec-download.XXXXXX")"
    repo_dir="$source_dir/repo"
    RESOLVED_TIDAS_SPEC_DOWNLOAD_DIR="$source_dir"
    source_commit="$(node -e 'const p=require(process.argv[1]); process.stdout.write(p.sourceCommit)' "$TIDAS_SPEC_PIN_PATH")"
    archive_file="$(node -e 'const p=require(process.argv[1]); process.stdout.write(p.archiveFile)' "$TIDAS_SPEC_PIN_PATH")"
    >&2 echo "[STEP] Cloning the pinned tidas-spec source commit..."
    spec_git clone --quiet --no-tags "$TIDAS_SPEC_REPO_URL" "$repo_dir"
    spec_git -C "$repo_dir" checkout --quiet --detach "$source_commit"
    archive="$repo_dir/release/$archive_file"
    if [ ! -f "$archive" ]; then
        >&2 echo "[ERROR] pinned tidas-spec commit has no release archive: $archive"
        return 1
    fi
    verify_tidas_spec_archive "$archive"
}

spec_asset_root() { printf '%s/package/assets/tidas\n' "$RESOLVED_TIDAS_SPEC_ROOT"; }
spec_schema_dir() { printf '%s/package/assets/tidas/schemas\n' "$RESOLVED_TIDAS_SPEC_ROOT"; }
spec_methodology_dir() { printf '%s/package/assets/tidas/methodologies\n' "$RESOLVED_TIDAS_SPEC_ROOT"; }
