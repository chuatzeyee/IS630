#!/bin/bash
# IS630 Study Guide - offline launcher for macOS / Linux.
# Double-click (macOS) or run ./start-mac.command. Uses Python 3, falls back to Node.
cd "$(dirname "$0")"

if command -v python3 >/dev/null 2>&1; then
  python3 start.py
elif command -v python >/dev/null 2>&1; then
  python start.py
elif command -v node >/dev/null 2>&1; then
  node start.js
else
  echo "Could not find Python 3 or Node.js. Install Python 3, then run again."
  read -r -p "Press Enter to close..."
fi
