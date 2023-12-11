export function Posts () {
    return (
        <article className="flex flex-row w-full items-start justify-start space-x-4 font-sans">
            <div className="text-slate-200 font-semibold text-3xl"><h1>01</h1></div>
            <div className="space-y-3">
                <div className="flex flex-row justify-between items-center">
                    <img src="" className="rounded-full w-5 h-5" alt="" />
                    <p className="text-sm font-medium">author</p>
                </div>
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-lg">Topics</h3>
                    <p className="text-slate-600 text-sm">Date . <span>time read</span></p>
                </div>
            </div>
        </article>
    )
}

export default function Trends () {
    return (
        <section className="px-7 md:px-14 py-8 text-base" id="trending">
            <h3 className="font-semibold text-lg">Trending on Pense</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Posts />
                <Posts />
                <Posts />
            </div>
        </section>
    )
}