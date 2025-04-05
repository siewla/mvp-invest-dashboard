'use client'

import { useState, useEffect } from 'react'
import { Investments, UserRole } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'
import InvestmentsComponent from './Investments'
import PortfoliosComponent from './Porfolios'
import AddFamilyMember from './AddFamilyMember'
import { usePortfolio } from '@/lib/context/PortfolioContext'

const InvestmentDashboard = () => {
  const { setPortfolios } = usePortfolio()

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
  }, [user, setPortfolios])

  return <>
    {user?.role === UserRole.PARENT && <AddFamilyMember />}
    <PortfoliosComponent />
    <InvestmentsComponent investments={investments} />
  </>
}

export default InvestmentDashboard
