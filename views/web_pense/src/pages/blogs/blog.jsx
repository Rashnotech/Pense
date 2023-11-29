import {useState, useEffect} from 'react'
import BlogPost from '../../components/Blogpost'
import SearchDesign from '../../components/Search'
import { fetchRequest } from '../api'
import { AuthLoader } from './AuthLoader'
import {useLoaderData} from 'react-router-dom'

export async function loader () {
    await AuthLoader();
    const url = 'http://127.0.0.1:5000/api/v1/category'
    const data = await fetchRequest(url)
    return data
}

export default function Blog () {
    const data = useLoaderData()
    const [post, setPost] = useState([])

    function handleFilter (filter) {
        const url = filter === 'all' ? `http://127.0.0.1:5000/api/v1/posts/search`
                                        : `http://127.0.0.1:5000/api/v1/posts/search/${filter}`
        const post = fetchRequest(url)
        setPost(post)
    }

    return (
        <>
            <SearchDesign tabs={data} func={handleFilter} />
            <BlogPost posts={post} />
        </>
    )
}