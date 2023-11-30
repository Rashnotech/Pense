import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
    const [state, setState] = useState(false)
    function toggle () {
        setState(prev => !prev)
    }

    return (
        <>
            <nav className="w-2/5 py-4 font-medium">
                <ul className="text-sm w-full hidden md:flex items-center justify-end space-x-6">
                    <li><Link to='/blog'>Blog</Link></li>
                    <li><Link to='/login'>Sign in</Link> </li>
                    <li><Link to='/register' className="rounded-full text-slate-100 font-medium bg-blue-500 hover:bg-blue-600 px-6 py-3">Get started</Link></li>
                </ul>
                <button onClick={toggle} className="md:hidden float-right block rounded-full bg-slate-200 text-black p-4">
                    {state ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>: 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                        
                    }
                </button>
            </nav>
            {state && <nav className="block absolute w-full mt-28 z-10 rounded-lg p-4 bg-slate-50 md:hidden">
            <ul className="w-full p-4 text-slate-600 flex flex-col">
                    <li className="p-2">
                        <NavLink onClick={() => setState(false) }
                            className={({isActive}) => isActive ? ' text-gray-700 font-medium flex items-center space-x-4': 'flex items-center space-x-4'} to='blog'>
                            <span>Blog</span> 
                        </NavLink>
                    </li>
                    <li className="p-2">
                        <NavLink to='login' className="flex items-start space-x-4" onClick={() => setState(false) }>
                            <span>Sign in</span> 
                        </NavLink>
                    </li>
                    <li className="p-2">
                        <NavLink className="flex items-center space-x-4" to='register' onClick={() => setState(false) } >
                            <span>Get started</span> 
                        </NavLink>
                    </li>
                </ul>
        </nav>}
       </>
    )
}
