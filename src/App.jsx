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
import { UpdateCollectionCenter } from "./components/Collection Center/UpdateCollectionCenter";
import { CreateMaterialExchange } from "./components/Material Exchange/CreateMaterialExchange";
import { UpdateMaterialExchange } from "./components/Material Exchange/UpdateMaterialExchange";
import { TableMaterialExchange } from "./components/Material Exchange/TableMaterialExchange";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import UserProvider from "./components/User/UserProvider";

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
    path: "/collection-center",
    element: <ListCollectionCenter />,
  },
  {
    path: "/collection-center/:id",
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
    path: "/table-material/create",
    element: <CreateMaterial />,
  },
  {
    path: "/table-material/update/:id",
    element: <UpdateMaterial />,
  },
  {
    path: "/table-collection-center",
    element: <TableCollectionCenter />,
  },
  {
    path: "/table-collection-center/create",
    element: <CreateCollectionCenter />,
  },
  {
    path: "/table-collection-center/update/:id",
    element: <UpdateCollectionCenter />,
  },
  {
    path: "/table-material-exchange",
    element: <TableMaterialExchange />,
  },
  {
    path: "/table-material-exchange/create",
    element: <CreateMaterialExchange />,
  },
  {
    path: "/table-material-exchange/update/:id",
    element: <UpdateMaterialExchange />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </UserProvider>
    </div>
  );
}
