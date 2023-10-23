import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import { ListMaterial } from './components/Movie/ListMaterial'
import TableMovies from './components/Movie/TableMovies'
import { DetailMaterial } from './components/Movie/DetailMaterial'

const router= createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/material',
    element: <ListMaterial />
  },
  {
    path: '/movie-table',
    element: <TableMovies />
  },
  {
    path: '/material/:id',
    element: <DetailMaterial />
  }
])

export default function App(){
  return (
    <Layout>
        <RouterProvider router={router} />
    </Layout>
  )
}
