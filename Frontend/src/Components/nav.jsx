import {NavLink} from 'react-router-dom'

const Nav=()=>{
    return(
    <div className='flex items-center justify-between space-x-6 w-full  py-2'>
        <div className='flex justify-between px-15'>
        <NavLink 
            to='/'
            className={({ isActive }) =>
                `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
                  isActive ? "border-blue-400" : "border-transparent"
                }`
              }            
        >Home</NavLink>
        <NavLink 
            to='/test'
            className={({ isActive }) =>
                `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
                  isActive ? "border-blue-400" : "border-transparent"
                }`
              }  
        >Start Assesment</NavLink>
        <NavLink 
            to='/about'   
            className={({ isActive }) =>
                `px-4 py-2 hover:text-yellow-600 transition duration-300 border-b-2 ${
                  isActive ? "border-blue-400" : "border-transparent"
                }`
              }  
        >About</NavLink>
        </div>

        <div className='flex justify-between'>
        <a 
            href='/login'
            className='border border-gray-300 px-4 py-2 rounded-md mx-3'
        >Login</a>
        
        <a 
            href='/signup'
            className='bg-blue-600 text-white px-4 py-2 rounded-md'
        >Sign Up</a>
        </div>
    </div>
    )
}

export default Nav