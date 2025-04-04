'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

const HomePage = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem('user')
      // Simulate checking authentication
      await new Promise(resolve => setTimeout(resolve, 800))

      if (user) {
        setIsLoggedIn(true)
        router.push('/dashboard')
      } else {
        setIsLoggedIn(false)
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-50 mb-4"></div>
        <p className="text-gray-50">Loading application...</p>
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

export default HomePage
