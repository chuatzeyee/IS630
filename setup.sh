#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Check for Node.js
if ! command -v node &>/dev/null; then
  echo "Node.js not found."
  if command -v brew &>/dev/null; then
    echo "Installing via Homebrew..."
    brew install node
  else
    echo "Install Node.js from https://nodejs.org or run: brew install node"
    exit 1
  fi
fi

echo "Node $(node -v) detected"

# Install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "node_modules exists — running npm install to sync..."
  npm install
fi

# Start dev server
echo ""
echo "Starting dev server..."
echo "Press Ctrl+C to stop."
echo ""
npm run dev
