import { useAtom } from "jotai"
import { Link } from "react-router-dom"
import { authUser } from "../../../components/Header"


export default function Setpublication () {
    const [userData] = useAtom(authUser)
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
                <Link className='text-sm text-gray-500'>{userData.email}</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">‘Reply To’ email address</p>
                    <small>Shown to your subscribers when they reply.</small>
                </div>
                <Link className='text-sm text-gray-500'>{userData.email}</Link>
            </div>
            <div>
                <p className="mb-0 text-sm">Import email subscribers</p>
                <small className="text-gray-600 font-medium">Upload a CSV or TXT file containing up to 5,000 email addresses.</small>
            </div>
        </main>
    )
}

