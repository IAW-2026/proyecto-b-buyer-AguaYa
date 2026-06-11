'use client'
import { useState, useEffect } from 'react'

export function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button onClick={() => setDark(d => !d)}>
      {dark ? '☀️' : '🌙'}
    </button>
  )
}