import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function Edit () {
    const navigate = useNavigate();
    const [process, setProcess] = useState(false)
    const {name, title} = useParams();
    const [value, setValue] = useState({'title': ''})
    const [post, setPost] = useState([])
    const editorRef = useRef(null);
    const [error, setError] = useState('')
    
    useEffect(() => {
        const fetchData = async (name, title) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/read/@${name}/${title}`);
                const data = await response.json();
                setPost(data);
                setValue(prev => ({...prev, title: data[0].title}))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(name, title);
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target
        setValue(prev => ({...prev, [name]: value}))
    }

    async function update (id) {
        setProcess(true)

        const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
        const userid = JSON.parse(user).userid
        const url = `${import.meta.env.VITE_API_URL}/posts/${id}`
        const credentials = {
            title: value.title,
            content: editorRef.current.getContent(),
            user_id: userid
        };
        const res = await fetch(url, {
                        headers: new Headers({'Content-Type': 'application/json'}),
                        method: "PUT",
                        body: JSON.stringify(credentials)});
        if (!res.ok) {
            setProcess(false)
            console.log(res);
            throw {
                message: res.error,
                statusText: res.statusText,
                status: res.status
            }
        }
        const data = await res.json()
        setProcess(false)
        setTimeout(() => {
            navigate(`/blog/me/@${name}`, {replace: true})
        }, 3000);
    }
    return (
        <div className="flex flex-col md:flex-row items-start w-full h-full mt-28">
            <div className='container-lg mx-auto h-full p-2 space-y-10'>
                {error && <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-amber-600 px-2">{error}</p>
                </div>}
                <div className='flex items-center'>
                    <Link to='..' className='text-sm text-gray-500'>Back to Story</Link>
                    <button onClick={() => update(post[0].id)} className="flex space-x-2 disabled:bg-green-400/70 bg-green-500 hover:bg-green-600 float-right text-gray-50 font-medium text-sm rounded-full px-4 py-2">
                        {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> }
                        Save and publish
                    </button>
                </div>
                <div className='flex flex-col w-full mt-20 rounded-md' id="banner">
                    <img src={`${import.meta.env.VITE_API_URL}/upload/images/${post.length > 0 && post[0].post_cover}`} alt="" className='w-full' />
                </div>
                <input
                    type="text"
                    placeholder='Title' name="title"
                    value={value.title}
                    onChange={handleChange}
                    className='text-4xl font-semibold text-gray-700 font-sans border-l py-2 focus:transition-all ease-in duration-250 border-l-gray-700 px-2 placeholder:text-gray-500 outline-none w-full block my-2' />
                <Editor
                    apiKey='syzwxvkjdbw2w2u2rl4fs99ynhcdsjyh0hzy88j3mtr96e7r'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={`<pre key=${post.length > 0 && post[0].id}>${post.length > 0 && post[0].content}</pre>`}
                    key={post.length > 0 && post[0].id}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </div>
    )
}