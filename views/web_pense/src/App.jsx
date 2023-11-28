import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import BlogLayout from './pages/blogs/BlogLayout'
import Blog, {loader as blogLoader} from './pages/blogs/blog'
import Write from './pages/blogs/write'
import PostDetails, {loader as loadRead} from './pages/blogs/PostDetails'
import Accounts from './pages/blogs/profile/account'
import Settings from './pages/blogs/profile/settings'
import { AuthLoader } from './pages/blogs/AuthLoader'
import Profile, {loader as loadProfile} from './pages/blogs/profile/Profile'
import Login from './components/Login'
import Register from './components/Register'
import List from './pages/blogs/profile/List'
import About from './pages/blogs/profile/About'
import Information from './pages/blogs/profile/Information'
import NotFound from './components/Notfound'
import MyPost, {loader as MyPostLoader} from './pages/blogs/profile/Home'

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path=':name/:title' loader={loadRead} element={<PostDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='forget' element='' />

      <Route path='blog' loader={ async () => await AuthLoader() } element={<BlogLayout />}>
        <Route index loader={blogLoader} element={<Blog />} />          
        <Route path='write' loader={async () => await AuthLoader() } element={<Write />} />
        <Route path=':name/:title' loader={loadRead} element={<PostDetails />} />
        <Route path='me' loader={loadProfile} element={<Profile />}>
          <Route path=':name' element={<Accounts />} >
            <Route index  loader={MyPostLoader} element={<MyPost />} />
            <Route path='list' element={<List />} />
            <Route path='about' element={<About />} />
            <Route path='profile' element={<Information />} />
          </Route>
          <Route path='settings' element={<Settings />} />
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
