import Header from "./Header"
export default function Main() {
    return (
        <div className="w-full px-14 font-sans bg-yellow-500">
            <main className="w-full pt-36 pb-14 h-full space-y-4 font-sans">   
                <h1 className="font-bold text-7xl md:text-8xl">Stay curious.</h1>
                <p className="text-xl font-medium md:w-2/5">Discover stories, thinking and expertise from writers on any topic.</p>
                <button className="px-6 py-3 rounded-full hover:bg-slate-800 cursor-pointer bg-slate-900 text-slate-100 font-medium">Start reading</button>
            </main>
        </div>
    )
}