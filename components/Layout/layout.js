import { Fragment } from "react";
import Navigation from "../Layout/mainNavigation";
import Footer from "./Footer/Footer";

function Layout(props) {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}

export default Layout;
