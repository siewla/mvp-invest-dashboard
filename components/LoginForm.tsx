'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, UserRole } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { users } from '@/lib/mock-data/mockData'

const LoginForm = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUserId) return

    const selectedUser = users.find(user => user.userId === selectedUserId)

    if (selectedUser) {
      setIsLoading(true)

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Create auth user object
      const authUser: User = {
        userId: selectedUser.userId,
        name: selectedUser.name,
        role: selectedUser.role as UserRole,
        familyId: 'fam_001' // Hardcoded for MVP
      }

      // Use context login function
      login(authUser)
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Family Investment Dashboard</h1>
        <p className="text-gray-600 mt-2">Login to access your family&apos;s investments</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Your Role</label>
          <div className="flex flex-col space-y-2">
            {users.map((user) => (
              <label key={user.userId} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="userId"
                  value={user.userId}
                  checked={selectedUserId === user.userId}
                  onChange={() => setSelectedUserId(user.userId)}
                  disabled={isLoading}
                />
                <span className="ml-2">{user.name} ({user.role})</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedUserId || isLoading}
          className={`w-full py-2 px-4 rounded-md transition duration-300 ${selectedUserId && !isLoading
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
