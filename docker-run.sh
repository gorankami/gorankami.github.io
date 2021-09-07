#!/bin/sh
docker run --rm \
  -v="$PWD:/srv/jekyll" \
  -p 4000:4000 \
  jekyll/jekyll \
  jekyll serve
