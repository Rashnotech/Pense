import {useState, useEffect} from 'react'
import BlogPost from '../../components/Blogpost'
import SearchDesign from '../../components/Search'
import { GetRequest } from '../api'
import { AuthLoader } from './AuthLoader'
import {useLoaderData} from 'react-router-dom'


export async function loader () {
    await AuthLoader();
    const url = `${import.meta.env.VITE_API_URL}/category`
    const data = await GetRequest(url)
    return data
}

export default function Blog () {
    const data = useLoaderData()
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetRequest(`${import.meta.env.VITE_API_URL}/posts/search/all`);
            setPost(data);
        };
        fetchData();
    }, [])

    async function handleSearch (value) {
        const url = `${import.meta.env.VITE_API_URL}/posts/keyword/${value}`
        const data = await GetRequest(url);
        setPost(data)
    }

    async function handleFilter (filter) {
        const url = filter === 'all' ? `${import.meta.env.VITE_API_URL}/posts/search/all`
                                        : `${import.meta.env.VITE_API_URL}/posts/search/${filter}`
        const post = await GetRequest(url)
        setPost(post)
    }
    return (
        <div className='w-full py-6 bg-gray-50'>
            <SearchDesign tabs={data} func={handleFilter} searchFunc={handleSearch}  />
            <BlogPost posts={post} />
        </div>
    )
}
