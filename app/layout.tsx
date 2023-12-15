import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navrbar from '@/components/Navrbar'
import ClientOnly from '@/components/ClientOnly'
import RegisterModel from '@/components/models/RegisterModel'
import LoginModel from '@/components/models/LoginModel'
import ToasterProvider from '@/providers/ToasterProvider'
import getCurrentUser from '@/actions/getCurrentUser'
import RentModel from '@/components/models/RentModel'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModel />
          <RentModel />
          <RegisterModel />
           <Navrbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 ptt-28 pt-10">
          {children}
        </div>
      </body>
    </html>
  )
}
