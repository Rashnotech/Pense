import { Link } from 'react-router-dom'
function HostPost ({hotpost}) {
    return (
        <article className='w-full font-sans hidden md:flex flex-row items-center justify-between'>
            <div className="w-full"><img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${hotpost.post_cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
            <div className='w-full px-6 space-y-2'>
                <ul className='flex items-center space-x-4'>
                    {hotpost.categories.map(item => <li className="text-base text-blue-700 font-semibold">{item.name}</li>)}
                </ul>
                <h2 className="text-2xl font-bold">{hotpost.title}</h2>
                <p className="text-gray-700 text-sm">
                    {hotpost.summary}
                </p>
                <div className="flex flex-row items-center space-x-4">
                    <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                    <div className="flex flex-col items-center justify-start">
                        <h3 className="font-semibold text-base">{`${hotpost.user.firstname} ${hotpost.user.lastname}`}</h3>
                        <p className="text-gray-700 text-sm"> {(new Date(hotpost.updated_at)).toDateString()} </p>
                    </div>
                </div>
            </div>
        </article>
    )
}


function Posts ({post}) {
    return (
        <Link to={`@${post.user.firstname.toLowerCase()}/${post.slug}`}>
            <article className='w-full font-sans flex flex-col items-center justify-between'>
                <div className="w-full"><img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-2 space-y-2'>
                    <ul className="flex flex-wrap items-center space-x-3">
                        {post.categories.map(cat =><li key={cat.id}><h4 className="text-blue-700 text-sm font-medium">{cat.name}</h4></li>)}
                    </ul>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">{post.summary} </p>
                    <div className="flex flex-row items-center space-x-4">
                        <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                        <div className="flex flex-col items-start justify-evenly">
                            <h3 className="font-semibold text-base">{`${post.user.firstname} ${post.user.lastname}`}</h3>
                            <p className="text-gray-700 text-sm">{`${new Date(post.updated_at).getHours()}:${new Date(post.updated_at).getMinutes()} 
                                                                    ${new Date(post.updated_at).getUTCMonth()}-${new Date(post.updated_at).getUTCFullYear() % 2000}`} </p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default function BlogPost ({posts}) {
    const filtered = posts.length > 0 && posts.filter(post => post.comments && post.comments.length > 0)
    return (
        <section className="px-10 grid grid-col-2 md:grid-cols-3 gap-3 w-full">
            <div className="col-span-2 md:col-span-3 mt-4 mb-7">
                {filtered.length > 0 && <HostPost hotpost={filtered[0]} />}
            </div>
            {
                posts.map(post => <Posts key={post.id} post={post} />)
            }
        </section>
    )
}