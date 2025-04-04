'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, FamilyMember } from '@/lib/types'
import { apiService } from '@/lib/apiService'

interface AuthContextType {
  user: User | null
  family: FamilyMember[]
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  family: [],
  login: () => { },
  logout: () => { },
  isAuthenticated: false
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [familyId] = useState<string>('fam_001') // Hardcoded for MVP
  const [members, setMembers] = useState<FamilyMember[]>([])

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const family = await apiService.getFamily(familyId)
        setMembers(family.members)
      } catch (error) {
        console.error('Error fetching family:', error)
      }
    }

    fetchFamily()
  }, [familyId])


  useEffect(() => {
    // Load user from localStorage on initial mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      family: members,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
