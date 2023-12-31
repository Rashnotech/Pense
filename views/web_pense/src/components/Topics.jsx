import { Link } from "react-router-dom"

function Contents ({author, post}) {
    return (
            <Link to={`@${post.user.firstname.toLowerCase()}/${post.slug}`} className="flex mb-6 flex-row justify-between items-center w-full">
                <article className="space-y-2 block">
                    <div className="flex flex-row items-start justify-start space-x-2">
                        <img src="" alt="" className="w-5 h-5 rounded-full" />
                        <p className="text-sm font-medium">{author}</p>
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-ellipsis">{post.title}</h2>
                    <p className="text-slate-400 text-sm hidden md:block md:text-ellipsis">{post.summary}</p>
                    <p className="text-xs text-ellipsis hidden md:block text-slate-300">{new Date(post.updated_at).toDateString()}
                    . <span>{post.read_time} min read</span> {post.categories.map(cat => <span key={cat.id} className="mx-1 text-gray-700 bg-gray-100 rounded-full p-2">{cat.name}</span>)}</p>
                </article>
                <img className="w-1/2 md:w-1/5 h-32 object-cover" src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} alt={post.title} />
            </Link>
    )
}

export default function Topics({categoryList, contents}) {

    return (
        <section className="font-sans h-full overflow-x-hidden grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <div className="md:col-span-2 w-full h-full">
                    {contents && contents.map(post => <Contents key={post.id} author={`${post.user.firstname} ${post.user.lastname}`} post={post} />)}
            </div>
            <div className="flex flex-col space-y-4 static text-sm">
                <h4 className="font-medium text-lg">Discover more of what matters to you</h4>
                <div className="flex items-center flex-wrap">
                {categoryList && categoryList.map(item => <a href="#" key={item.id} className="rounded-full my-1 px-4 py-2 bg-slate-100">{item.name}</a>) }
                </div>
                <a href="" className="text-green-600 font-medium">see more topics</a>
                <div className="border-t mx-auto w-full py-4">
                    <ul className="flex flex-wrap w-full space-x-2 items-center font-medium text-slate-500">
                        <li><Link to=''>Help</Link></li>
                        <li><Link to='/about'>About</Link></li>
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