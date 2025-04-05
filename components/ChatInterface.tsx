import { useState, useEffect } from 'react'
import { ChatMessage } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'
import EmojiPicker from 'emoji-picker-react'
import { useFamily } from '@/lib/context/FamilyContext'

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const { user } = useAuth()
  const { family } = useFamily()
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return

      try {
        const chatMessages = await apiService.getChatMessages(user.familyId)
        setMessages(chatMessages)
      } catch (error) {
        console.error('Error fetching chat messages:', error)
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

    const tempMessage: ChatMessage = {
      ...messageData,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')

    try {
      await apiService.sendChatMessage(messageData)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleEmojiClick = (event: {
    emoji: string
  }) => {
    setNewMessage(prevMessage => prevMessage + event.emoji)
    setShowEmojiPicker(false)
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
          messages.map((msg, index) => {
            const userProfile = family.find(m => m.userId === msg.senderId)
            return <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${msg.senderId === user.userId
                ? 'ml-auto bg-blue-100 shadow'
                : 'bg-gray-100 shadow'
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-blue-600">
                  {msg.senderId === user.userId ? 'You' : userProfile?.name} ({msg.role})
                </span>
                <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          })
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-auto relative">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(prev => !prev)}
            className="p-2 relative"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 z-10 mb-2">
              <EmojiPicker
                onEmojiClick={(event) => {
                  handleEmojiClick(event)
                }}
              />
            </div>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white px-4 py-2 rounded-r-md hover:bg-emerald-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInterface
