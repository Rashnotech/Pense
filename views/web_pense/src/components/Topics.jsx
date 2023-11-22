import { Link } from "react-router-dom"

function Contents () {
    return (
        <section className="absolute flex flex-row items-start justify-start w-full">
            <article className="space-y-2">
                <div className="flex flex-row items-start justify-start space-x-2">
                    <img src="" alt="" className="w-5 h-5 rounded-full" />
                    <p className="text-sm font-medium">author</p>
                </div>
                <h2 className="text-lg font-semibold">Titulo</h2>
                <p className="text-slate-400 text-base">Contenido</p>
                <p className="text-sm text-slate-300">Date . <span>time read</span> <a>Categories</a></p>
            </article>
            <img src="" alt="post cover" />
        </section>
    )
}

export default function Topics() {
    return (
        <section className="font-sans h-[500px] grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <div className="md:col-span-2 col-auto h-full relative overflow-x-hidden overflow-y-auto">
                <Contents />
            </div>
            <div className="flex flex-col space-y-4 static text-sm">
                <h4 className="font-medium text-lg">Discover more of what matters to you</h4>
                <div>
                <a href="" className="rounded-full px-4 py-2 bg-slate-200">Categories</a>
                </div>
                <a href="" className="text-green-600 font-medium">see more topics</a>
                <div className="border-t mx-auto w-full py-4">
                    <ul className="flex flex-row flex-wrap w-3/4 items-end justify-between font-medium text-slate-500">
                        <li><Link to=''>Help</Link></li>
                        <li><Link to=''>About</Link></li>
                        <li><Link to='/'>Blog</Link></li>
                        <li><Link to=''>Privacy</Link></li>
                        <li><Link to=''>Terms</Link></li>
                        <li><Link to='/'>Text to speech</Link></li>
                        <li><Link to=''>Teams</Link></li>
                        <li><Link to=''>Career</Link></li>
                        <li><Link to=''>Status</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}