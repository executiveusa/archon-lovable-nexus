#!/bin/bash
set -e
BRANCH="${1:-work}"
REMOTE="${GIT_REMOTE:-https://github.com/executiveusa/archon-x.git}"

git remote add origin "$REMOTE" 2>/dev/null || true

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN not set"
  exit 1
fi

git push --force origin "$BRANCH"
