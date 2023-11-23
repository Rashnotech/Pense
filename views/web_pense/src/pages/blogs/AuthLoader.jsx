import { redirect } from "react-router-dom";

export async function AuthLoader () {
    const session = localStorage.getItem('Browser_session')

    if (!(session && session.status)) throw redirect('/')
}