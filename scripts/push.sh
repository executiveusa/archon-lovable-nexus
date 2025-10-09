#!/usr/bin/env bash
# Use $GITHUB_TOKEN to authenticate with GitHub when pushing.
# Make sure to set the GITHUB_TOKEN environment variable before running
# this script (e.g., export GITHUB_TOKEN=YOURTOKEN). The token will be
# embedded in the remote URL such as:
# https://$GITHUB_TOKEN@github.com/executiveusa/archon-x.git
set -euo pipefail

REMOTE="${1:-origin}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REMOTE_URL="$(git remote get-url "$REMOTE")"
AUTH_URL="${REMOTE_URL/https:\/\//https://$GITHUB_TOKEN@}"

git push "$AUTH_URL" "$BRANCH"
