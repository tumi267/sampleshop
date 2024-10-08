import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav/Nav'
import { CartProvider } from './context/context'
import Cart from './components/Cart/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <CartProvider>
        <Nav/>
        <Cart/>
        {children}
        </CartProvider>
        </body>
    </html>
  )
}
