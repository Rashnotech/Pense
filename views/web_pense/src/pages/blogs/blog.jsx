import BlogPost from '../../components/Blogpost'
import SearchDesign from '../../components/Search'
import { fetchRequest } from '../api'

export async function loader () {
    return fetchRequest
}

export default function Blog () {
    return (
        <>
            <SearchDesign />
            <BlogPost />
        </>
    )
}