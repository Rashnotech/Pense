import MDEditor from '@uiw/react-md-editor'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Write () {
    const navigate = useNavigate();
    const user = useSelector(state => state.users)
    const [categoryList, setCategoryList] = useState([])
    const [value, setValue] = useState({'title': ''})
    const [content, setContent] = useState('')
    const [category, setCategory] = useState({name: ''})
    const [selected, setSelected] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
              const res = await fetch('https://pense-service.onrender.com/api/v1/category');
              if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
              }
              const data = await res.json();
              setCategoryList(data);
            } catch (error) {
              setError(error.message);
            }
          };
          fetchCategories();
    })

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
        const res = await fetch('https://pense-service.onrender.com/api/v1/category',
                            {headers: new Headers({'Content-Type': 'application/json'}),
                            method: "POST", body: JSON.stringify(category)})
        if (!res.ok) {
            const error = res.json()
            throw {
                message: error.message,
                statusText: error.statusText,
                status: error.status
            }
            setError(error.message)
        }
        const data = await res.json()
        setCategoryList(data)
        setCategory({name: ''});
        setMessage('Added successfully')
    }
    function uploadImage (event) {
        event.preventDefault();
        document.querySelector('#post_cover').click();
    }
    async function Publish () {
        const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_section')
        const userid = JSON.parse(user).userid
        const url = 'https://pense-service.onrender.com/api/v1/posts'
        const credentials = {title: value.title, content: content, category_id: selected, user_id: userid}
        const res = await fetch(url,
                        {headers: new Headers({'Content-Type': 'application/json'}),
                        method: "POST", body: JSON.stringify(credentials)})
        if (!res.ok) {
            const error = res.json()
            throw {
                message: error.message,
                statusText: error.statusText,
                status: error.status
            }
        }
        const data = await res.json()
        setTimeout(() => {
            navigate('/blog')
        }, 3000);
    }
    return (
        <div className="flex flex-col md:flex-row items-start w-full h-full mt-28">
            <div className='w-full h-full p-2 space-y-10'>
                <div>
                    <button onClick={Publish} className="bg-green-500 float-right text-slate-100 block font-medium text-sm rounded-full px-4 py-2">Publish</button>
                </div>
                <div className='bg-sky-200/60 flex items-center flex-col w-full p-8 rounded-md' id="banner">
                    <button className='text-slate-50 outline-none w-full flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                    </button>
                    <input type="file" accept="image/*" name="post_cover" className='hidden' id="post_cover" />
                </div>
                <input
                    type="text"
                    placeholder='Title' name="title"
                    value={value.title}
                    onChange={handleChange}
                    className='text-2xl font-sans border-l-2 focus-within:ease-in-out border-l-gray-700 px-2 placeholder:text-slate-500 outline-none block my-2' />
                <MDEditor name='content' value={content} onChange={setContent} />
            </div>


            <div className='w-full md:w-2/5 p-2'>
                <h1 className='text-slate-700 font-medium text-lg'>Categories</h1>
                <ul className='flex text-xs w-full flex-wrap justify-between items-center'>
                {categoryList.length > 0 ?
                    categoryList.map(item =>
                    <li key={item.id} onClick={() => handleSelect(item.id)} className={`px-4 my-1 py-2 cursor-pointer hover:bg-slate-200 rounded-full ${selected.includes(item.id) ? 'bg-slate-200': 'bg-slate-100'}`}>{item.name}</li>)
                : <li>No category</li>}
                </ul>
        
                <form onSubmit={handleSubmit}>
                    <input required
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
