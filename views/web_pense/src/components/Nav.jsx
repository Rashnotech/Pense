import { Link } from "react-router-dom"
import Logo from '/logo.png'
import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        // Your code to run after the component has been rendered
        var expand_trigger = document.getElementById("navbar-trigger");
        var bar1 = document.querySelector("#bar1");
        var bar2 = document.querySelector("#bar2");
        var bar3 = document.querySelector("#bar3");
        var navbar_sign_in_up = document.querySelector("#navbar-menu");

        if (!expand_trigger || !bar1 || !bar2 || !bar3 || !navbar_sign_in_up) {
          // Handle elements not found
          console.error("One or more elements not found.");
          return;
        }

        const clickHandler = () => {
                const elements = navbar_sign_in_up.querySelectorAll("a");
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
    return (
        <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 m-6 shadow-sm rounded-xl bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full p-0 px-6 mx-auto flex-wrap-inherit">
              <Link className="py-1.75 text-sm mr-4 ml-4 whitespace-nowrap font-bold text-slate-700 lg:ml-0" to=".">
                    <img src={Logo} className="w-16"  alt="Pense Logo" />
              </Link>
              <button id="navbar-trigger" className="px-3 py-1 ml-2 leading-none transition-all ease-in-out bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg lg:hidden" type="button" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                  <span id="bar1" className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span id="bar2" className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span id="bar3" className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300 mt-1.75"></span>
                </span>
              </button>
              <div id="navbar-menu" className="items-center flex-grow transition-all duration-500 lg-max:overflow-hidden ease basis-full lg:flex lg:basis-auto lg-max:max-h-0">
                <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                  <li>
                    <Link to='/blog' reloadDocument className="flex items-center px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to='/about' reloadDocument className="block px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to='login' reloadDocument className="block px-4 py-2 mr-2 font-normal transition-all ease-in-out duration-250 text-sm text-slate-700 lg:px-2 lg-max:opacity-0">
                      Sign in
                    </Link>
                  </li>
                </ul>
                <ul className="hidden pl-0 mb-0 list-none lg:block lg:flex-row">
                  <li>
                    <Link to='register' reloadDocument className="inline-block px-8 py-2 mb-0 mr-1 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer hover:-translate-y-px hover:shadow-xs active:opacity-85 text-xs tracking-tight-rem lg-max:opacity-0">Get started</Link>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    );
}
