'use client'
import { Portfolios, UserRole } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'

interface PortfoliosProp {
  portfolios: Portfolios
}

const PortfoliosList = ({ portfolios }: PortfoliosProp) => {
  const router = useRouter()
  const { user, family } = useAuth()


  const handleChatClick = () => {
    router.push('/chat')
  }



  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold mb-2">Hi {user?.name}!</h2>
        {
          Object.keys(portfolios).map(u => {
            const portfolio = portfolios[u]
            const latestValue = portfolio.historicalValues[portfolio.historicalValues.length - 1].value
            const previousValue = portfolio.historicalValues[portfolio.historicalValues.length - 2]?.value || latestValue
            const percentChange = ((latestValue - previousValue) / previousValue) * 100
            const isGrowing = percentChange > 0
            const userProfile = family.find(m => u === m.userId)

            return <div key={u}>
              <div className="text-2xl font-semibold text-green-600 mb-1">
                {u === user?.userId ? `You  (${userProfile?.userId})` : `${userProfile?.name} (${userProfile?.userId})`} has ${portfolio.portfolioValue.toLocaleString()} today
              </div>
              <div className="text-lg text-gray-600 mb-4">
                <span>{u}&apos;s money</span>
                <span>{isGrowing ? 'grew' : 'dropped'} </span>
                <span>by {' '}</span>
                <span className={isGrowing ? 'text-green-500' : 'text-red-500'}>${portfolio.monthlyChange.toLocaleString()} </span>
                <span>this month (</span>
                <span className={isGrowing ? 'text-green-500' : 'text-red-500'}>{percentChange.toFixed(2)}</span>
                <span>%)</span>
              </div>
            </div>
          })
        }



        {
          user?.role === UserRole.CHILD && <button
            onClick={handleChatClick}
            className="bg-teal-500 text-amber-100 py-2 px-6 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Ask My Parent
          </button>
        }
      </div>
    </div>
  )
}

export default PortfoliosList


{/* Simple Chart */ }
// <div className="h-64 bg-gray-100 p-4 rounded-lg mb-6 flex items-end space-x-4">
//   {portfolio.historicalValues.map((point, index) => {
//     const month = new Date(point.date).toLocaleString('default', { month: 'short' })
//     const height = `${(point.value / (portfolio.portfolioValue * 1.2)) * 100}%`

//     return (
//       <div key={index} className="flex flex-col items-center flex-1">
//         <div
//           className="bg-blue-500 w-full rounded-t-md"
//           style={{ height }}
//         ></div>
//         <div className="text-xs mt-2">{month}</div>
//       </div>
//     )
//   })}
// </div>
