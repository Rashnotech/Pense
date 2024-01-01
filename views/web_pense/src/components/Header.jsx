import Navbar from "./Nav"
import BlogNav from "./BlogNav"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUsers } from "../store/user"

export default function Header() {
    return (
        <div className="container sticky top-0 z-sticky">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export function BlogHeader () {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    
    const user = useSelector(state => state.users)
    const username = user.users[0] ? user.users[0].firstname : ''
    return (
            <div className="container sticky top-0 z-sticky">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 flex-0">
                        <BlogNav username={username} />
                    </div>
                </div>
            </div>
    )
}