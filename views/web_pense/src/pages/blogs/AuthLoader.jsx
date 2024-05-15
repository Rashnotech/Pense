import { redirect } from "react-router-dom";

export async function AuthLoader () {
    const session = sessionStorage.getItem('Browser_session') ||
                    localStorage.getItem('Browser_session')
    const sess = JSON.parse(session);
    if (!sess) {
        throw redirect('/login')
    }
    return null
}
