import {useLoaderData } from "react-router-dom"
import { fetchRequest } from "../../api"
import { Menu } from "@headlessui/react"

export async function loader () {
    const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
    const user_id = JSON.parse(user).userid
    const url = `https://pense.pythonanywhere.com/api/v1/posts/${user_id}`
    const data = await fetchRequest(url)
    return data

}

export default function MyPost () {
    const data = useLoaderData()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']
    return (
        data[0] && data ? data.map(post =>
        <article key={post.id}> 
            <p className="text-slate-600 font-medium text-sm">{(new Date(post.updated_at)).toDateString()}</p>
            <div className='w-full font-sans flex flex-row items-center justify-between'>
                <div className="w-1/3"><img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-6 space-y-2'>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">
                        {post.summary}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm">{post.read_time} min read</p>
                <Menu>
                    <Menu.Button className="text-black relative">...</Menu.Button>
                    <Menu.Items className='flex flex-col absolute right-0 border text-sm bg-slate-50 p-2'>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                className={`${active && 'bg-blue-500'}`}
                                href="/account-settings"
                                >
                                    Edit story
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                className={`${active && 'bg-blue-500'}`}
                                href="/account-settings"
                                >
                                    Delete story
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>  
         </article>) : <p className="text-gray-700 text-base">You have no post</p>
    )
}
