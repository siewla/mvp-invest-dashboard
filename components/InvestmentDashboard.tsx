'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Investments, Portfolios } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'
import InvestmentsComponent from './Investments'

const InvestmentDashboard = () => {
  const [portfolios, setPortfolios] = useState<Portfolios>({})
  const [investments, setInvestments] = useState<Investments>({})
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const portfolioData = await apiService.getPortfolio(user.userId, user.role, user.familyId)
        const investmentsData = await apiService.getInvestments(user.userId, user.role, user.familyId)
        console.log('portoflie', portfolioData)
        console.log('investement', investmentsData)
        // setPortfolio(portfolioData)
        setInvestments(investmentsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleChatClick = () => {
    router.push('/chat')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-6 w-2/3"></div>

          {/* Skeleton for chart */}
          <div className="h-64 bg-gray-100 p-4 rounded-lg mb-6 flex items-end space-x-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="bg-gray-200 w-full rounded-t-md animate-pulse" style={{ height: `${30 + Math.random() * 50}%` }}></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            ))}
          </div>

          <div className="h-10 bg-gray-200 rounded animate-pulse w-40"></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-6 w-1/4"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border p-4 rounded-lg flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // if (!portfolio || !investments.length || !user) {
  //   return (
  //     <div className="max-w-4xl mx-auto p-6 text-center">
  //       <h2 className="text-2xl font-bold mb-4">No investment data available</h2>
  //     </div>
  //   )
  // }

  // const latestValue = portfolio.historicalValues[portfolio.historicalValues.length - 1].value
  // const previousValue = portfolio.historicalValues[portfolio.historicalValues.length - 2]?.value || latestValue
  // const percentChange = ((latestValue - previousValue) / previousValue) * 100

  return <InvestmentsComponent investments={investments} />


  // return (
  //   <div className="max-w-4xl mx-auto p-6">
  //     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
  //       <h2 className="text-3xl font-bold mb-2">Hi {user.name}!</h2>
  //       <div className="text-2xl font-semibold text-green-600 mb-1">
  //         You have ${portfolio.portfolioValue.toLocaleString()} today
  //       </div>
  //       <div className="text-lg text-gray-600 mb-4">
  //         Your money grew by ${portfolio.monthlyChange.toLocaleString()} this month ({percentChange.toFixed(2)}%)
  //       </div>

  //       {/* Simple Chart */}
  //       <div className="h-64 bg-gray-100 p-4 rounded-lg mb-6 flex items-end space-x-4">
  //         {portfolio.historicalValues.map((point, index) => {
  //           const month = new Date(point.date).toLocaleString('default', { month: 'short' })
  //           const height = `${(point.value / (portfolio.portfolioValue * 1.2)) * 100}%`

  //           return (
  //             <div key={index} className="flex flex-col items-center flex-1">
  //               <div
  //                 className="bg-blue-500 w-full rounded-t-md"
  //                 style={{ height }}
  //               ></div>
  //               <div className="text-xs mt-2">{month}</div>
  //             </div>
  //           )
  //         })}
  //       </div>

  //       <button
  //         onClick={handleChatClick}
  //         className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
  //       >
  //         Ask My Parent
  //       </button>
  //     </div>

  //     <Investments investments={investments} />
  //   </div>
  // )
}

export default InvestmentDashboard
