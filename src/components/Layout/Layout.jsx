// eslint-disable-next-line no-unused-vars
import { React } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex-1 mx-auto container">
        <Toaster position="top-center" />
        {children}
      </div>
      <Footer />
    </>
  );
}
