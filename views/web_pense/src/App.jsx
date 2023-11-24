import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import BlogLayout from './pages/blogs/BlogLayout'
import Blog from './pages/blogs/blog'
import Write from './pages/blogs/write'
import PostDetails from './pages/blogs/PostDetails'
import Accounts from './pages/blogs/profile/account'
import Settings from './pages/blogs/profile/settings'
import Profile from './pages/blogs/profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:name/:title' element={<PostDetails />} />
          <Route path='*' element={<h2>404 Not found</h2>} />
          <Route path='/forget' element='' />
        </Route>

        <Route path='blog' element={<BlogLayout />}>
          <Route index element={<Blog />} />          
          <Route path='write' element={<Write />} />
          <Route path=':name/:title' element={<PostDetails />} />
          <Route path='me/:name' element={<Profile />}>
            <Route index element={<Accounts />} />
            <Route path='settings' element={<Settings />} />
          </Route>
          
          <Route path="*" element={<h2>404 Not found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
