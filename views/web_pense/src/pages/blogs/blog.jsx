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
                // Handle errors as needed
            }
        };
        fetchData();
    }, [])

    async function handleSearch (value) {
        //const url = `https://pense.pythonanywhere.com/api/v1/posts/find/`
        //const post = await searchPost(url, value)
        //setPost(post)
        console.log(value)
    }

    async function handleFilter (filter) {
        const url = filter === 'all' ? `https://pense.pythonanywhere.com/api/v1/posts/search/all`
                                        : `https://pense.pythonanywhere.com/api/v1/posts/search/${filter}`
        const post = await fetchRequest(url)
        setPost(post)
    }
    return (
        <>
            <SearchDesign tabs={data} func={handleFilter} searchFunc={handleSearch}  />
            <BlogPost posts={post} />
        </>
    )
}
