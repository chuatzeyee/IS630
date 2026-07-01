@echo off
REM IS630 Study Guide - offline launcher for Windows.
REM Double-click this file. Requires Python 3 (python.org) OR Node.js.

cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel%==0 (
  python start.py
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  py start.py
  goto :eof
)
where node >nul 2>nul
if %errorlevel%==0 (
  node start.js
  goto :eof
)

echo Could not find Python or Node.js on your PATH.
echo Install Python 3 from https://www.python.org (tick "Add to PATH"), then double-click again.
pause
