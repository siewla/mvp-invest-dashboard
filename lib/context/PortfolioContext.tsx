'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Portfolios } from '@/lib/types'

interface PortfolioContextType {
  portfolios: Portfolios
  setPortfolios: React.Dispatch<React.SetStateAction<Portfolios>>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolios, setPortfolios] = useState<Portfolios>({})

  return (
    <PortfolioContext.Provider value={{ portfolios, setPortfolios }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
