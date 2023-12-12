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
            const res = await fetch('https://pense.pythonanywhere.com/api/v1/category');
            const response = await fetch('https://pense.pythonanywhere.com/api/v1/posts/search/all');
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
  console.log(content);
    return (
        <>
          <Main />
          <Trends contents={content.length > 0 && content} />
          <Topics categoryList={categoryList.length > 0 && categoryList} contents={content.length > 0 && content} />
          <Outlet />
        </>
    )
}