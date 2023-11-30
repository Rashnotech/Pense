import { Outlet } from "react-router-dom";
import { BlogHeader } from "../../components/Header";

export default function PageLayout () {
    return (
        <>
            <BlogHeader />
            <Outlet />
        </>
    )
}