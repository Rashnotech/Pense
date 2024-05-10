import { Link } from "react-router-dom"
import Adv from '../assets/blog.svg';

export default function Main() {
    return (
        <div className="w-full font-sans bg-yellow-500 px-10 md:px-14 py-6 mx-auto">
            <main className="w-full pt-36 pb-14 md:h-[80vh] h-[100vh] flex space-y-4 font-manrope ">
                <div id="wrapper">
                    <h1 className="font-black text-7xl md:text-8xl">Stay&nbsp;</h1>
                    <ul className="dynamic-text h-24">
                        <li className="h-full">
                            <h1 className="text-7xl md:text-8xl font-black">
                                <span>curious.</span>
                            </h1>
                        </li>
                        <li className="h-full">
                            <h1 className="text-7xl md:text-8xl font-black">
                                <span>inspired.</span>
                            </h1>
                        </li>
                        
                    </ul>
                    <div className="w-full">
                        <p className="text-xl font-semibold md:w-3/5">
                            Discover stories, thinking and expertise from writers on any topic.
                        </p>
                    </div>
                    <button className="px-6 py-2 block rounded-md hover:bg-slate-800 cursor-pointer bg-slate-900 text-slate-100 font-medium" >
                        <Link to='/login'>Start reading</Link>
                    </button>
                </div>   
                <img src={Adv} className="w-1/2 md:block hidden" alt="Pense" />
            </main>
        </div>
    )
}