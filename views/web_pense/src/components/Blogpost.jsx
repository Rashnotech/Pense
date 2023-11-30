import { Link } from 'react-router-dom'
function HostPost () {
    return (
        <article className='w-full font-sans flex flex-row items-center justify-between'>
            <div className="w-full"><img src="" className="w-full h-full object-cover rounded-lg" alt="" /></div>
            <div className='w-full px-6 space-y-2'>
                <h4 className="text-base text-blue-700 font-semibold">Category</h4>
                <h2 className="text-2xl font-bold">Post Title</h2>
                <p className="text-gray-700 text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi
                    libero quas ut fugiat exercitationem blanditiis quod, saepe nobis 
                    expedita vitae aperiam voluptas culpa iste officiis ex voluptatibus 
                    iure velit.
                </p>
                <div className="flex flex-row items-center space-x-4">
                    <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                    <div className="flex flex-col items-center justify-start">
                        <h3 className="font-semibold text-base">Fullname</h3>
                        <p className="text-gray-700 text-sm"> 12:30 06-24 </p>
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
                <div className="w-full"><img src={`${post.post_cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-2 space-y-2'>
                    <ul className="flex flex-wrap items-center space-x-3">
                        {post.categories.map(cat =><li key={cat.id}><h4 className="text-blue-700 text-base font-semibold">{cat.name}</h4></li>)}
                    </ul>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">{post.summary} </p>
                    <div className="flex flex-row items-center space-x-4">
                        <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                        <div className="flex flex-col items-start justify-evenly">
                            <h3 className="font-semibold text-base">{`${post.user.firstname} ${post.user.lastname}`}</h3>
                            <p className="text-gray-700 text-sm">{`${new Date(post.updated_at).getHours()}:${new Date(post.updated_at).getMinutes()} 
                                                                    ${new Date(post.updated_at).getUTCDate()}-${new Date(post.updated_at).getUTCFullYear()}`} </p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default function BlogPost ({posts}) {
    return (
        <section className="px-10 grid grid-col-2 md:grid-cols-3 gap-3 w-full">
            <div className="col-span-2 md:col-span-3 mt-4 mb-7">
                <HostPost />
            </div>
            {
                posts.map(post => <Posts key={post.id} post={post} />)
            }
        </section>
    )
}