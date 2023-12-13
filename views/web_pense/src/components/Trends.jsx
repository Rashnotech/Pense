import { Link } from "react-router-dom"
export function Posts ({posts}) {
    return (
        <Link to={`@${posts.user.firstname.toLowerCase()}/${posts.slug}`} className="flex flex-row w-full items-start justify-start space-x-4 font-sans">
            <div className="text-slate-200 font-semibold text-3xl"><h1>0{posts.id}</h1></div>
            <div className="space-y-1">
                <div className="flex flex-row justify-between items-center">
                    <img src="" className="rounded-full w-5 h-5" alt="" />
                    <p className="text-sm font-medium">{`${posts.user.firstname} ${posts.user.lastname}`}</p>
                </div>
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bold text-lg">{posts.title}</h3>
                    <p className="text-slate-600 text-sm">{(new Date(posts.updated_at)).toDateString()} . <span>{posts.read_time} min read</span></p>
                </div>
            </div>
        </Link>
    )
}

export default function Trends ({contents}) {
    const hotpost = contents && contents.filter(items => items.comments.length > 0)
    return (
        <section className="px-7 md:px-14 py-8 text-base" id="trending">
            <h3 className="font-semibold text-lg">Trending on Pense</h3>
            <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-3">
                {hotpost && hotpost.map(items => <Posts key={items.id} posts={items} /> )}
            </div>
        </section>
    )
}