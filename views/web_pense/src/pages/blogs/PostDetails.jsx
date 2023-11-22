import { useParams, Link } from "react-router-dom";
import Comments from "./Comment";


export default function PostDetails () {
    const params = useParams()
    return (
        <section className="px-10 mt-28 md:mt-20">
            <Link to='..' className="font-medium text-gray-700 flex flex-row pl-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>Back</Link>
            <article className='w-full font-sans flex flex-col items-center justify-between'>
                <div className='w-full px-6'>
                    <h2 className="text-2xl font-bold my-4">Post Title</h2>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center space-x-4">
                            <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                            <div className="flex flex-col items-start">
                                <h3 className="font-semibold text-base">Fullname</h3>
                                <p className="text-gray-700 text-sm">16min read. 12:30 06-24 </p>
                            </div>
                        </div>
                        <button className="rounded-full px-4 py-2 border hover:bg-blue-600 bg-blue-500 text-slate-100 font-medium">Following</button>
                    </div>
                    <div className="mt-3 mb-6">
                        <ul className="flex flex-row items-start space-x-4">
                            <li>Bookmark</li>
                            <li>Listen</li>
                            <li>Share</li>
                        </ul>
                    </div>

                   <div className="space-y-6">
                        <div className="w-full h-32">
                            <img src="" className="w-full h-full object-cover border rounded-lg" alt="post" />
                        </div>
                        <p className="text-gray-700"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi
                            libero quas ut fugiat exercitationem blanditiis quod, saepe nobis 
                            expedita vitae aperiam voluptas culpa iste officiis ex voluptatibus 
                            iure velit.
                        </p>
                    </div> 
                   <Comments />
                </div>
            </article>
        </section>
    )
}