import classes from "./Notification.module.css";
import ReactDOM from "react-dom";

const Notification = (props) => {
  //Des ra các biến cần thiết
  const { status, title, message } = props.notiData;
  // const status = 'error';
  // const title = "Error";
  // const message = 'SOmthing wrong'
  //Tạo điêu kiện để style tương ứng
  let notiClass = `${classes.noti} ${classes["noti-sending"]}`;
  if (status === "error") {
    notiClass = `${classes.noti} ${classes["noti-error"]}`;
  }
  if (status === "success") {
    notiClass = `${classes.noti} ${classes["noti-success"]}`;
  }
  return ReactDOM.createPortal(
    status !== "" && (
      <div className={notiClass}>
        <div className={classes.item}>{title}</div>
        <div className={classes.item}>{message}</div>
      </div>
    ),
    document.getElementById("push-noti")
  );
};

export default Notification;
