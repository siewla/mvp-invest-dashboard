import axios from 'axios'

export const apiService = {
  getFamily: async (familyId: string) => {
    const response = await axios.get(`/api/family?familyId=${familyId}`)
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
