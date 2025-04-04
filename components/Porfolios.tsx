'use client'
import { Portfolios, UserRole } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface PortfoliosProp {
  portfolios: Portfolios
}

const PortfoliosList = ({ portfolios }: PortfoliosProp) => {
  const router = useRouter()
  const { user, family } = useAuth()


  const handleChatClick = () => {
    router.push('/chat')
  }



  return (
    <div className="m-16">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold mb-2">Hi {user?.name}!</h2>
        {
          Object.keys(portfolios).map(u => {
            const portfolio = portfolios[u]
            const latestValue = portfolio.historicalValues[portfolio.historicalValues.length - 1].value
            const previousValue = portfolio.historicalValues[portfolio.historicalValues.length - 2]?.value || latestValue
            const percentChange = ((latestValue - previousValue) / previousValue) * 100
            const isGrowing = percentChange > 0
            const userProfile = family.find(m => u === m.userId)
            const chatData = portfolio.historicalValues.sort().map(m => {
              return {
                name: m.date,
                v: m.value
              }
            })
            return <div key={u}>
              <div className="text-2xl font-semibold text-green-600 mb-1">
                {u === user?.userId ? `You  (${userProfile?.userId})` : `${userProfile?.name} (${userProfile?.userId})`} has ${portfolio.portfolioValue.toLocaleString()} today
              </div>
              <div className="text-lg text-gray-600 mb-4">
                <span>{u}&apos;s money {' '}</span>
                <span>{isGrowing ? 'grew' : 'dropped'} </span>
                <span>by {' '}</span>
                <span className={isGrowing ? 'text-green-500' : 'text-red-500'}>${portfolio.monthlyChange.toLocaleString()} </span>
                <span>this month (</span>
                <span className={isGrowing ? 'text-green-500' : 'text-red-500'}>{percentChange.toFixed(2)}</span>
                <span>%)</span>
              </div>
              <LineChart
                width={500}
                height={300}
                data={chatData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="rgb(0, 151, 80)" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
          })
        }
        {
          user?.role === UserRole.CHILD && <button
            onClick={handleChatClick}
            className="bg-teal-500 text-amber-100 py-2 px-6 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Ask My Parent
          </button>
        }
      </div>
    </div>
  )
}

export default PortfoliosList

