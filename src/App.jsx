import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListMaterial } from "./components/Material/ListMaterial";
import { DetailMaterial } from "./components/Material/DetailMaterial";
import { ListCollectionCenter } from "./components/Collection Center/ListCollectionCenter";
import HistoryUser from "./components/History/HistoryUser";
import HistoryCollectionCenter from "./components/History/HistoryCollectionCenter";
import { DetailHistory } from "./components/History/DetailHistory";
import { DetailCollectionCenter } from "./components/Collection Center/DetailCollectionCenter";
import Dashboard from "./components/Dashboard/Dashboard";
import TableMaterial from "./components/Material/TableMaterial";
import { CreateMaterial } from "./components/Material/CreateMaterial";
import { UpdateMaterial } from "./components/Material/UpdateMaterial";
import TableCollectionCenter from "./components/Collection Center/TableCollectionCenter";
import { CreateCollectionCenter } from "./components/Collection Center/CreateCollectionCenter";

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
    element: <HistoryUser />,
  },
  {
    path: "/cc-history",
    element: <HistoryCollectionCenter />,
  },
  {
    path: "/material/:id",
    element: <DetailMaterial />,
  },
  {
    path: "/history-detail/:id",
    element: <DetailHistory />,
  },
  {
    path: "/CC",
    element: <ListCollectionCenter />,
  },
  {
    path: "/CC/:id",
    element: <DetailCollectionCenter />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/table-material",
    element: <TableMaterial />,
  },
  {
    path: "/create-material",
    element: <CreateMaterial />,
  },
  {
    path: "/update-material",
    element: <UpdateMaterial />,
  },
  {
    path: "/table-collection-center",
    element: <TableCollectionCenter />,
  },
  {
    path: "/create-collection-center",
    element: <CreateCollectionCenter />,
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
