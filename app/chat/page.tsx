'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'

const ChatPage = () => {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <ChatInterface />
    </div>
  )
}

export default ChatPage
