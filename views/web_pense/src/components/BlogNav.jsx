import { useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import Logo from '/logo.png'
import { Menu, Transition } from '@headlessui/react'

export default function BlogNav ({username}) {
    useEffect(() => {
        // Your code to run after the component has been rendered
        var expand_trigger = document.getElementById("navbar-trig");
        var bar1 = document.querySelector("#b1");
        var bar2 = document.querySelector("#b2");
        var bar3 = document.querySelector("#b3");
        var navbar_sign_in_up = document.querySelector("#navbar-option");

        if (!expand_trigger || !bar1 || !bar2 || !bar3 || !navbar_sign_in_up) {
          // Handle elements not found
          console.error("One or more elements not found.");
          return;
        }

        const elements = navbar_sign_in_up.querySelectorAll("a");

        const clickHandler = () => {
                if (navbar_sign_in_up.classList.contains("lg-max:max-h-0")) {
                    navbar_sign_in_up.classList.remove("lg-max:max-h-0");
                    navbar_sign_in_up.classList.add("lg-max:max-h-54");
                    setTimeout(function () {
                        elements.forEach((element) => {
                            element.classList.remove("lg-max:opacity-0");
                        });
                    }, 50);
                } else {
                    setTimeout(function () {
                    elements.forEach((element) => {
                        element.classList.add("lg-max:opacity-0");
                    });
                    }, 100);
                    navbar_sign_in_up.classList.remove("lg-max:max-h-54");
                    navbar_sign_in_up.classList.add("lg-max:max-h-0");
                }
      
            bar1.classList.toggle("rotate-45");
            bar1.classList.toggle("origin-10-10");
            bar1.classList.toggle("mt-1");
      
            bar2.classList.toggle("opacity-0");
      
            bar3.classList.toggle("-rotate-45");
            bar3.classList.toggle("origin-10-90");
            bar3.classList.toggle("mt-0.75");
            bar3.classList.toggle("mt-1.75");
          };

        expand_trigger.addEventListener("click", clickHandler);
    
        // Clean up the event listener when the component unmounts
        return () => {
            expand_trigger.removeEventListener("click", clickHandler);
        }
      }, []);

    function logOut () {
        sessionStorage.removeItem('Browser_session')
        localStorage.removeItem('Browser_session')
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
    }
    return (
        <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 m-6 shadow-sm rounded-xl bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full p-0 px-6 mx-auto flex-wrap-inherit">
              <Link className="py-1.75 text-sm mr-4 ml-4 whitespace-nowrap font-bold text-slate-700 lg:ml-0" to=".">
                    <img src={Logo} className="w-16"  alt="Pense Logo" />
              </Link>
              <button id="navbar-trig" className="px-3 py-1 ml-2 leading-none transition-all ease-in-out bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg lg:hidden" type="button" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                  <span id="b1" className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span id="b2" className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span id="b3" className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300 mt-1.75"></span>
                </span>
              </button>
              <div id="navbar-option" className="items-center flex-grow transition-all duration-500 lg-max:overflow-hidden ease basis-full lg:flex lg:basis-auto lg-max:max-h-0">
                <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                  <li>
                        <Link reloadDocument className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0" to='write'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg> Write
                        </Link>
                  </li>
                  <li>
                        <Link to={`me/@${username.toLowerCase()}`} className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                            <span>Account</span> 
                        </Link>
                  </li>
                  <li>
                        <Link className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg> Notifications
                        </Link>
                  </li>
                  <li className="block md:hidden">
                        <Link to='/blog/me/settings' className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </Link>
                  </li>
                  <li className="block md:hidden">
                        <Link onClick={logOut} className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Logout
                        </Link>
                  </li>
                  <li className="hidden md:block">
                    <Menu as="div" className="relative inline-block text-left align-middle px-4 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2">
                            <div>
                                <Menu.Button className="inline-flex items-center w-full justify-center py-2 text-sm font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    <img src="" className="w-6 h-6 rounded-full border" alt="" />
                                    <span>{username}</span>
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
                                    <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <Link to='/blog/me/settings'
                                            className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                            <span>Settings</span>
                                        </Link>
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
              </div>
            </div>   
        </nav>               
    )
}