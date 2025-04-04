'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InvestmentDashboard from '@/components/InvestmentDashboard'

const DashboardPage = () => {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/')
    }
  }, [router])

  return <InvestmentDashboard />
}

export default DashboardPage
