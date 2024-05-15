import { useAtom } from "jotai"
import { authUser } from "../../../components/Header"

export default function About () {
    const [userData] = useAtom(authUser)
    return (
        <>
            <p className="text-gray-700 font-manrope bg-slate-50 p-4 rounded-md text-sm font-medium">{userData.bio ? `${userData.bio}` :'You have not written your bio'}</p>
        </>
    )
}