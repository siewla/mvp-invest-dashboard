import { NextResponse } from 'next/server'
import investments from '@/lib/mock-data/investments.json'
import { UserRole, Investments } from '@/lib/types'
import familyGroups from '@/lib/mock-data/familyGroups.json'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const role = searchParams.get('role')
  const familyId = searchParams.get('familyId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const userInvestments: Investments = {}

  if (role === UserRole.COPARENT || role === UserRole.PARENT) {
    const family = familyGroups[familyId as keyof typeof familyGroups]
    const allMembersUserIds = family.members.map(member => member.userId)
    for (const member of allMembersUserIds) {
      const currentInvestments = investments[member as keyof typeof investments]
      if (currentInvestments?.length) {
        userInvestments[member] = currentInvestments
      }
    }
  } else {
    const currentInvestments = investments[userId as keyof typeof investments]
    if (currentInvestments?.length) {
      userInvestments[userId] = currentInvestments
    }
  }

  if (!userInvestments) {
    return NextResponse.json([], { status: 200 })
  }

  return NextResponse.json(userInvestments)
}
