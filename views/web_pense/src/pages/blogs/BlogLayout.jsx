import { Outlet } from "react-router-dom";
import { BlogHeader } from "../../components/Header";
import { Provider } from "react-redux";
import store from "../../store/store";

export default function PageLayout () {
    return (
        <Provider store={store}>
            <BlogHeader />
            <Outlet />
        </Provider>
    )
}
