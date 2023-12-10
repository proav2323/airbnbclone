import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navrbar from '@/components/Navrbar'
import ClientOnly from '@/components/ClientOnly'
import RegisterModel from '@/components/models/RegisterModel'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <RegisterModel />
           <Navrbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
