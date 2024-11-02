// src/App.tsx
import { useState, useEffect } from 'react'
const API_URL = `https://${import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN}`

function App() {
  const [clicks, setClicks] = useState(0)
  const [message, setMessage] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [userId, setUserId] = useState('')

  // Add useEffect to get userId on component mount
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check localStorage first
        let storedUserId = localStorage.getItem('userId')

        if (!storedUserId) {
          const response = await fetch(API_URL)
          const data = await response.json()
          storedUserId = data.userId
          localStorage.setItem('userId', storedUserId!)
        }

        setUserId(storedUserId!)
      } catch (error) {
        console.error('Error initializing user:', error)
        setMessage('Error initializing user')
      }
    }

    initializeUser()
  }, [])

  const handleClick = async () => {
    if (!userId) return // Guard clause if userId isn't set yet

    try {
      const response = await fetch(`${API_URL}/click-queue/${userId}`, {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setClicks(data.clicks)
        setMessage(`Click ${data.clicks} counted!`)
      } else {
        setIsBlocked(true)
        setMessage('Too many clicks! Wait a few seconds...')
        setTimeout(() => {
          setIsBlocked(false)
          setMessage('')
        }, 7000)
      }
    } catch (error) {
      setMessage('Error counting click')
      console.error(error)
    }
  }

  const handleReset = async () => {
    if (!userId) return

    try {
      const response = await fetch(`${API_URL}/reset-clicks/${userId}`, {
        method: 'POST',
      })

      if (response.ok) {
        setClicks(0)
        setMessage('Counter reset!')
      }
    } catch (error) {
      setMessage('Error resetting counter')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4">Click Counter</h2>
          <button
            onClick={handleClick}
            disabled={isBlocked}
            className={`btn btn-primary btn-lg ${isBlocked ? 'btn-disabled' : ''}`}
          >
            Click Me!
          </button>
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="text-xl">Total Clicks: {clicks}</div>
            <button
              onClick={handleReset}
              className="btn btn-xs btn-error"
              disabled={isBlocked}
            >
              Reset
            </button>
          </div>
          {message && <p className="text-sm opacity-75 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default App;