'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md'>
      <nav className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link href='/' className='text-2xl font-bold text-gray-900 dark:text-white'>
          SolveEase
        </Link>

        {/* Hamburger Menu for mobile */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
            className='text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'
          }`}
        >
          <li>
            <Link
              href='/'
              className='block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-500'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/workers'
              className='block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-500'
            >
              Workers
            </Link>
          </li>
          <li>
            <Link
              href='/about'
              className='block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-500'
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href='/contact'
              className='block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-500'
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
