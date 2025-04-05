import axios from 'axios'

export const apiService = {
  getFamily: async (familyId: string) => {
    const response = await axios.get(`/api/family?familyId=${familyId}`)
    return response.data
  },

  addFamilyMember: async (familyId: string, userId: string, role: string, name: string) => {
    const response = await axios.post('/api/family', { familyId, userId, role, name })
    return response.data
  },

  getInvestments: async (userId: string, role: string, familyId: string) => {
    const response = await axios.get(`/api/investment?userId=${userId}&role=${role}&familyId=${familyId}`)
    return response.data
  },

  getPortfolio: async (userId: string, role: string, familyId: string) => {
    const response = await axios.get(`/api/portfolio?userId=${userId}&role=${role}&familyId=${familyId}`)
    return response.data
  },
  addPortfolio: async (userId: string, amount: number, date: string) => {
    const response = await axios.post('/api/portfolio', { userId, date, action: 'add', amount })
    return response.data
  },

  removePortfolio: async (userId: string) => {
    const response = await axios.post('/api/portfolio', { userId, action: 'remove' })
    return response.data
  },

  topUpPortfolio: async (userId: string, amount: number, date: string) => {
    const response = await axios.post('/api/portfolio', { userId, date, action: 'topUp', amount })
    return response.data
  },

  withdrawPortfolio: async (userId: string, amount: number, date: string) => {
    const response = await axios.post('/api/portfolio', { userId, date, action: 'withdraw', amount })
    return response.data
  },

  getChatMessages: async (familyId: string) => {
    const response = await axios.get(`/api/chat?familyId=${familyId}`)
    return response.data
  },

  sendChatMessage: async (messageData: {
    familyId: string
    senderId: string
    role: string
    message: string
  }) => {
    const response = await axios.post('/api/chat', messageData)
    return response.data
  }
}
