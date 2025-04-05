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
          monthlyChange: 0,
          historicalValues: [{ date: formattedDate, value: amount }]
        }
      }
      break

    case 'topUp':
    case 'withdraw': {
      const existingEntry = currentPortfolio.historicalValues.find(entry => entry.date === formattedDate)
      const changeAmount = action === 'topUp' ? amount : -amount

      if (existingEntry) {
        existingEntry.value += changeAmount
      } else {
        currentPortfolio.historicalValues.push({
          date: formattedDate,
          value: currentPortfolio.portfolioValue + changeAmount
        })
      }

      // Update portfolioValue
      currentPortfolio.portfolioValue += changeAmount

      // Sort historical values
      currentPortfolio.historicalValues.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      // Update monthlyChange
      const lastEntry = currentPortfolio.historicalValues.slice(-2)[0]
      currentPortfolio.monthlyChange = lastEntry ? currentPortfolio.portfolioValue - lastEntry.value : 0

      break
    }

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  return NextResponse.json(portfolios)
}