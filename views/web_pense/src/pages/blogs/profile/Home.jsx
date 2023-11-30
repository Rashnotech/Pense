import {useLoaderData } from "react-router-dom"
import { fetchRequest } from "../../api"

export async function loader () {
    const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
    const user_id = JSON.parse(user).userid
    const url = `https://pense-service.onrender.com/api/v1/posts/${user_id}`
    const data = await fetchRequest(url)
    return data

}

export default function MyPost () {
    const data = useLoaderData()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']
    return (
        data[0] || data ? data.map(post =>
        <article key={post.id}> 
            <p className="text-slate-600 font-medium text-sm">{months[new Date(post.updated_at).getMonth()]} {new Date(post.updated_at).getDay() }</p>
            <div className='w-full font-sans flex flex-row items-center justify-between'>
                <div className="w-1/3"><img src={`${post.cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-6 space-y-2'>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">
                        {post.summary}
                    </p>
                </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">{post.read_time} min read</p>
         </article>) : <p className="text-gray-700 text-base">You have no post</p>
    )
}
