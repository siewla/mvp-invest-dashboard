'use client'

import { useState, useEffect } from 'react'
import { Investments, Portfolios } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'
import InvestmentsComponent from './Investments'
import PortfoliosComponent from './Porfolios'

const InvestmentDashboard = () => {
  const [portfolios, setPortfolios] = useState<Portfolios>({})
  const [investments, setInvestments] = useState<Investments>({})
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const portfolioData = await apiService.getPortfolio(user.userId, user.role, user.familyId)
        const investmentsData = await apiService.getInvestments(user.userId, user.role, user.familyId)
        setPortfolios(portfolioData)
        setInvestments(investmentsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user])

  return <>
    <PortfoliosComponent portfolios={portfolios} />
    <InvestmentsComponent investments={investments} />
  </>


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
