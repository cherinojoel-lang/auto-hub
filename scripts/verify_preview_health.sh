#!/bin/bash
set -e
PREVIEW_URL="https://owner-review-automobile-quick-preview.hsb-boden.workers.dev"

echo "Checking Preview Health at $PREVIEW_URL..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PREVIEW_URL")

if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "FAIL: Expected HTTP 200, got $HTTP_STATUS"
  exit 1
fi

ROBOTS_TAG=$(curl -sI "$PREVIEW_URL" | grep -i "x-robots-tag" || true)
echo "PASS: Preview reachable with HTTP 200"
echo "Robots Header: $ROBOTS_TAG"
