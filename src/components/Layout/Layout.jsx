// eslint-disable-next-line no-unused-vars
import { React } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import { UserSettings } from "../User/UserSettings";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  const currentPath = window.location.pathname;
  const isDashboard = currentPath.includes("/dashboard");

  console.log(currentPath);
  console.log(isDashboard);
  return (
    <>
      {!isDashboard && <Header />}
      {isDashboard && (
        <div>
          <Toaster position="top-center" />
          <UserSettings />
          {children}
        </div>
      )}
      {!isDashboard && (
        <div className="flex-1 mx-auto container">
          <Toaster position="top-center" />
          {children}
        </div>
      )}
      {!isDashboard && <Footer />}
    </>
  );
}
