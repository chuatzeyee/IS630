import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import { runPython, usePyodideStatus } from '../hooks/usePyodide'

interface CodeRunnerProps {
  readonly code: string
}

// A "Run" button + output panel for a Python snippet. Executes fully offline
// via the self-hosted Pyodide runtime (loaded once, shared across all runners).
export default function CodeRunner({ code }: CodeRunnerProps) {
  const status = usePyodideStatus()
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; output: string } | null>(null)

  const busy = running || (status.status === 'loading')

  const run = async () => {
    setRunning(true)
    setResult(null)
    try {
      const r = await runPython(code)
      setResult(r)
    } catch (err) {
      setResult({ ok: false, output: err instanceof Error ? err.message : 'Failed to run' })
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="mt-2">
      <button
        onClick={run}
        disabled={busy}
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-glow-dim text-glow border border-glow/30 hover:bg-glow/15 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        {busy ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
        {running ? 'Running...' : status.status === 'loading' ? status.message : 'Run'}
      </button>

      {status.status === 'error' && (
        <p className="mt-2 text-xs text-red-400">
          Python runtime failed to load: {status.message}
        </p>
      )}

      {result && (
        <div
          className={`mt-2 rounded-lg border p-3 ${
            result.ok ? 'bg-base border-edge' : 'bg-red-950/30 border-red-400/30'
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${result.ok ? 'text-ink-muted' : 'text-red-400'}`}>
            {result.ok ? 'Output' : 'Error'}
          </span>
          <pre className={`text-xs mt-1 font-mono whitespace-pre-wrap leading-relaxed ${result.ok ? 'text-glow/90' : 'text-red-300'}`}>
            {result.output}
          </pre>
        </div>
      )}
    </div>
  )
}
