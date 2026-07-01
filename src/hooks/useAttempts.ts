import { useState, useEffect, useCallback } from 'react'

export interface Attempt {
  readonly id: string
  readonly setId: number
  readonly dateISO: string
  readonly earned: number // marks earned on auto-graded questions
  readonly total: number // total marks available on auto-graded questions
  readonly correct: number // count of correct auto-graded questions
  readonly gradable: number // count of auto-graded questions
}

const KEY = 'is630-mock-attempts'

function load(): Attempt[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attempt[]) : []
  } catch {
    return []
  }
}

export function useAttempts() {
  const [attempts, setAttempts] = useState<Attempt[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(attempts))
    } catch {
      // storage unavailable (private mode) - history simply won't persist
    }
  }, [attempts])

  const add = useCallback((a: Attempt) => setAttempts((prev) => [a, ...prev].slice(0, 100)), [])
  const clear = useCallback(() => setAttempts([]), [])

  return { attempts, add, clear }
}
