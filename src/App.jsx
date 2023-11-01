import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListMaterial } from "./components/Movie/ListMaterial";
import { DetailMaterial } from "./components/Movie/DetailMaterial";
import { ListCC } from "./components/Movie/ListCC";
import UserHistory from "./components/Material/UserHistory";
import CollectionCenterHistory from "./components/Material/CollectionCenterHistory";
import { HistoryDetail } from "./components/Material/HistoryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/material",
    element: <ListMaterial />,
  },
  {
    path: "/user-history",
    element: <UserHistory />,
  },
  {
    path: "/cc-history",
    element: <CollectionCenterHistory />,
  },
  {
    path: "/material/:id",
    element: <DetailMaterial />,
  },
{
path: "/history-detail/:id",
element: <HistoryDetail />,
},
  {
   path: "/CC",
   element: <ListCC />
  },
]);

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  );
}
