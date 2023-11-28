import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { fetchRequest } from '../api'

export default function Write () {
    const category_list = useLoaderData()
    const [value, setValue] = useState({title:'', content:'**Hello World!!**'})
    const [category, setCategory] = useState({name: ''})
    const [selected, setSelected] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        const url = 'http://127.0.0.1:5000/api/v1/category'
        const data = fetchRequest(url)
        setCategoryList(data)
    }, [])
    
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
        const res = await fetch('http://127.0.0.1:5000/api/v1/category',
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
        setMessage('Added successfully')
        return data
    }
    return (
        <div className="flex flex-col md:flex-row items-center w-full h-full mt-28">
            <div className='w-full h-full p-2 space-y-4'>
                <button className="bg-green-500 float-right text-slate-100 font-medium text-sm rounded-full px-4 py-2">Publish</button>
                <input
                    type="text"
                    placeholder='Title' name="title"
                    value={value.title}
                    onChange={handleChange}
                    className='text-2xl font-sans border-l-2 focus-within:ease-in-out border-l-gray-700 px-2 placeholder:text-slate-500 outline-none block my-2' />
                <MDEditor value={value.content} onChange={handleChange} />
            </div>
            <div className='w-full md:w-1/3 p-2'>
                <h1 className='text-slate-700 font-medium text-lg'>Categories</h1>
                {category_list && !category_list.message ? 
                    category_list.map(item => <ul className='flex flex-wrap flex-row items-center'>
                    <li key={item.id} onClick={() => handleSelect(item.id)} className={`px-4 py-2 cursor-pointer hover:bg-slate-200 rounded-full ${selected.includes(item.id) ? 'bg-slate-200': 'bg-slate-100'}`}>{item.name}</li>
                </ul>)
                : <p>No category</p>}
                <form onSubmit={handleSubmit}>
                    <input required type="text" name="name" onChange={handleSetCategory} value={category.name} id="" className='border rounded-md block my-2 outline-none px-4 py-2 w-full' placeholder='Enter category' />
                    <p className='text-xs text-gray-700'>{message}</p>
                    <button className='rounded-full border border-green-600 px-6 py-2 block text-slate-500 hover:bg-green-200'>Add</button>
                </form>
            </div>
        </div>
    )
}