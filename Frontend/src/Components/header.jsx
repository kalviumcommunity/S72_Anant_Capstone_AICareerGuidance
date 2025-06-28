import React from 'react'
import Nav from './nav'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className='bg-white sticky top-0 z-20 w-full shadow-md px-3 md:px-6 py-3 md:py-4 flex items-center justify-between h-auto'>
      <div className="flex items-center gap-3">
        <img src={logo} className='w-12 md:w-16'/>
        <h5 className='text-xl md:text-2xl font-bold text-blue-800 text-center'>Career Boat</h5>
      </div>
      <div className="flex-1">
        <Nav/>
      </div>
    </header>
  )
}

export default Header