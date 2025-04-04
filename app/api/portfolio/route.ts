import { NextResponse } from 'next/server'
import portfolios from '@/lib/mock-data/portfolio.json'
import { UserRole, Portfolios } from '@/lib/types'
import familyGroups from '@/lib/mock-data/familyGroups.json'


export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const role = searchParams.get('role')
  const familyId = searchParams.get('familyId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const userPortfolio: Portfolios = {}

  if (role === UserRole.COPARENT || role === UserRole.PARENT) {
    const family = familyGroups[familyId as keyof typeof familyGroups]
    const allMembersUserIds = family.members.map(member => member.userId)
    for (const userId of allMembersUserIds) {
      const currentPortfolio = portfolios[userId as keyof typeof portfolios]
      if (currentPortfolio) {
        userPortfolio[userId] = (currentPortfolio)
      }
    }

  } else {
    const currentPortfolio = portfolios[userId as keyof typeof portfolios]
    if (currentPortfolio) {
      userPortfolio[userId] = (currentPortfolio)
    }
  }


  if (!userPortfolio) {
    return NextResponse.json({ error: 'Portfolio not found for user' }, { status: 404 })
  }

  return NextResponse.json(userPortfolio)
}
