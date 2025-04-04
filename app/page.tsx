'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.removeItem('user')
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
      router.push('/dashboard')
    } else {
      setIsLoggedIn(false)
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <LoginForm />
      </div>
    )
  }

  return null
}
