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
}

export default InvestmentDashboard
