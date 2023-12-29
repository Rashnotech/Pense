import { Link } from 'react-router-dom'

function Posts ({post}) {
    return (
        <Link to={`@${post.user.firstname.toLowerCase()}/${post.slug}`}>
            <div className="flex flex-col font-sans mb-2">
                <div className="flex-none h-48 w-full relative">
                    <img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} alt={post.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-auto p-6 bg-white">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            {post.title}
                        </h1>
                        <div className="text-lg font-semibold text-slate-500">
                            {`${post.user.firstname} ${post.user.lastname}`}
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            {`${new Date(post.updated_at).toDateString()}`}                    
                        </div>
                    </div>
                    <div className="flex items-baseline mt-4 mb-2 pb-2 border-b border-slate-200">
                    <div className="space-x-2 flex text-sm">
                        {post.categories.map(cat =>
                            <div className="rounded-lg p-2 bg-gray-100 flex text-sm items-center justify-center text-gray-700" key={cat.id}>
                                {cat.name}
                            </div>)}
                    </div>
                    </div>
                    <p className="text-sm text-slate-700">
                        {`${post.summary}...`}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default function BlogPost ({posts}) {
    return (
        <section className="px-10 grid grid-flow-row md:grid-flow-col md:grid-cols-3 md:gap-3 w-full">
            {
                posts.map(post => <Posts key={post.id} post={post} />)
            }
        </section>
    )
}