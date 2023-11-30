import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import Blog, {loader as blogLoader} from './pages/blogs/blog'
import Write, {loader as writeLoader} from './pages/blogs/write'
import PostDetails from './pages/blogs/PostDetails'
import Accounts from './pages/blogs/profile/account'
import Settings from './pages/blogs/profile/settings'
import { AuthLoader } from './pages/blogs/AuthLoader'
import Profiled, {loader as loadProfile} from './pages/blogs/profile/Profile'
import Login from './components/Login'
import Register from './components/Register'
import List from './pages/blogs/profile/List'
import About from './pages/blogs/profile/About'
import Information from './pages/blogs/profile/Information'
import NotFound from './components/Notfound'
import MyPost, {loader as MyPostLoader} from './pages/blogs/profile/Home'
import PageLayout from './pages/blogs/BlogLayout'

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path=':name/:title' element={<PostDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='forget' element='' />

      <Route path='blog' loader={ async () => await AuthLoader() } element={<PageLayout />}>
        <Route index loader={blogLoader} element={<Blog />} />          
        <Route path='write' loader={writeLoader} element={<Write />} />
        <Route path=':name/:title' loader={ async() => await AuthLoader() } element={<PostDetails />} />
        <Route path='me' loader={loadProfile} element={<Profiled />}>
          <Route path=':name' element={<Accounts />} >
            <Route index loader={MyPostLoader} element={<MyPost />} />
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
