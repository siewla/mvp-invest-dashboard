'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { FamilyMember } from '@/lib/types'
import { apiService } from '@/lib/apiService'


interface FamilyContextType {
  family: FamilyMember[]
  setFamily: React.Dispatch<React.SetStateAction<FamilyMember[]>>
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined)

export const FamilyProvider = ({ children }: { children: ReactNode }) => {
  const [family, setFamily] = useState<FamilyMember[]>([])
  const [familyId] = useState<string>('fam_001') // Hardcoded for MVP

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const family = await apiService.getFamily(familyId)
        setFamily(family.members)
      } catch (error) {
        console.error('Error fetching family:', error)
      }
    }

    fetchFamily()
  }, [familyId])

  return (
    <FamilyContext.Provider value={{ family, setFamily }}>
      {children}
    </FamilyContext.Provider>
  )
}

export const useFamily = () => {
  const context = useContext(FamilyContext)
  if (!context) {
    throw new Error('useFamily must be used within a PortfolioProvider')
  }
  return context
}
