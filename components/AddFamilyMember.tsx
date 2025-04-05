import React, { useState } from 'react'
import { apiService } from '@/lib/apiService'
import { UserRole } from '@/lib/types'

const AddFamilyMember = () => {
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState<UserRole>(UserRole.CHILD)
  const [name, setName] = useState('')

  const handleAddMember = async () => {
    try {
      await apiService.addFamilyMember('fam_001', userId, role, name)
      alert('Member added successfully')
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  return (
    <div className="mx-16 mt-8 bg-amber-100 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 items-center py-8">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-green-50"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-green-50"
        >
          <option value={UserRole.PARENT}>Parent</option>
          <option value={UserRole.COPARENT}>Co-Parent</option>
          <option value={UserRole.CHILD}>Child</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-green-50"
        />
        <button onClick={handleAddMember} className="w-full py-2 px-4 rounded-md transition duration-300 bg-teal-600 text-amber-100 hover:bg-teal-700">
          Add Member
        </button>
      </div>
    </div>

  )
}

export default AddFamilyMember
