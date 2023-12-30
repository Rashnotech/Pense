import  { Link, NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../../../store/user'

function Settings () {
    return (
        <section className="flex flex-col items-start p-3 justify-start w-full h-full">
            <article className="space-y-2 w-full">
                <h2 className="text-4xl md:text-6xl font-medium">Settings</h2>
                <div className='w-full border-b border-slate-300 mt-2'>
                    <ul className='flex items-center space-x-6 py-2 text-sm w-full'>
                        <li><NavLink to='.' end >Account</NavLink> </li>
                        <li><NavLink to='publishing'>Publishing</NavLink> </li>
                        <li><NavLink to='notifications'>Notification</NavLink> </li>
                    </ul>
                </div>
                <Outlet />
            </article>
        </section>
    )
}



export default function Accounts () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    const username = user.users[0] ? user.users[0].firstname : ''
    return (
        <>
                <div className="md:col-span-2 col-auto max-h-max">
                    <Settings />
                </div>
                <div className="hidden md:flex flex-col space-y-4 text-sm">
                    <h3>Suggested help articles</h3>
                    <Link>Sign in or sign up to pense</Link>
                    <Link>Your profile page</Link>
                    <Link>Writing and publishing your first sotry</Link>
                </div>
            </>
        )
}