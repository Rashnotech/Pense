import { Link } from "react-router-dom"
export default function Main() {
    return (
        <div className="w-full px-14 font-sans bg-yellow-500">
            <main className="w-full pt-36 pb-14 h-full space-y-4 font-sans">
                <div id="wrapper">
                    <h1 className="font-bold text-7xl md:text-8xl">Stay&nbsp;</h1>
                    <ul className="dynamic-text h-24">
                        <li className="h-full">
                            <h1 className="text-7xl md:text-8xl font-bold">
                                <span>curious.</span>
                            </h1>
                        </li>
                        <li className="h-full">
                            <h1 className="text-7xl md:text-8xl font-bold">
                                <span>inspired.</span>
                            </h1>
                        </li>
                        
                    </ul>
                </div>   
                    
                <p className="text-xl font-medium md:w-2/5">Discover stories, thinking and expertise from writers on any topic.</p>
                <button className="px-6 py-3 rounded-full hover:bg-slate-800 cursor-pointer bg-slate-900 text-slate-100 font-medium" ><Link to='/login'>Start reading</Link></button>
            </main>
        </div>
    )
}