import  { Link, NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../../../store/user'

function Account ({name}) {
    return (
        <section className="flex flex-col items-start p-3 justify-start w-full h-full">
            <article className="space-y-2 w-full">
                <h2 className="text-4xl md:text-6xl font-medium">{name}</h2>
                <div className='w-full border-b border-slate-300 mt-2'>
                    <ul className='flex items-center space-x-6 py-2 text-sm w-full'>
                        <li><NavLink to='.' end >Home</NavLink> </li>
                        <li><NavLink to='list'>List</NavLink> </li>
                        <li><NavLink to='about'>About</NavLink> </li>
                    </ul>
                </div>
                <Outlet context={name} />
            </article>
        </section>
    )
}

function Details ({name}) {
    return (
        <>
            <img src="" className='flex-none rounded-full w-20 h-20 border' alt="" />
            <div className='space-y-0'>
                <h1 className='font-medium text-lg'>{name}</h1>
                <p className="text-slate-500">0 Followers</p>
            </div>
            <Link to='/blog/me/settings/account' className='text-sm text-green-500 font-medium w-1/2'>Edit Profile</Link>

            <div className=''>
                <h2 className='text-base text-slate-500 font-medium'>Following</h2>
            </div>
            
        </>
    )
}


export default function Accounts () {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    const user = useSelector(state => state.users)
    const username = user.users[0] ? user.users[0].firstname : ''
    return (
        <>
                <div className="md:col-span-2 col-auto max-h-max">
                    <Account name={username} />
                </div>
                <div className="flex flex-col space-y-4 text-sm">
                    <Details name={username} />
                    <div className="border-t mx-auto w-full py-4">
                        <ul className="flex text-sm flex-wrap w-full items-center justify-between text-slate-500">
                            <li><Link to=''>Help</Link></li>
                            <li><Link to=''>About</Link></li>
                            <li><Link to='/'>Blog</Link></li>
                            <li><Link to=''>Privacy</Link></li>
                            <li><Link to=''>Terms</Link></li>
                            <li><Link to='/'>Text to speech</Link></li>
                            <li><Link to=''>Teams</Link></li>
                            <li><Link to=''>Career</Link></li>
                            <li><Link to=''>Status</Link></li>
                        </ul>
                    </div>
                </div>
            </>
            )
}
