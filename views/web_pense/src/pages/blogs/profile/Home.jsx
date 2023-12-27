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

    function editPost (event, id) {
        event.preventDefault();
        console.log(id);
        // window.location.href = `/blogs/write/${id}`
    }
    async function deletePost (event, id) {
        event.preventDefault();
        const url = `https://pense.pythonanywhere.com/api/v1/posts/${id}`
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'}
            });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        window.location.reload()
    }
    return (
        data[0] && data ? data.map(post =>
        <article key={post.id}> 
            <p className="text-slate-600 font-medium text-sm">{(new Date(post.updated_at)).toDateString()}</p>
            <div className='w-full font-sans flex flex-col md:flex-row items-center justify-between'>
                <div className="w-full md:w-1/3"><img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} className="w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-3 md:px-6 space-y-2'>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">
                        {post.summary}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between pr-1 md:pr-8">
                <p className="text-slate-500 text-sm">{post.read_time} min read</p>
                <Menu>
                    <Menu.Button className="inline-flex justify-center rounded-md px-4 py-2 text-xl text-gray-700 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">...</Menu.Button>
                    <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                        <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={(event) => editPost(event, post.id)}
                                className={`${
                                active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                {active ? (
                                <EditActiveIcon
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                ) : (
                                <EditInactiveIcon
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                )}
                                Edit story
                            </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                onClick={(event) => deletePost(event, post.id)}
                                className={`${
                                active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                {active ? (
                                <DeleteActiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                />
                                ) : (
                                <DeleteInactiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                />
                                )}
                                Delete
                            </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>  
         </article>) : <p className="text-gray-700 text-base">You have no post</p>
    )
}


function EditInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function EditActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>
    )
  }

  function DeleteInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    )
  }
  
  function DeleteActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
      </svg>
    )
  }
  