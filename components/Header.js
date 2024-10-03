import {React, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
    const inactiveLink = 'rounded-md px-2'
    const activeLink = 'bg-sky-400 ' + inactiveLink
    const router = useRouter()
    const {pathname} = router
    const [isOpen, setIsOpen] = useState(false)

  return (
        <header className='bg-rose-200 h-auto container mx-auto flex justify-between px-4 py-2 items-center'>
            <div className='flex gap-2 items-center'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                            </div>
            <div className='text-green-600 font-bold text-xl'>Welcome to James Thiga Enterprises </div>
            </div>
            <nav className='hidden md:flex space-x-2'>
                <Link className={pathname === '/'? activeLink: inactiveLink} href = {'/'}>Products</Link>
                <Link className={pathname.includes('/about') ? activeLink: inactiveLink} href = {'about'}>About Us</Link> 
                <Link className={pathname.includes('/feedback') ? activeLink: inactiveLink} href = {'feedback'}>Feedback</Link>
                <Link className={pathname.includes('/faq') ? activeLink: inactiveLink} href = {'faq'}>FAQ</Link>
                <Link className={pathname.includes('/account') ? activeLink: inactiveLink} href = {'account'}>Account</Link>
                <Link className={pathname.includes('/contact') ? activeLink: inactiveLink} href = {'contact'}>Contact</Link>
            </nav>
            <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <nav className="flex flex-col absolute top-12 left-0 w-full bg-rose-200 p-4 space-y-4">
          <Link
            className={pathname === '/' ? activeLink : inactiveLink}
            href="/"
          >
            Products
          </Link>
          <Link
            className={pathname.includes('/about') ? activeLink : inactiveLink}
            href="about"
          >
            About Us
          </Link>
          <Link
            className={pathname.includes('/feedback') ? activeLink : inactiveLink}
            href="feedback"
          >
            Feedback
          </Link>
          <Link
            className={pathname.includes('/faq') ? activeLink : inactiveLink}
            href="faq"
          >
            FAQ
          </Link>
          <Link
            className={pathname.includes('/account') ? activeLink : inactiveLink}
            href="account"
          >
            Account
          </Link>
          <Link
            className={pathname.includes('/contact') ? activeLink : inactiveLink}
            href="contact"
          >
            Contact
          </Link>
        </nav>
      )}
        </header>
  )
}
