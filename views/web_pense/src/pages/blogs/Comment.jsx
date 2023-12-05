import { useState } from "react"
import { useEffect } from "react"

export default function Comments ({post_id}) {
    const [comment, setComment] = useState({
        comment: '',
        post_id: post_id,
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    function handleChange (event) {
        const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
        if (user === undefined || user === null) {
            setError('You need to login to comment');
        } else {
            setError('');
            const {name, value} = event.target
            setComment(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    async function handleKeyDown (event) {
        if (event.key === 'Enter') {
            const token = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session');
            const user = JSON.parse(token).user_id;
            const credential = {
                ...comment,
                'user_id': user,
            }
            const res = await fetch('https://pense.pythonanywhere.com/api/v1/comments',
                {headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST", body: JSON.stringify(credential)});
            if (!res.ok) {
                const error_json = await res.json()
                setError(error_json.message)
            }
            const data = await res.json();
            setMessage('Comment posted successfully')
        }
    }
    return (
        <section className="my-4">
            <h2 className="font-semibold text-lg text-gray-700 block my-2">Comments</h2>
            <div>
                <div className="flex flex-row items-center space-x-4">
                    <img src="" alt="" className="rounded-full w-10 h-10" />
                    <div className="leading-tight mb-2">
                        <h4 className="font-semibold text-base">John Doe</h4>
                        <p className="text-gray-700 text-sm font-light">2min read . Today, 12:30pm</p>
                    </div>
                    
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-slate-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dolorem eaque eum velit, reiciendis nobis adipisci ipsam ullam fugiat, 
                    nihil eligendi reprehenderit enim vel molestiae animi deserunt totam quis
                    ipsa asperiores.
                </p>
            </div>
            {error &&
                <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-amber-600 px-2">{error}</p>
                </div>}
            {message && 
                <div className="flex px-4 py-2 items-center bg-green-50 rounded-md text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                    <p className="text-sm text-green-600 px-2">{message}</p>
                </div>
            }
            <input type="text"
                name="comment"
                className="border rounded-md px-4 py-2 shadow-sm outline-none w-full md:w-1/2 my-3 focus:ease-in focus:delay-100"
                placeholder="What are your thoughts?"
                id=""
                onChange={handleChange}
                onKeyDownCapture={handleKeyDown}
            />
        </section>
    )
}