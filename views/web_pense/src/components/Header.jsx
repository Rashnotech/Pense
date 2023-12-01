import { Fragment } from "react"
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Nav"
import Logo from '/logo.png'
import { useState, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import { fetchUsers } from "../store/user"

export default function Header() {
    return (
        <>
            <header className="py-2 z-10 bg-slate-100 fixed top-0 px-4 md:px-10 w-full flex items-center justify-between">
                <img src={Logo} className="w-28"  alt="Pense Logo" />
                <Navbar />
            </header>
        </>
    )
}

export function BlogHeader () {
    const [state, setState] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    const username = user.users[0] ? user.users[0].firstname : ''

    function toggle () {
        setState(prev => !prev)
    }
    function logOut () {
        sessionStorage.removeItem('Browser_session')
        localStorage.removeItem('Browser_session')
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
    }
    return (
        <>
            <header className="z-10 font-sans bg-slate-100 fixed top-0 px-4 md:px-10 w-full flex items-center justify-between">
                <Link to="."> <img src={Logo} className="w-28"  alt="Pense Logo" /></Link> 
                <nav className="w-2/5 py-4">
                    <ul className="w-full hidden text-sm text-slate-600 md:flex items-center justify-end space-x-6">
                        <li>
                            <NavLink className={({isActive}) => isActive ? ' text-gray-700 font-medium flex items-center': 'flex items-center'} to='write'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg> Write
                            </NavLink>
                        </li>
                        <li>
                            <NavLink>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    <img src="" className="w-10 h-10 rounded-full border" alt="" />
                                </Menu.Button>
                                </div>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <NavLink to={`me/@${username}`}
                                                className={`${
                                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                                <span>Account</span> 
                                            </NavLink>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <button
                                            className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                            <span>Settings</span>
                                        </button>
                                        )}
                                    </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <button onClick={logOut}
                                            className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                                        >   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>
                                            <span>Logout</span> 
                                            
                                        </button>
                                        )}
                                    </Menu.Item>
                                    </div>
                                </Menu.Items>
                                </Transition>
                            </Menu>   
                        </li>
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
            </header>
            {state && <nav className="block absolute w-full mt-20 z-10 rounded-lg p-4 bg-slate-50 md:hidden">
             <ul className="w-full p-4 text-slate-600 flex flex-col">
                        <li className="p-2">
                            <NavLink onClick={() => setState(false) }
                                className={({isActive}) => isActive ? ' text-gray-700 font-medium flex items-center space-x-4': 'flex items-center space-x-4'} to='write'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg> <span>Write</span> 
                            </NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="flex items-start space-x-4" onClick={() => setState(false) }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg> <span>Message</span> 
                            </NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="flex items-center space-x-4" to={`me/@${username}`} onClick={() => setState(false) } >
                                <img src="" className="rounded-full w-5 h-5 border" alt="" />
                                <span>Profile</span> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink>
                                <button onClick={logOut} className="flex items-center space-x-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>Logout</span>        
                                </button>
                            </NavLink>
                        </li>
                    </ul>
            </nav>}
        </>
    )
}