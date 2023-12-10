import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListMaterial } from "./components/Material/ListMaterial";
import { DetailMaterial } from "./components/Material/DetailMaterial";
import { ListCollectionCenter } from "./components/Collection Center/ListCollectionCenter";
import { UserHistory } from "./components/User/UserHistory";
import { HistoryCollectionCenter } from "./components/Collection Center/HistoryCollectionCenter";
import { DetailMaterialExchange } from "./components/Material Exchange/DetailMaterialExchange";
import { DetailCollectionCenter } from "./components/Collection Center/DetailCollectionCenter";
import Dashboard from "./components/Dashboard/Dashboard";
import TableMaterial from "./components/Material/TableMaterial";
import { CreateMaterial } from "./components/Material/CreateMaterial";
import { UpdateMaterial } from "./components/Material/UpdateMaterial";
import TableCollectionCenter from "./components/Collection Center/TableCollectionCenter";
import { CreateCollectionCenter } from "./components/Collection Center/CreateCollectionCenter";
import { UpdateCollectionCenter } from "./components/Collection Center/UpdateCollectionCenter";
import { CreateMaterialExchange } from "./components/Material Exchange/CreateMaterialExchange";
import { TableMaterialExchange } from "./components/Material Exchange/TableMaterialExchange";
import TableCoupon from "./components/Coupon/TableCoupon";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import UserProvider from "./components/User/UserProvider";
import { Logout } from "./components/User/Logout";
import { Auth } from "./components/User/Auth";
import Unauthorized from "./components/User/Unauthorized";
import { CreateCoupon } from "./components/Coupon/CreateCoupon";
import { UpdateCoupon } from "./components/Coupon/UpdateCoupon";
import UserProfile from "./components/User/UserProfile";
import { UpdateUserProfile } from "./components/User/UpdateUserProfile";
import UserWallet from "./components/User/UserWallet";
import { UpdateUserPassword } from "./components/User/UpdateUserPassword";
import TableUser from "./components/User/TableUser";
import { UpdateUser } from "./components/User/UpdateUser";
import { CreateUser } from "./components/User/CreateUser";

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
    path: "/material/:id",
    element: <DetailMaterial />,
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Admin"]} />,
    children: [
      {
        path: "/table-material",
        element: <TableMaterial />,
      },
      {
        path: "/dashboard/table-material",
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
        path: "/table-coupon",
        element: <TableCoupon />,
      },
      {
        path: "/table-coupon/create",
        element: <CreateCoupon />,
      },
      {
        path: "/table-coupon/update/:id",
        element: <UpdateCoupon />,
      },
      {
        path: "/table-user",
        element: <TableUser />,
      },
      {
        path: "/table-user/create",
        element: <CreateUser />,
      },
      {
        path: "/table-user/update/:id",
        element: <UpdateUser />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["CC_Admin"]} />,
    children: [
      {
        path: "/collection-center/history",
        element: <HistoryCollectionCenter />,
      },
      {
        path: "/collection-center/history/details/:id",
        element: <DetailMaterialExchange />,
      },
      {
        path: "/table-material-exchange/:id",
        element: <TableMaterialExchange />,
      },
      {
        path: "/table-material-exchange/:id/create",
        element: <CreateMaterialExchange />,
      },
      {
        path: "/table-material-exchange/details/:id",
        element: <DetailMaterialExchange />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Admin", "CC_Admin"]} />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Admin", "CC_Admin", "User"]} />,
    children: [
      {
        path: "/user/profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/user/profile/edit/:id",
        element: <UpdateUserProfile />,
      },
      {
        path: "/user/password/:id",
        element: <UpdateUserPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["User"]} />,
    children: [
      {
        path: "/user/wallet/:id",
        element: <UserWallet />,
      },
      {
        path: "/user/history/:id",
        element: <UserHistory />,
      },
      {
        path: "/user/history/details/:id",
        element: <DetailMaterialExchange />,
      },
    ],
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
