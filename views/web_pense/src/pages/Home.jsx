import Main from '../components/Main';
import { Link, Outlet } from 'react-router-dom';

export default function Home () {
    return (
        <>
          <Main />
          <Outlet />
          <div className="mx-auto py-4 font-manrope">
            <ul className="flex flex-wrap justify-center w-full space-x-2 text-sm items-center text-center text-slate-500">
              <li><Link to=''>Help</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/'>Blog</Link></li>
              <li><Link to=''>Privacy</Link></li>
              <li><Link to=''>Terms</Link></li>
              <li><Link to='/'>Text to speech</Link></li>
              <li><Link to=''>Teams</Link></li>
              <li><Link to=''>Career</Link></li>
              <li><Link to=''>Status</Link></li>
            </ul>
          </div>
        </>
    )
}