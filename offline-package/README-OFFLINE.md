# IS630 Study Guide - Offline Package

This folder is a **fully self-contained, offline** copy of the study guide, including
the Python runtime (Pyodide + numpy/scipy/pandas/statsmodels). It needs **no internet**
once you have this folder on your laptop - built for exam day.

```
offline-package/
├── site/                 the built web app (open this via a launcher, below)
│   ├── index.html
│   ├── assets/           app JS/CSS
│   └── pyodide/          Python runtime + scipy/statsmodels wheels (~42 MB)
├── start.py              launcher (Python 3) - works on Win/mac/Linux
├── start.js              launcher (Node.js)  - fallback if no Python
├── start-windows.bat     double-click launcher for Windows
├── start-mac.command      double-click launcher for macOS/Linux
└── README-OFFLINE.md      this file
```

## Why you can't just double-click index.html

The in-browser Python runtime loads a WebAssembly module and package wheels, which
browsers refuse to load over the `file://` protocol. So the app must be served over
`http://localhost` - that is all the launcher scripts do (a tiny local web server on
your own machine; still 100% offline, no internet).

---

## How to run (pick your OS)

### Windows
1. Make sure **Python 3** is installed (https://www.python.org - tick "Add Python to PATH").
   (If you have Node.js instead, that also works.)
2. **Double-click `start-windows.bat`.**
3. Your browser opens at `http://localhost:8630/`. Leave the black console window open.

### macOS / Linux
1. Python 3 is usually pre-installed. (Node.js also works.)
2. **Double-click `start-mac.command`** (macOS), or in a terminal run:
   ```bash
   cd offline-package
   python3 start.py
   ```
   - macOS first time: if double-click is blocked, right-click -> Open, or run
     `chmod +x start-mac.command` once.
3. Your browser opens at `http://localhost:8630/`. Leave the terminal open.

### Manual (any OS, if launchers fail)
From inside the `offline-package` folder:
```bash
python3 -m http.server 8630 --directory site
```
then open `http://localhost:8630/` in your browser.

To stop: press **Ctrl+C** in the console/terminal window.

---

## IMPORTANT - do this the day BEFORE the exam

1. **Test the whole flow offline once.** Turn OFF your WiFi, run a launcher, open the
   site, go to **Mock Exam -> Code Generator**, pick any snippet, and click **Run**.
2. The first "Run" takes **several seconds** (it loads the ~42 MB Python runtime once) -
   the button shows "Loading scipy / statsmodels...". This is normal. After that it's fast.
3. If you see output (e.g. a number printed), you are good for exam day.
4. Confirm the port `8630` is free / not blocked by your firewall (the launcher will tell
   you if it can't start).

## What works offline
- All 6 mock sets (Official + Set 1-5): selectable answers, auto-grading, attempt history.
- Code Generator + By-Question-Type scaffolds.
- **Run** buttons - execute real scipy / statsmodels / numpy / pandas in the browser.
- Topics, Definitions, Formula Sheet, Snippets.

## Notes
- Fonts fall back to system fonts offline (the app was styled to look fine either way).
- Attempt history is saved in the browser's local storage on the machine you use.
- Nothing is uploaded anywhere; everything runs locally.
