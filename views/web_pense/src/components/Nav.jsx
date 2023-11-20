import { useState } from "react"

export default function Navbar({handleClick}) {
    return (
        <nav className="w-2/5 py-4 font-medium">
            <ul className="text-sm w-full hidden md:flex items-center justify-end space-x-6">
                <li>Blog</li>
                <li><button onClick={() => handleClick()}>Sign in</button> </li>
                <li><button onClick={() => handleClick()} className="rounded-full text-slate-100 font-medium bg-blue-500 hover:bg-blue-600 px-6 py-3">Get started</button></li>
            </ul>
            <button className="md:hidden float-right block rounded-full bg-slate-200 text-black px-4 py-2">X</button>
        </nav>
    )
}