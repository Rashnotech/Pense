import { Outlet } from "react-router-dom"
import { AuthLoader } from "../AuthLoader"
import { fetchRequest } from "../../api"

export async function loader () {
    AuthLoader()
    return fetchRequest
}

const Profile = () => {
    return (
        <section className="font-sans mt-28 overflow-y-hidden grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <Outlet />            
        </section>
    )
}
export default  Profile