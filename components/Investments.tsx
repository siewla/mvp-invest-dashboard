'use client'
import Image from 'next/image'
import { Investments } from '@/lib/types'
import { useAuth } from '@/lib/context/AuthContext'

interface InvestmentsProp {
  investments: Investments
}

const InvestmentsList = ({ investments }: InvestmentsProp) => {
  const { family, user } = useAuth()

  return (
    <div className="bg-amber-100 p-6 rounded-lg shadow-md mx-16 mb-16">
      <h3 className="text-xl font-bold mb-4">Investments</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(investments).map((member) => {
          const userProfile = family.find(m => member === m.userId)
          return <div key={member} className='p-4 bg-teal-600 rounded-lg'>
            <div className="text-2xl font-semibold text-white mb-1">
              {member === user?.userId ? `You  (${userProfile?.userId})` : `${userProfile?.name} (${userProfile?.userId})`}
            </div>
            {
              investments[member].map(investment => {
                return <div
                  key={investment.symbol}
                  className="border p-4 rounded-lg flex items-center space-x-3 m-2 bg-white"
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src={investment.logoUrl}
                      alt={investment.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logos/placeholder.png'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{investment.name}</div>
                    <div className="text-sm text-gray-500">{investment.funFact}</div>
                  </div>
                </div>
              })
            }
          </div>
        })}
      </div>
    </div>
  )
}

export default InvestmentsList
