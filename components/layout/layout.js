import { Fragment, useState, useEffect } from "react";
import classes from "./layout.module.css";
import Navigation from "./navigation";
import { useSelector } from "react-redux";
import Login from "../login/Login";

const Layout = (props) => {
  const { isLogin, token } = useSelector((state) => state.login);
  //Tạo một biến đk tổng thể để login dựa vào redux và localStorage
  const [isLoggedIn, changeIsLoggedIn] = useState(false);

  //Xử lý side effect cho phép login hay không
  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (isLogin && token !== "") {
      changeIsLoggedIn(true);
    } else if (tokenLocal && tokenLocal !== "") {
      changeIsLoggedIn(true);
    } else {
      changeIsLoggedIn(false);
    }
  }, [isLogin, token]);

  return (
    <Fragment>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Navigation />}
      {isLoggedIn && <main className={classes.main}>{props.children}</main>}
    </Fragment>
  );
};

export default Layout;
