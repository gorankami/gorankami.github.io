#!/bin/sh
set -eu

JEKYLL_VERSION="${JEKYLL_VERSION:-3.8}"

# Git Bash + Docker Desktop on Windows needs path-conversion handling.
if command -v cygpath >/dev/null 2>&1; then
  export MSYS_NO_PATHCONV=1
  PROJECT_DIR="$(pwd -W 2>/dev/null || pwd)"
else
  PROJECT_DIR="$PWD"
fi

docker run --rm \
  --volume "${PROJECT_DIR}:/srv/jekyll" \
  -it jekyll/jekyll:${JEKYLL_VERSION} \
  bundle update
