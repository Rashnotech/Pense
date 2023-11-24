import { Link, Outlet } from "react-router-dom"

const Profile = () => {
    return (
        <section className="font-sans h-[500px] mt-28 grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-7 md:px-14 py-8">
            <Outlet />            
        </section>
    )
}
export default  Profile