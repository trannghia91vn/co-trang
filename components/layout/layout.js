import { Fragment } from "react";
import classes from "./layout.module.css";
import Navigation from "./navigation";
// import { useContext } from "react";
// import NotisContext from "../../store/context/Notification/noti-context";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <div style={{marginBottom:'10px'}} id="push-noti"></div>
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
