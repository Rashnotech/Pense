import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetRequest, PostRequest } from '../api';
import { useAtom } from 'jotai';
import { authUser } from '../store';


export default function Write () {
    const navigate = useNavigate();
    const [userData] = useAtom(authUser)
    const [categoryList, setCategoryList] = useState([])
    const [process, setProcess] = useState(false)
    const [value, setValue] = useState({'title': ''})
    const editorRef = useRef(null);
    const [category, setCategory] = useState({name: ''})
    const [selected, setSelected] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await GetRequest(`${import.meta.env.VITE_API_URL}/category`);
            if (res.data) {
                setCategoryList(res.data);
            } else {
                setError(res.message)
            }
          };
          fetchCategories();
    }, [message])

    const handleChange = (event) => {
        const {name, value} = event.target
        setValue(prev => ({...prev, [name]: value}))
    }

    function handleSelect (id) {
        setSelected((prev) => {
            const data = [...prev];
            const index = data.indexOf(id);
            if (index !== -1) {
              data.pop(index, 1);
            } else {
              data.push(id);
            }
            return data;
          });
    }
    function handleSetCategory (event) {
        const {name, value} = event.target
        setCategory(prev => ({...prev, [name]: value }))
    }
    async function handleSubmit (event) {
        event.preventDefault();
        setMessage('');
        const url = `${import.meta.env.VITE_API_URL}/category`;
        const res = await PostRequest(url, category);
        if (!res.ok) setError(res.message)
        setCategoryList(res.data)
        setCategory({name: ''});
        setMessage('Added successfully')
    }
    async function Publish () {
        setProcess(true)
        const file = document.querySelector('#post_cover')
        if (!file.files.length) {
            throw new Error('Please select a file')
        }
        const url = `${import.meta.env.VITE_API_URL}/posts`
        const filename = file.files[0]
        const formData = new FormData()
        formData.append('post_cover', filename)
        const credentials = {
            title: value.title,
            content: editorRef.current.getContent(),
            category_id: selected,
            user_id: userData.id
        };
        Object.entries(credentials).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const res = await fetch(url, {
                        method: "POST",
                        body: formData
                    });
        if (!res.ok) {
            setProcess(false)
            throw {
                message: res.error,
                statusText: res.statusText,
                status: res.status
            }
        }
        const data = await res.json()
        setProcess(false)
        setTimeout(() => {
            navigate('/blog')
        }, 3000);
    }
    return (
        <div className="flex flex-col md:flex-row items-start w-full h-full mt-28">
            <div className='w-full h-full p-2 space-y-10'>
                {error && <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-amber-600 px-2">{error}</p>
                </div>}
                <div>
                    <button disabled={process} onClick={Publish} className="flex space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 float-right text-slate-100 font-medium text-sm rounded-full px-4 py-2">
                        {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> }
                        Publish
                    </button>
                </div>
                <div className='bg-sky-200/60 flex flex-col w-full p-8 rounded-md' id="banner">
                    <label htmlFor="post_cover">Post Cover</label>
                    <input type="file" accept="image/*" name="post_cover" id="post_cover" />
                </div>
                <input
                    type="text"
                    placeholder='Title' name="title"
                    value={value.title}
                    onChange={handleChange}
                    className='text-2xl font-sans border-l-2 focus-within:ease-in-out border-l-gray-700 px-2 placeholder:text-slate-500 outline-none w-full block my-2' />
                <Editor
                    apiKey='syzwxvkjdbw2w2u2rl4fs99ynhcdsjyh0hzy88j3mtr96e7r'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
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


            <div className='w-full md:w-2/5 p-2'>
                <h1 className='text-slate-700 font-medium text-lg'>Categories</h1>
                <ul className='flex text-xs w-full flex-wrap justify-between items-center'>
                {categoryList && categoryList.length > 0 ?
                    categoryList.map(item =>
                    <li key={item.id} onClick={() => handleSelect(item.id)} className={`px-4 my-1 py-2 cursor-pointer hover:bg-slate-200 rounded-full ${selected.includes(item.id) ? 'bg-slate-200': 'bg-slate-100'}`}>{item.name}</li>)
                : <li>No category</li>}
                </ul>
        
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        name="name"
                        onChange={handleSetCategory}
                        value={category.name}
                        className='border text-sm rounded-md block my-2 outline-none px-4 py-2 w-full'
                        placeholder='Enter category' />
                    <p className='text-xs text-gray-700'>{message}</p>
                    <button className='rounded-full border border-green-600 px-6 py-2 block text-slate-500 hover:bg-green-200'>Add</button>
                </form>
            </div>
        </div>
    )
}
