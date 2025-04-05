import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { AuthProvider } from '@/lib/context/AuthContext'
import { PortfolioProvider } from '@/lib/context/PortfolioContext'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Family Investment Dashboard',
  description: 'A dashboard for families to track investments together',
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PortfolioProvider>
            <div className="min-h-screen bg-emerald-500 flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </PortfolioProvider>

        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
