import Form from "./Forms"
import Navbar from "./Nav"
import Logo from '/logo.png'
import { useState } from "react"
export default function Header() {
let [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <header className="py-3 z-10 bg-slate-100 fixed top-0 px-4 md:px-10 w-full flex items-center justify-between">
                <img src={Logo} className="w-28"  alt="Pense Logo" />
                <Navbar handleClick={() => setIsOpen(true)} />
            </header>
            <Form isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </>
    )
}