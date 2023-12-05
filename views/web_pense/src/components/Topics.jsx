import { Link } from "react-router-dom"

function Contents ({author, post}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']
    return (
            <Link to={`@${post.user.firstname.toLowerCase()}/${post.slug}`} className="block md:flex flex-col-reverse md:flex-row items-center justify-start w-full">
                <article className="space-y-2 block">
                    <div className="flex flex-row items-start justify-start space-x-2">
                        <img src="" alt="" className="w-5 h-5 rounded-full" />
                        <p className="text-sm font-medium">{author}</p>
                    </div>
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="text-slate-400 text-base">{post.summary}</p>
                    <p className="text-sm text-slate-300">{new Date(post.updated_at).getMonth()} {new Date(post.updated_at).getFullYear() % 2000 }
                    . <span>{post.read_time} min read</span> {post.categories.map(cat => <span key={cat.id} className="mx-1">{cat.name}</span>)}</p>
                </article>
                <img className="w-2/5" src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} alt={post.title} />
            </Link>
    )
}

export default function Topics({categoryList, contents}) {
    return (
        <section className="font-sans h-[500px] grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <div className="md:col-span-2 w-full relative overflow-y-scroll">
                {contents && contents.map(post => <Contents key={post.id} author={`${post.user.firstname} ${post.user.lastname}`} post={post} />)}
            </div>
            <div className="flex flex-col space-y-4 static text-sm">
                <h4 className="font-medium text-lg">Discover more of what matters to you</h4>
                <div className="flex items-center flex-wrap">
                {categoryList && categoryList.map(item => <a href="#" key={item.id} className="rounded-full my-1 px-4 py-2 bg-slate-100">{item.name}</a>) }
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