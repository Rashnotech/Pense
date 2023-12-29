import {useLoaderData } from "react-router-dom"
import {Fragment} from "react"
import { fetchRequest } from "../../api"
import { Menu, Transition } from "@headlessui/react"

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
        window.location.href = `/edit/${id}`
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
        <article key={post.id} className=""> 
            <p className="text-gray-500 font-normal pl-2 mb-0 text-sm">{(new Date(post.updated_at)).toDateString()}</p>
            <div className='w-full font-sans flex flex-col md:flex-row items-center justify-between'>
                <div className="w-full md:w-1/3"><img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${post.post_cover}`} className="flex-none w-full h-full object-cover rounded-lg" alt="" /></div>
                <div className='w-full px-3 md:px-6 space-y-2'>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700 text-sm">
                        {`${post.summary}...`}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between pr-1 md:pr-8">
                <p className="text-gray-500 text-sm pt-2 pl-3">{post.read_time} min read</p>
                <Menu as ="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">...</Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                    </Transition>
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
  