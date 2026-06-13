#!/usr/bin/env bash
set -euo pipefail

ASSETS_DIR="$(cd "$(dirname "$0")/../public/assets" && pwd)"

echo "Scanning $ASSETS_DIR for .mp4 files..."

count=0
skipped=0

while IFS= read -r -d '' mp4; do
  webm="${mp4%.mp4}.webm"

  if [[ -f "$webm" ]]; then
    echo "SKIP (webm exists): $mp4"
    skipped=$((skipped + 1))
    continue
  fi

  echo "Converting: $mp4"
  ffmpeg -hide_banner -loglevel warning -i "$mp4" \
    -c:v libvpx-vp9 -crf 30 -b:v 0 \
    -c:a libopus -b:a 96k \
    -an \
    "$webm"

  rm "$mp4"
  echo "  → $(basename "$webm")"
  count=$((count + 1))
done < <(find "$ASSETS_DIR" -type f -name '*.mp4' -print0)

echo ""
echo "Done. Converted $count file(s), skipped $skipped."
