import { Fragment } from "react";
import classes from "./layout.module.css";
import Navigation from "./navigation";
import Header from '../UI/Header';
const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main className={classes.main}>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
