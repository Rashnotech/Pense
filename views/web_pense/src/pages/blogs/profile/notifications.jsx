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

export default function Setnotification () {
    const data = useLoaderData()

    return (
        <main className="space-y-6">
            <h5 className="text-2xl">Email notifications</h5>
            <p className="font-semibold">Story recommendations</p>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">Pense Digest</p>
                    <small>The best stories on Medium personalized based on your interests,
                        as well as outstanding stories selected by our editors.</small>
                </div>
            </div>
            <div>
                <p className="mb-0 text-sm">Recommended reading</p>
                <small className="text-gray-600 font-medium">
                    Featured stories, columns, and collections that we think you’ll enjoy based on your reading history.
                </small>
            </div>
        </main>
    )
}

