import {useState, useEffect} from 'react'
import BlogPost from '../../components/Blogpost'
import SearchDesign from '../../components/Search'
import { fetchRequest } from '../api'
import { AuthLoader } from './AuthLoader'
import {useLoaderData} from 'react-router-dom'


export async function loader () {
    await AuthLoader();
    const url = 'https://pense.pythonanywhere.com/api/v1/category'
    const data = await fetchRequest(url)
    return data
}

export default function Blog () {
    const data = useLoaderData()
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pense.pythonanywhere.com/api/v1/posts/search/all');
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    async function handleSearch (value) {
        try {
            const url = `https://pense.pythonanywhere.com/api/v1/posts/keyword/${value}`
            const data = await fetchRequest(url);
            setPost(post)
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    async function handleFilter (filter) {
        const url = filter === 'all' ? `https://pense.pythonanywhere.com/api/v1/posts/search/all`
                                        : `https://pense.pythonanywhere.com/api/v1/posts/search/${filter}`
        const post = await fetchRequest(url)
        setPost(post)
    }
    return (
        <div className='w-full py-6 bg-gray-50'>
            <SearchDesign tabs={data} func={handleFilter} searchFunc={handleSearch}  />
            <BlogPost posts={post} />
        </div>
    )
}
