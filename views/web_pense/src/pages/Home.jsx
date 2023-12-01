import { Outlet } from 'react-router-dom';
import Main from '../components/Main';
import Topics from '../components/Topics'
import Trends from '../components/Trends'
import { useEffect, useState } from 'react';


export default function Home () {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
      const fetchCategories = async () => {
          try {
            const res = await fetch('https://pense-service.onrender.com/api/v1/category');
            if (!res.ok) {
              const error = await res.json();
              throw new Error(error.message);
            }
            const data = await res.json();
            setCategoryList(data);
          } catch (error) {
            setError(error.message);
          }
        };
        fetchCategories();
  }, [])

    return (
        <>
          <Main />
          <Trends />
          <Topics categoryList={categoryList.length > 0 && categoryList} />
          <Outlet />
        </>
    )
}