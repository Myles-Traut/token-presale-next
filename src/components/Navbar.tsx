import Link from "next/link";
import Image from 'next/image'

import Profile from "./Profile";

export default function Navbar() {
    return(
      <header>
        <nav className="flex relative bg-gray-50">
          <div>
            <a href="#">
              <Image src="/favicon.ico" alt="Logo" width={60} height={60} className="ml-5 my-2"/>
            </a>
          </div>
          <div className="flex absolute items-center inset-y-0 left-32 text-2xl">
            <Link
              href="/" className="text-gray-900 hover:text-indigo-800 px-5"
              >Home</Link>
            <Link
              href="/buy" className="text-gray-900 px-5 hover:text-indigo-800"
              >Buy</Link>
          </div>
          <div className="flex absolute inset-y-0 right-0 space-x-1 my-4 mr-8 w-2/12 items-center">
            <Profile />
          </div>
        </nav>
      </header>
    )
}