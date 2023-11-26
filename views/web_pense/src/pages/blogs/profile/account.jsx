import  { Link, NavLink, Outlet } from 'react-router-dom'

function Account () {
    return (
        <section className="flex flex-col items-start p-3 justify-start w-full h-full">
            <article className="space-y-2 w-full">
                <h2 className="text-6xl font-medium">John Doe</h2>
                <div className='w-5/6 border-b border-slate-300 mt-2'>
                    <ul className='flex items-center space-x-6 py-2 text-sm w-full'>
                        <li><NavLink to='.' >Home</NavLink> </li>
                        <li><NavLink to='list'>List</NavLink> </li>
                        <li><NavLink to='about'>About</NavLink> </li>
                    </ul>
                </div>
                <Outlet />
            </article>
        </section>
    )
}

function Details () {
    return (
        <>
            <img src="" className='rounded-full w-20 h-20 border' alt="" />
            <div className='space-y-0'>
                <h1 className='font-medium text-lg'>John Doe</h1>
                <p className="text-slate-500">4 Followers</p>
            </div>
            <p className='text-sm text-green-500 font-medium'>Edit Profile</p>

            <div className=''>
                <h2 className='text-base text-slate-500 font-medium'>Following</h2>

            </div>
            
        </>
    )
}


export default function Accounts () {
    return (
        <>
                <div className="md:col-span-2 col-auto h-full relative overflow-x-hidden overflow-y-auto">
                    <Account />
                </div>
                <div className="flex flex-col space-y-4 static text-sm">
                    <Details />
                    <div className="border-t mx-auto w-full py-4">
                        <ul className="flex text-sm flex-wrap w-3/4 items-end justify-between text-slate-500">
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
