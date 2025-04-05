import { NextResponse } from 'next/server'
import portfoliosData from '@/lib/mock-data/portfolio.json'
import { UserRole, Portfolios } from '@/lib/types'
import familyGroups from '@/lib/mock-data/familyGroups.json'

const portfolios = portfoliosData as Portfolios

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

export const POST = async (request: Request) => {
  const { userId, date, action, amount } = await request.json()

  const formattedDate = `${date}-01`
  const currentPortfolio = portfolios[userId as keyof typeof portfolios]

  if (!currentPortfolio && action !== 'add') {
    return NextResponse.json({ error: 'Portfolio not found for user' }, { status: 404 })
  }


  switch (action) {
    case 'remove':
      delete portfolios[userId]
      break
    case 'add':
      if (!currentPortfolio) {
        portfolios[userId] = {
          portfolioValue: amount,
          monthlyChange: amount,
          historicalValues: [{ date: formattedDate, value: amount }]
        }
      }
      break
    case 'topUp':
    case 'withdraw':
      const existingEntry = currentPortfolio.historicalValues.find(entry => entry.date === formattedDate)
      if (existingEntry) {
        existingEntry.value = action === 'topUp'
          ? existingEntry.value + amount
          : existingEntry.value - amount
      } else {
        currentPortfolio.historicalValues.push({
          date: formattedDate,
          value: action === 'topUp' ? amount : -amount
        })
      }
      currentPortfolio.portfolioValue = existingEntry ? existingEntry.value : currentPortfolio.portfolioValue
      break
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  return NextResponse.json(portfolios)
}