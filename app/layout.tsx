import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import { RegisterModal } from '@/components/modals/RegisterModal'
import ToasterProvider from '@/providers/ToasterProvider'
import { LoginModal } from '@/components/modals/LoginModal'
import { getCurrentUser } from '@/libs/actions'
import {RentModal} from '@/components/modals/RentModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <LoginModal/>
        <RentModal/>
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        <div className='pb-20 pt-28'>

        </div>
        {children}
        </body>
    </html>
  )
}
