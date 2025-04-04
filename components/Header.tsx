'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Don't show header on the root path (login page)
  if (pathname === '/') return null

  // Don't show header if not authenticated
  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Family Investment Dashboard
        </Link>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {user.name} ({user.role})
          </span>

          <div className="flex space-x-2">
            <Link
              href="/dashboard"
              className="px-3 py-1 text-sm rounded hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              href="/chat"
              className="px-3 py-1 text-sm rounded hover:bg-gray-100"
            >
              Chat
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
