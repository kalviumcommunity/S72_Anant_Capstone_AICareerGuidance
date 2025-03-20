import React from 'react'
import Nav from './nav'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className='bg-white sticky top-0 z-20 w-full shadow-md px-6 py-4 flex items-center justify-between h-18'>
        <img src={logo} className='w-16'/>
        <h5 className='text-2xl text-nowrap font-bold text-blue-800'>Career Boat</h5>
        <Nav/>
    </header>
  )
}

export default Header