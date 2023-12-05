import {useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
import Comments from "./Comment";

export default function PostDetails () {
    const {name, title } = useParams()
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async (name, title) => {
            try {
                const response = await fetch(`https://pense.pythonanywhere.com/api/v1/posts/read/${name}/${title}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };
        fetchData(name, title);
    }, []);
    
    function shareLink () {
        const url = window.location.href
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
    }
    return (
        <section className="px-10 mt-28 md:mt-20">
            <Link to='..' className="font-medium text-gray-700 flex flex-row pl-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>Back</Link>
            {post.map(tips => <article key={tips.id} className='w-full font-sans flex flex-col items-center justify-between'>
                <div className='w-full px-6'>
                    <h2 className="text-2xl font-bold my-4">{tips.title}</h2>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center space-x-4">
                            <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                            <div className="flex flex-col items-start">
                                <h3 className="font-semibold text-base">{`${tips.user.firstname} ${tips.user.lastname}`}</h3>
                                <p className="text-gray-700 text-sm">{`${tips.read_time} min read. 
                                        ${new Date(tips.updated_at).getUTCMonth()}-${new Date(tips.updated_at).getUTCFullYear() % 2000}
                                `}</p>
                            </div>
                        </div>
                        <button className="rounded-full px-4 py-2 border hover:bg-blue-600 bg-blue-500 text-slate-100 font-medium">Follow</button>
                    </div>
                    <div className="mt-3 mb-6 flex border border-r-0 border-l-0 items-center w-full">
                        <ul className='text-slate-400 flex space-x-4'>
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                        <ul className="flex items-center justify-end py-2 w-full text-slate-400 space-x-4">
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
                                <button onClick={shareLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>

                   <div className="space-y-6">
                        <div className="w-full">
                            <img src={`https://pense.pythonanywhere.com/api/v1/upload/images/${tips.post_cover}`} alt={tips.post_cover} className="w-full h-full object-cover border rounded-lg" />
                        </div>
                        {tips.content.split(/\r?\n/).map((line, index) => (
                        <p key={index} className="text-gray-700 text-justify text"> 
                            {line}
                            <br />
                        </p>
                        ))} 
                        <ul className='flex'>
                            {tips.categories.map(cat => <li key={cat.id} className='rounded-full px-4 py-2 text-sm bg-slate-100'>{cat.name}</li>)}
                        </ul>
                    </div> 
                   <Comments post_id={tips.id} />
                </div>
            </article>)}
        </section>
    )
}
