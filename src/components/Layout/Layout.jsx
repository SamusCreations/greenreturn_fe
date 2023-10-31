// eslint-disable-next-line no-unused-vars
import { React } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex-1 container mx-auto">{children}</div>
      <Footer />
    </>
  );
}
