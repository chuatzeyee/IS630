import { useSyncExternalStore } from 'react'

// Pyodide is loaded from a self-hosted, offline copy under <base>/pyodide/.
// A module-level singleton ensures the ~40 MB runtime initialises only once.

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>
  loadPackage: (names: string[]) => Promise<void>
  setStdout: (opts: { batched: (s: string) => void }) => void
  setStderr: (opts: { batched: (s: string) => void }) => void
  globals: { set: (k: string, v: unknown) => void }
}

export type PyStatus = 'idle' | 'loading' | 'ready' | 'error'

interface PyState {
  status: PyStatus
  message: string
}

let state: PyState = { status: 'idle', message: '' }
let pyodide: PyodideInterface | null = null
let initPromise: Promise<PyodideInterface> | null = null

const listeners = new Set<() => void>()
function setState(next: PyState) {
  state = next
  listeners.forEach((l) => l())
}

const REQUIRED_PACKAGES = ['numpy', 'scipy', 'pandas', 'statsmodels']

// Base URL respects Vite's base (e.g. /IS630/) so it works on the deployed subpath.
function pyodideBaseUrl(): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}pyodide/`
}

export async function initPyodide(): Promise<PyodideInterface> {
  if (pyodide) return pyodide
  if (initPromise) return initPromise

  initPromise = (async () => {
    setState({ status: 'loading', message: 'Loading Python runtime...' })
    const indexURL = pyodideBaseUrl()
    // Dynamic import of the self-hosted ESM build.
    const mod = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`)
    const py = (await mod.loadPyodide({ indexURL })) as PyodideInterface
    setState({ status: 'loading', message: 'Loading scipy / statsmodels (first time only)...' })
    await py.loadPackage(REQUIRED_PACKAGES)
    pyodide = py
    setState({ status: 'ready', message: '' })
    return py
  })()

  try {
    return await initPromise
  } catch (err) {
    initPromise = null
    setState({ status: 'error', message: err instanceof Error ? err.message : 'Failed to load Python' })
    throw err
  }
}

export interface RunResult {
  readonly ok: boolean
  readonly output: string
}

export async function runPython(code: string): Promise<RunResult> {
  const py = await initPyodide()
  const buffer: string[] = []
  py.setStdout({ batched: (s) => buffer.push(s) })
  py.setStderr({ batched: (s) => buffer.push(s) })
  try {
    const result = await py.runPythonAsync(code)
    let out = buffer.join('\n')
    if (result !== undefined && result !== null) {
      const rs = String(result)
      if (rs.trim() !== '') out = out ? `${out}\n${rs}` : rs
    }
    return { ok: true, output: out.trim() || '(no output - use print(...) to display a value)' }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    // Pyodide errors include the full traceback; show the tail (the actual error).
    const lines = msg.trim().split('\n')
    const tail = lines.slice(-6).join('\n')
    return { ok: false, output: tail }
  }
}

// React binding for the shared load status.
export function usePyodideStatus(): PyState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
    () => state
  )
}
