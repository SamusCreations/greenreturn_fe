// eslint-disable-next-line no-unused-vars
import { React, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import HeaderDashboard from "../Dashboard/HeaderDashboard";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  const { user, decodeToken, authorize } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  return (
    <>
      {user && authorize({ allowedRoles: ["Admin", "CC_Admin"] }) && window.location.pathname.includes("/dashboard") ? (
        <HeaderDashboard />
      ) : (
        <Header />
      )}
      <div className="flex-1 mx-auto container">
        <Toaster position="top-center" />
        {children}
      </div>
      <Footer />
    </>
  );
}
