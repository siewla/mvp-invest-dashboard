'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, FamilyMember } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'
import { apiService } from '@/lib/apiService'

const LoginForm = () => {
  const [familyId] = useState<string>('fam_001') // Hardcoded for MVP
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const family = await apiService.getFamily(familyId)
        setMembers(family.members)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching family:', error)
        setIsLoading(false)
      }
    }

    fetchFamily()
  }, [familyId])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUserId) return

    const selectedMember = members.find(member => member.userId === selectedUserId)

    if (selectedMember) {
      setIsSubmitting(true)

      await new Promise(resolve => setTimeout(resolve, 1500))

      const authUser: User = {
        userId: selectedMember.userId,
        name: selectedMember.name,
        role: selectedMember.role,
        familyId
      }

      // Use context login function
      login(authUser)
      router.push('/dashboard')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-amber-100 p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-teal-600">Family Investment Dashboard</h1>
        <p className="text-stone-700 mt-2">Login to access your family&apos;s investments</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-stone-700 mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-green-50"
            placeholder="John"
          />
        </div>
        <div className="mb-6">
          <label className="block text-stone-700 mb-2">Select Your Role</label>
          <div className="flex flex-col space-y-2">
            {members.map((member) => (
              <label key={member.userId} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="userId"
                  value={member.userId}
                  checked={selectedUserId === member.userId}
                  onChange={() => setSelectedUserId(member.userId)}
                  disabled={isSubmitting}
                />
                <span className="ml-2 text-stone-700">{member.name} ({member.role})</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedUserId || isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition duration-300 ${selectedUserId && !isSubmitting
            ? 'bg-teal-600 text-amber-100 hover:bg-teal-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-teal-700 rounded-full animate-spin mr-2"></div>
              <span className="ml-2 text-teal-700">Logging in...</span>
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
