import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import Blog, {loader as blogLoader} from './pages/blogs/blog'
import Write from './pages/blogs/write'
import PostDetails from './pages/blogs/PostDetails'
import Accounts from './pages/blogs/profile/account'
import Settings from './pages/blogs/profile/settings'
import { AuthLoader } from './pages/blogs/AuthLoader'
import Login from './components/Login'
import Edit from './pages/blogs/Edits'
import Register from './components/Register'
import List from './pages/blogs/profile/List'
import About from './pages/blogs/profile/About'
import Information from './pages/blogs/profile/Information'
import NotFound from './components/Notfound'
import MyPost, {loader as MyPostLoader} from './pages/blogs/profile/Home'
import PageLayout from './pages/blogs/BlogLayout'
import Profiled, {loader as loadProfile} from './pages/blogs/profile/Profile'
import Aboutus from './pages/About'
import Error from './components/Error'
import Setprofile, {loader as SetprofileLoader } from './pages/blogs/profile/AccountInfo'
import Setpublication, {loader as Setpubloader} from './pages/blogs/profile/publishing'
import Setnotification, {loader as Setnoteloader} from './pages/blogs/profile/notifications'
import Forget from './pages/Forget'
import Reset from './components/Reset'

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} errorElement={<Error />}>
      <Route path='/' element={<Home />} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forget' element={<Forget />} />
        <Route path='resets' element={<Reset />} />
      </Route>
      <Route path=':name/:title' element={<PostDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='about' element={<Aboutus />} />
      <Route path='blog' loader={ async () => await AuthLoader() } element={<PageLayout />}>
        <Route index loader={blogLoader} element={<Blog />} />          
        <Route path='write' loader={ async () => await AuthLoader() } element={<Write />} />
        <Route path='edit/:name/:title' loader={ async () => await AuthLoader() } element={<Edit />} />
        <Route path=':name/:title' loader={ async() => await AuthLoader() } element={<PostDetails />} />
        <Route path='me' loader={loadProfile} element={<Profiled />}>
          <Route path=':name' element={<Accounts />} >
            <Route index loader={MyPostLoader} element={<MyPost />} />
            <Route path='list' element={<List />} />
            <Route path='about' element={<About />} />
          </Route>
          <Route path='settings' element={<Settings />}>
            <Route index loader={SetprofileLoader} element={<Setprofile />} />
            <Route path='account' element={<Information />} />
            <Route path='publishing' loader={Setpubloader} element={<Setpublication />} />
            <Route path='notifications' loader={Setnoteloader} element={<Setnotification />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Route>
))


function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
