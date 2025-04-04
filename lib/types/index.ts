export enum Role {
  PARENT = 'Parent',
  COPARENT = 'Co-parent',
  CHILD = 'Child'
}

export interface FamilyMember {
  userId: string
  role: Role
  name: string
}

export interface FamilyGroup {
  members: FamilyMember[]
}

export interface FamilyGroups {
  [familyId: string]: FamilyGroup
}

export interface ChatMessage {
  senderId: string
  role: Role
  message: string
  timestamp: string
}


export interface ChatMessages {
  [familyId: string]: ChatMessage[]
}

export interface Investment {
  symbol: string
  name: string
  logoUrl: string
  funFact: string
}

export interface Investments {
  [userId: string]: Investment[]
}

export interface PortfolioHistoricalValues {
  date: string
  value: number
}

export interface Portfolio {
  portfolioValue: number
  monthlyChange: number
  historicalValues: PortfolioHistoricalValues[]
}

export interface Portfolios {
  [userId: string]: Portfolio[]
}

export interface User extends FamilyMember {
  familyId: string
}

