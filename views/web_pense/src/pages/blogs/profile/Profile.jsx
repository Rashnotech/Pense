import { Outlet } from "react-router-dom"
import { AuthLoader } from "../AuthLoader"

export async function loader () {
    await AuthLoader()
    return null
}

export default function Profiled () {
    return (
        <section className="font-manrope mt-25 overflow-y-hidden grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <Outlet />            
        </section>
    )
}
