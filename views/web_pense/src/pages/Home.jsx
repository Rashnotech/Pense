import { Outlet } from 'react-router-dom';
import Main from '../components/Main';
import Topics from '../components/Topics'
import Trends from '../components/Trends'
import { fetchRequest } from "../pages/api"
import { useLoaderData } from 'react-router-dom';

export async function loader () {
  const url = 'https://pense-service.onrender.com/api/v1/category'
  const data = await fetchRequest(url)
  return data
}

export default function Home () {
  const categoryList = useLoaderData();
    return (
        <>
          <Main />
          <Trends />
          <Topics categoryList={!categoryList.message && categoryList} />
          <Outlet />
        </>
    )
}