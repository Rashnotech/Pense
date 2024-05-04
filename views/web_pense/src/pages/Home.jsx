 import { Outlet } from 'react-router-dom';
import Main from '../components/Main';
import Topics from '../components/Topics'
import Trends from '../components/Trends'
import { useEffect, useState } from 'react';


export default function Home () {
  const [categoryList, setCategoryList] = useState([])
  const [content, setContent] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
      const fetchData = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/category`);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/search/all`);
            if (!res.ok) {
              const error = await res.json();
              throw new Error(error.message);
            }
            if (!response.ok) {
              const err = await response.json()
              throw new Error(err.message)
            }
            const data = await res.json();
            const post = await response.json()
            setCategoryList(data);
            setContent(post);
          } catch (error) {
            setError(error.message);
          }
        };
      fetchData();
  }, []);
    return (
        <>
          <Main />
          <Trends contents={content.length > 0 && content} />
          <Topics categoryList={categoryList.length > 0 && categoryList} contents={content.length > 0 && content} />
          <Outlet />
        </>
    )
}