import { Outlet } from "react-router-dom";
import { BlogHeader } from "../../components/Header";

export default function BlogLayout () {
    return (
        <>
            <BlogHeader />
            <Outlet />
        </>
    )
}
