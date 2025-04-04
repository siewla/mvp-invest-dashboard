import { NextResponse } from 'next/server'
import { ChatMessage, ChatMessages } from '@/lib/types'
import chatMessagesData from '@/lib/mock-data/chatMessages.json'

const messages = chatMessagesData as ChatMessages

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const familyId = searchParams.get('familyId')

  if (!familyId) {
    return NextResponse.json({ error: 'Family ID is required' }, { status: 400 })
  }

  return NextResponse.json(messages[familyId] || [])
}

export const POST = async (request: Request) => {
  const body = await request.json()

  if (!body.familyId || !body.senderId || !body.role || !body.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newMessage: ChatMessage = {
    senderId: body.senderId,
    role: body.role,
    message: body.message,
    timestamp: new Date().toISOString()
  }

  if (!messages[body.familyId]) {
    messages[body.familyId] = []
  }

  messages[body.familyId].push(newMessage)

  return NextResponse.json(newMessage, { status: 201 })
}
