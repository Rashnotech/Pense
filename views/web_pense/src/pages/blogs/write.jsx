import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
export default function Write () {
    const [value, setValue] = useState({title:'', content:'**Hello World!!**'})
    const handleChange = (event) => {
        const {name, value} = event.target
        setValue(prev => ({...prev, [name]: value}))
    }
    return (
        <div className="w-full h-full mt-28">
            <div className='container mx-auto h-full p-2 space-y-4'>
                <button className="bg-green-500 float-right text-slate-100 font-medium text-sm rounded-full px-4 py-2">Publish</button>
                <input
                    type="text"
                    placeholder='Title' name="title"
                    value={value.title}
                    onChange={handleChange}
                    className='text-2xl font-sans border-l-2 focus-within:ease-in-out border-l-gray-700 px-2 placeholder:text-slate-500 outline-none block my-2' />
                <MDEditor value={value.content} onChange={handleChange} />
            </div>
        </div>
    )
}