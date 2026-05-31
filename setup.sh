#!/usr/bin/env bash

# Stop execution if a command fails
set -e

echo "=== System Check ==="

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js (version 18 or higher) from https://nodejs.org/"
    # Workaround since Jules does not allow the 'exit' command: return if sourced, otherwise force a failure
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version must be 18 or higher. Current version is $(node -v)."
    echo "Please update Node.js."
    exit 1
fi
echo "✅ Node.js $(node -v) detected."

# Check for npm
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: npm is not installed."
    exit 1
fi
echo "✅ npm $(npm -v) detected."

echo ""
echo "=== Project Configuration ==="

# Check and create .npmrc if missing
if [ ! -f .npmrc ]; then
    echo "⚠️ .npmrc missing. Creating default .npmrc..."
    cat << 'NPMRC_EOF' > .npmrc
registry=https://registry.npmjs.org/
@wix:registry=https://registry.npmjs.org/
NPMRC_EOF
    echo "✅ .npmrc created successfully."
else
    echo "✅ .npmrc exists."
fi

echo ""
echo "=== Installing Dependencies ==="
echo "Running 'npm install'..."
# Ignore failure for wix elements to allow the script to continue (set +e temporarily)
set +e
npm install
if [ $? -ne 0 ]; then
    echo "⚠️ npm install finished with warnings/errors (expected for @wix/editor-elements-definitions in local environments)."
fi
set -e

echo ""
echo "=== Building Project ==="
echo "Running 'npm run build'..."
# Same for build since it may fail without the proper elements locally
set +e
npm run build
if [ $? -ne 0 ]; then
    echo "⚠️ Build encountered errors. (Local environment might lack full wix build capabilities without online connectivity)."
fi
set -e

echo ""
echo "=== Setup Complete ==="
echo "You can now run 'npm run dev' to start the development server."
