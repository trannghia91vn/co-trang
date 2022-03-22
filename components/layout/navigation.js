import classes from "./navigation.module.css";
import Link from "next/link";
import { useContext } from "react";
import LabelsContext from "../../store/context/NavbarLabels/labels-context";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/redux/login/login-slice";
import { useRouter } from "next/router";

const Navigation = (props) => {
  const dispatchFn = useDispatch();
  const router = useRouter();
  //Lấy về mảng labels từ context
  const navLabelsCtx = useContext(LabelsContext);
  const arrLabels = navLabelsCtx.arrNavbarLabels;

  //Callback active labels trên context
  const activeLabelHandler = (id) => {
    navLabelsCtx.activeLabel(id);
  };

  //Callback logout
  const logoutHandler = () => {
    dispatchFn(loginActions.logout());
    router.reload()
  };

  //Tạo biến render labelss
  const renderLabels = arrLabels.map((name) => {
    let labelClass = `${classes.item}`;
    if (name.isActive === true) {
      labelClass = `${classes.item} ${classes.active}`;
    }
    return (
      <Link key={name.id} href={`/${name.slug}`}>
        <div
          className={labelClass}
          onClick={activeLabelHandler.bind(0, name.id)}
        >
          {name.label}
        </div>
      </Link>
    );
  });
  return (
    <header>
      <nav className={classes.navbar}>
        <div className={classes.list}>{renderLabels}</div>
        {/* <Link href="/#"> */}
        <button
          type="button"
          onClick={logoutHandler}
          className={classes.logout}
        >
          Logout
        </button>
        {/* </Link> */}
      </nav>
    </header>
  );
};

export default Navigation;
