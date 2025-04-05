'use client'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { UserRole } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { apiService } from '@/lib/apiService'
import { usePortfolio } from '@/lib/context/PortfolioContext'
import { useFamily } from '@/lib/context/FamilyContext'

const PortfoliosList = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { family } = useFamily()
  const [selectedUserId, setSelectedUserId] = useState(user?.userId || '')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const { portfolios, setPortfolios } = usePortfolio()

  useEffect(() => {
    setSelectedUserId(user?.userId || '')
  }, [user])

  const handleChatClick = () => {
    router.push('/chat')
  }

  const handleAddPortfolio = async () => {
    if (!selectedUserId || !selectedDate || !amount) {
      alert('Please fill all fields for adding a portfolio')
      return
    }
    const formattedDate = format(selectedDate, 'yyyy-MM')
    try {
      const newPortfolios = await apiService.addPortfolio(selectedUserId, amount, formattedDate)
      setPortfolios(newPortfolios)
      alert('Portfolio added successfully')
    } catch (error) {
      console.error('Error adding portfolio:', error)
      alert('Failed to add portfolio')
    }
  }

  const handleTopUp = async () => {
    if (!selectedUserId || !amount) {
      alert('Please fill the amount for topping up')
      return
    }
    const formattedDate = format(selectedDate, 'yyyy-MM')
    try {
      const newPortfolios = await apiService.topUpPortfolio(selectedUserId, amount, formattedDate)
      setPortfolios(newPortfolios)
      alert('Top-up successful')
    } catch (error) {
      console.error('Error topping up:', error)
      alert('Failed to top-up portfolio')
    }
  }

  const handleWithdraw = async () => {
    if (!selectedUserId || !amount) {
      alert('Please fill the amount for withdrawing')
      return
    }
    const formattedDate = format(selectedDate, 'yyyy-MM')
    try {
      const newPortfolios = await apiService.withdrawPortfolio(selectedUserId, amount, formattedDate)
      setPortfolios(newPortfolios)
      alert('Withdrawal successful')
    } catch (error) {
      console.error('Error withdrawing:', error)
      alert('Failed to withdraw from portfolio')
    }
  }

  const handleRemovePortfolio = async () => {
    if (!selectedUserId) {
      alert('Please select a user to remove the portfolio')
      return
    }
    try {
      const newPortfolios = await apiService.removePortfolio(selectedUserId)
      setPortfolios(newPortfolios)
      alert('Portfolio removed successfully')
    } catch (error) {
      console.error('Error removing portfolio:', error)
      alert('Failed to remove portfolio')
    }
  }

  const selectedPortfolio = portfolios[selectedUserId]
  const sortedData = selectedPortfolio
    ? [...selectedPortfolio.historicalValues].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : []

  return (
    <div className="m-16">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold mb-4">Hi {user?.name}!</h2>
        {
          user?.role !== UserRole.CHILD && (
            <>
              <p className="mb-4">You can view and manage your portfolio or select another family member to view theirs.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-8">
                <div className="flex flex-col">
                  <label htmlFor="user-select" className="mb-2 font-semibold">Select User</label>
                  <select
                    id="user-select"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="" disabled>Select User</option>
                    {family.map(member => (
                      <option key={member.userId} value={member.userId}>
                        {member.name} ({member.role})
                      </option>
                    ))}
                  </select>
                </div>
                {
                  user?.role === UserRole.PARENT && <>
                    <div className="flex flex-col">
                      <label htmlFor="date-picker" className="mb-2 font-semibold">Select Date</label>
                      <DatePicker
                        id="date-picker"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date as Date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="p-2 border rounded"
                        calendarClassName="fixed" // Ensures the calendar doesn't cause layout shift
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="amount-input" className="mb-2 font-semibold">Amount</label>
                      <input
                        id="amount-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Amount"
                        className="p-2 border rounded"
                      />
                    </div>
                  </>}
              </div>
            </>
          )
        }
        {
          user?.role === UserRole.PARENT
            ? selectedPortfolio ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-8">

                <button onClick={handleTopUp} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
                  Top Up
                </button>
                <button onClick={handleWithdraw} className="bg-red-500 text-white py-2 px-4 rounded-md mr-2">
                  Withdraw
                </button>
                <button onClick={handleRemovePortfolio} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                  Remove Portfolio
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 px-8 ">
                <button onClick={handleAddPortfolio} className="bg-teal-500 text-amber-100 py-2 px-4 rounded-md">
                  Add Portfolio
                </button>
              </div>
            ) : null
        }

        {selectedPortfolio && (
          <div>
            <div className="text-2xl font-semibold text-green-600 mb-1">
              {selectedUserId === user?.userId ? `You (${user.userId})` : `${family.find(m => m.userId === selectedUserId)?.name} (${selectedUserId})`} has ${(selectedPortfolio.portfolioValue ?? 0).toLocaleString()} today
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span>{selectedUserId}&apos;s money {' '}</span>
              <span>{selectedPortfolio.monthlyChange >= 0 ? 'grew' : 'dropped'} </span>
              <span>by {' '}</span>
              <span className={selectedPortfolio.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'}>${(selectedPortfolio.monthlyChange ?? 0).toLocaleString()} </span>
              <span>this month</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#00a152" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {
          user?.role === UserRole.CHILD && (
            <button
              onClick={handleChatClick}
              className="bg-teal-500 text-amber-100 py-2 px-6 rounded-md hover:bg-teal-700 transition duration-300 mt-4"
            >
              Ask My Parent
            </button>
          )
        }
      </div>
    </div>
  )
}

export default PortfoliosList
