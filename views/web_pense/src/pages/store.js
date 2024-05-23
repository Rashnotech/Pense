import { atom } from "jotai";

const session = localStorage.getItem('Browser_session');
export const authUser = atom( session && JSON.parse(session).user)
