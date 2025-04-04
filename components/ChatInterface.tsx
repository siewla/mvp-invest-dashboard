'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChatMessage } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return

      try {
        const chatMessages = await apiService.getChatMessages(user.familyId)
        setMessages(chatMessages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching chat messages:', error)
        setLoading(false)
      }
    }

    fetchMessages()
  }, [user])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user) return

    const messageData = {
      familyId: user.familyId,
      senderId: user.userId,
      role: user.role,
      message: newMessage
    }

    // Optimistically update UI
    const tempMessage: ChatMessage = {
      ...messageData,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')

    try {
      // Send to API
      await apiService.sendChatMessage(messageData)
    } catch (error) {
      console.error('Error sending message:', error)
      // Could add error handling here, like removing the message from UI
      // or showing an error notification
    }
  }

  // Function to format timestamp
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
        <div className="border-b pb-4 mb-4">
          <div className="h-7 bg-gray-200 rounded animate-pulse mb-2 w-1/3"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>

        <div className="flex-1 mb-4 space-y-4 max-h-[400px] p-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] bg-gray-100 ${index % 2 === 0 ? '' : 'ml-auto bg-gray-200'
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-16"></div>
                <div className="h-3 bg-gray-300 rounded animate-pulse w-12"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-full mt-2"></div>
              {index % 2 === 0 && <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4 mt-1"></div>}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex">
            <div className="flex-1 h-10 bg-gray-200 rounded-l animate-pulse"></div>
            <div className="w-16 h-10 bg-gray-300 rounded-r animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold">Family Chat</h2>
        <p className="text-gray-600">Ask questions about your investments or chat with your family</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px] p-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 italic">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${msg.senderId === user.userId
                  ? 'ml-auto bg-blue-100'
                  : 'bg-gray-100'
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm">
                  {msg.role}
                </span>
                <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <p>{msg.message}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-auto">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInterface
