import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [state, setState] = useState(false)
    function toggle () {
        setState(prev => !prev)
    }

    return (
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
    )
}