import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import BlogLayout from './pages/blogs/BlogLayout'
import Blog from './pages/blogs/blog'
import Write from './pages/blogs/write'
import PostDetails from './pages/blogs/PostDetails'
import Accounts from './pages/blogs/profile/account'
import Settings from './pages/blogs/profile/settings'
import { AuthLoader } from './pages/blogs/AuthLoader'
import Profile from './pages/blogs/profile/Profile'
import Login from './components/Login'
import Register from './components/Register'

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} >
        <Route
          path='login'
          element={<Login />}
          />
        <Route
          path='register'
          element={<Register />}
          />
      </Route>
      <Route path='/:name/:title' element={<PostDetails />} />
      
      <Route path='*' element={<h2>404 Not found</h2>} />
      <Route path='forget' element='' />

      <Route path='blog' loader={ async () => await AuthLoader() } element={<BlogLayout />}>
        <Route index element={<Blog />} />          
        <Route path='write' element={<Write />} />
        <Route path=':name/:title' element={<PostDetails />} />
        <Route path='me/:name' loader={ async () => await AuthLoader() } element={<Profile />}>
          <Route index element={<Accounts />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path="*" element={<h2>404 Not found</h2>} />
    </Route>
  </Route>
))


function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
