import Navbar from "./Nav"
import BlogNav from "./BlogNav"
import { useAtom } from "jotai"
import { authUser } from "../pages/store"


export default function Header() {
    return (
        <div className="container sticky top-0 z-[20]">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export function BlogHeader () {
    const [userData] = useAtom(authUser)
    const username = userData ? userData.username : ''
    const picture = userData && `${import.meta.env.VITE_API_URL}/upload/images/${userData.image[0].filename}`
    return (
            <div className="container sticky top-0 z-[20]">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 flex-0">
                        <BlogNav username={username} picture={picture} />
                    </div>
                </div>
            </div>
    )
}