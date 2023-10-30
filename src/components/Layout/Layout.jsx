// eslint-disable-next-line no-unused-vars
import { React } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Container, CssBaseline} from "@mui/material";
import PropTypes from "prop-types";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth="xl"
        style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
}
