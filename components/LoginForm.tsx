'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { users } from '@/lib/mock-data/mockData'
import { User } from '@/lib/types'

const LoginForm = () => {
  const [selectedUserId, setSelectedUserId] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUserId) return
    const selectedUser = users.find((user: User) => user.userId === selectedUserId)

    if (selectedUser) {
      // Store user info in localStorage for persistence
      localStorage.setItem('user', JSON.stringify({
        userId: selectedUser.userId,
        name: selectedUser.name,
        role: selectedUser.role,
        familyId: 'fam_001' // Hardcoded for MVP
      }))

      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Family Investment Dashboard</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Your Role</label>
          <div className="flex flex-col space-y-2">
            {users.map((user: User) => (
              <label key={user.userId} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="userId"
                  value={user.userId}
                  checked={selectedUserId === user.userId}
                  onChange={() => setSelectedUserId(user.userId)}
                />
                <span className="ml-2 text-blue-700">{user.name} ({user.role})</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedUserId}
          className={`w-full py-2 px-4 rounded-md ${selectedUserId
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
