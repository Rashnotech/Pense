import {useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
import Comments from "./Comment";

export default function PostDetails () {
    const {name, title } = useParams()
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async (name, title) => {
            try {
                const response = await fetch(`https://pense-service.onrender.com/api/v1/posts/read/${name}/${title}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };
        fetchData(name, title);
    }, [])
    return (
        <section className="px-10 mt-28 md:mt-20">
            <Link to='..' className="font-medium text-gray-700 flex flex-row pl-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>Back</Link>
            {post.map(tips => <article className='w-full font-sans flex flex-col items-center justify-between'>
                <div className='w-full px-6'>
                    <h2 className="text-2xl font-bold my-4">{tips.title}</h2>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center space-x-4">
                            <img src={`${tips.post_cover}`} alt="" className="w-10 h-10 rounded-full block border object-fill" />
                            <div className="flex flex-col items-start">
                                <h3 className="font-semibold text-base">{`${tips.user.firstname} ${tips.user.lastname}`}</h3>
                                <p className="text-gray-700 text-sm">{`${tips.read_time} min read. 
                                        ${new Date(tips.updated_at).getHours()}:${new Date(tips.updated_at).getMinutes()} 
                                        ${new Date(tips.updated_at).getUTCDate()}-${new Date(tips.updated_at).getUTCFullYear() % 2000}
                                `}</p>
                            </div>
                        </div>
                        <button className="rounded-full px-4 py-2 border hover:bg-blue-600 bg-blue-500 text-slate-100 font-medium">Follow</button>
                    </div>
                    <div className="mt-3 mb-6">
                        <ul className="flex flex-row items-start space-x-4">
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>

                   <div className="space-y-6">
                        <div className="w-full h-32">
                            <img src="" className="w-full h-full object-cover border rounded-lg" alt="post" />
                        </div>
                        <p className="text-gray-700"> {tips.content} </p>
                    </div> 
                   <Comments />
                </div>
            </article>)}
        </section>
    )
}
