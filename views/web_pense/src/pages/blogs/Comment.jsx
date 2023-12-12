import { useState } from "react"
import { useEffect } from "react"
import { fetchRequest } from "../api";

export default function Comments ({post_id, show}) {
    const [comment, setComment] = useState({
        comment: '',
        post_id: post_id,
    });
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchComment = async () => {
            const url = `https://pense.pythonanywhere.com/api/v1/comments/${post_id}`
            try {
                const data = await fetchRequest(url);
                setData(data);
            } catch (error) {
                setError(error.message)
            }
        }
        fetchComment();
    }, [message])

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
            const user = JSON.parse(token).userid;
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
            setMessage('successfully')
            setComment({'comment': '', 'post_id': post_id})
        }
    }
    return (
        <section className="my-4">
            <h2 className="font-semibold text-lg text-gray-700 block my-2">Comments</h2>
            {data && data.map(info =>
                <div key={info.id}>
                    <div>
                        <div className="flex flex-row items-center space-x-4">
                            <img src="" alt="" className="rounded-full w-10 h-10" />
                            <div className="leading-tight mb-2">
                                <h4 className="font-semibold text-base">{info.users.fullname}</h4>
                                <p className="text-gray-700 text-sm font-light">{new Date(info.updated_at).toDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="text-gray-700 text-sm">
                            {info.comment}
                        </p>
                    </div>
                </div>
            )}
            {error &&
                <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-amber-600 px-2">{error}</p>
                </div>}
            {show && <input type="text"
                name="comment"
                value={comment.comment}
                className="border rounded-md px-4 text-sm text-gray-600 font-medium py-2 shadow-sm outline-none w-full md:w-1/2 my-3"
                placeholder="What are your thoughts?"
                id=""
                onChange={handleChange}
                onKeyDownCapture={handleKeyDown}
            /> }
        </section>
    )
}