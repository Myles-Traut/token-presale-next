import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useAccount } from 'wagmi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { address } = useAccount();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <p className='items-center'>Home</p>
    </main>
  )
}
