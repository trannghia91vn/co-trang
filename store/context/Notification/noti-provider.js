import NotisContext from "./noti-context";
import { useState } from "react";

const NotisProvider = (props) => {
  //Đối tượng chứa context
  const [notiData, changeNotiData] = useState({
    status: "",
    title: "",
    message: "",
  });
  const clearNotiData = () => {
    changeNotiData({
      status: "",
      title: "",
      message: "",
    });
  };
  //Tạo các function callback cho context
  const pushNotiHandler = (data) => {
    changeNotiData(data);
    setTimeout(() => {
      clearNotiData();
    }, 3000);
  };

  //Tổng hợp đối tượng context
  const valueObj = {
    objNoti: notiData,
    pushNoti: pushNotiHandler,
    clearNoti: clearNotiData,
  };

  return (
    <NotisContext.Provider value={valueObj}>
      {props.children}
    </NotisContext.Provider>
  );
};

export default NotisProvider;
