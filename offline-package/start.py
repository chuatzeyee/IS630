#!/usr/bin/env python3
"""IS630 Study Guide - offline launcher.

Serves the bundled ./site folder on a local port and opens your browser.
Works on Windows / macOS / Linux with any Python 3. No internet needed.

Usage:  python start.py   (or double-click start-mac.command / start-windows.bat)
"""
import http.server
import socketserver
import webbrowser
import os
import sys
from functools import partial

PORT = 8630
SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")

if not os.path.isdir(SITE):
    print("ERROR: 'site' folder not found next to start.py")
    sys.exit(1)


class Handler(http.server.SimpleHTTPRequestHandler):
    # Correct MIME types so the browser accepts the WASM runtime and wheels.
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".wasm": "application/wasm",
        ".mjs": "text/javascript",
        ".js": "text/javascript",
        ".json": "application/json",
        ".whl": "application/octet-stream",
        ".zip": "application/zip",
    }

    def end_headers(self):
        # Never cache during a session, and keep it snappy.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *args):
        pass  # quiet


def main():
    handler = partial(Handler, directory=SITE)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}/"
        print("=" * 56)
        print("  IS630 Study Guide is running offline")
        print(f"  Open:  {url}")
        print("  (Press Ctrl+C here to stop the server)")
        print("=" * 56)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
