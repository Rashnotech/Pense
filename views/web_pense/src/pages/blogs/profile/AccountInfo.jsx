import {useLoaderData } from "react-router-dom"
import { fetchRequest } from "../../api"
import { Link } from "react-router-dom"


export async function loader () {
    const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
    const user_id = JSON.parse(user).userid
    const url = `${import.meta.env.VITE_API_URL}/posts/${user_id}`
    const data = await fetchRequest(url)
    return data

}

export default function Setprofile () {
    const data = useLoaderData()

    return (
        <main className="space-y-6">
            <div className="flex justify-between items-center w-full">
                <p className="text-sm">Email address</p>
                <Link className='text-sm text-gray-500'>xxx@gmail.com</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <p className="text-sm">Username and subdomain</p>
                <Link className='text-sm text-gray-500'>xxx</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">Profile information</p>
                    <small>Edit your photo, name, bio, etc.</small>
                </div>
                <Link className='text-sm text-gray-500'>xxx</Link>
            </div>
            <div>
                <p className="text-red-700 mb-0 text-sm">Deactivate account</p>
                <small className="text-gray-600 font-medium">Deactivating will suspend your account until you sign back in.</small>
            </div>
            <div>
                <p className="text-red-700 text-sm mb-0">Delete account</p>
                <small className="text-gray-600 font-medium">Permanently delete your account and all of your content.</small>
            </div>
        </main>
    )
}

