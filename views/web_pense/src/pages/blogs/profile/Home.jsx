import {useLoaderData } from "react-router-dom"
import { fetchRequest } from "../../api"

export async function loader () {
    const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
    const user_id = JSON.parse(user).userid
    const url = `http://127.0.0.1:5000/api/v1/posts/${user_id}`
    const data = await fetchRequest(url)
    return data
}

export default function MyPost () {
    const data = useLoaderData()
    return (
        data && data.length == 0 ? data.map(post => (<article key={post.id} className='w-full font-sans flex flex-row items-center justify-between'>
            <div className="w-1/3"><img src="" className="w-full h-full object-cover rounded-lg" alt="" /></div>
            <div className='w-full px-6 space-y-2'>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-700 text-sm">
                    {post.content}
                </p>
            </div>
         </article>)) : <p className="text-gray-700 text-base">You have no post</p>
    )
}
