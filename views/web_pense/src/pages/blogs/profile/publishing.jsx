import {useLoaderData } from "react-router-dom"
import { fetchRequest } from "../../api"
import { useNavigate, useOutletContext, Link } from "react-router-dom"


export async function loader () {
    const user = sessionStorage.getItem('Browser_session') || localStorage.getItem('Browser_session')
    const user_id = JSON.parse(user).userid
    const url = `https://pense.pythonanywhere.com/api/v1/posts/${user_id}`
    const data = await fetchRequest(url)
    return data

}

export default function Setpublication () {
    const data = useLoaderData()

    return (
        <main className="space-y-6">
            <div className="flex justify-between items-center w-full">
                <p className="text-sm">Manage publications</p>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm">Allow email replies</p>
                    <small>Let readers reply to your stories directly from their email.</small>
                </div>
                <Link className='text-sm text-gray-500'>xxx</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">‘Reply To’ email address</p>
                    <small>Shown to your subscribers when they reply.</small>
                </div>
                <Link className='text-sm text-gray-500'>xxx</Link>
            </div>
            <div>
                <p className="mb-0 text-sm">Import email subscribers</p>
                <small className="text-gray-600 font-medium">Upload a CSV or TXT file containing up to 5,000 email addresses.</small>
            </div>
        </main>
    )
}

