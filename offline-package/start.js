#!/usr/bin/env node
// IS630 Study Guide - offline launcher (Node fallback if Python is unavailable).
// Serves ./site on a local port and opens the browser. No internet needed.
const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const PORT = 8630
const SITE = path.join(__dirname, 'site')

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm',
  '.whl': 'application/octet-stream', '.zip': 'application/zip',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
}

if (!fs.existsSync(SITE)) {
  console.error("ERROR: 'site' folder not found next to start.js")
  process.exit(1)
}

http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  if (urlPath === '/') urlPath = '/index.html'
  const filePath = path.join(SITE, urlPath)
  // basic path-traversal guard
  if (!filePath.startsWith(SITE)) { res.writeHead(403); res.end(); return }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    res.end(data)
  })
}).listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}/`
  console.log('='.repeat(56))
  console.log('  IS630 Study Guide is running offline')
  console.log(`  Open:  ${url}`)
  console.log('  (Press Ctrl+C here to stop the server)')
  console.log('='.repeat(56))
  const cmd = process.platform === 'win32' ? `start ${url}`
    : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`
  exec(cmd, () => {})
})
