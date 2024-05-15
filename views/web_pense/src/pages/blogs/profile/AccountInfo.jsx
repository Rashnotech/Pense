import { Link } from "react-router-dom"
import { useAtom } from "jotai"
import { authUser } from "../../../components/Header"


export default function Setprofile () {
    const [userData] = useAtom(authUser);
    return (
        <main className="space-y-6">
            <div className="flex justify-between w-full">
                <p className="text-sm">Email address</p>
                <Link className='text-sm text-gray-500'>{userData.email}</Link>
            </div>
            <div className="flex justify-between w-full">
                <p className="text-sm">Username and subdomain</p>
                <Link className='text-sm text-gray-500'>{userData.username}</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">Profile information</p>
                    <small>Edit your photo, name, bio, etc.</small>
                </div>
                <Link className='text-sm text-gray-500'>{userData.firstname}</Link>
            </div>
            <div>
                <p className="text-red-700 text-sm mb-0">Delete account</p>
                <small className="text-gray-600 font-medium">Permanently delete your account and all of your content.</small>
            </div>
        </main>
    )
}

