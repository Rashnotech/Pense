import Navbar from "./Nav"
import avatar from "../assets/avatar.png"
import BlogNav from "./BlogNav"
import { useAtom, atom } from "jotai"

const session = localStorage.getItem('Browser_session')
export const authUser = atom(session && JSON.parse(session).user)

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
    const picture = userData && userData.image.length === 0 ? avatar : userData.image[0].filename 
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