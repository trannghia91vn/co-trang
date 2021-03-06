import classes from "./MonthYearPick.module.css";
import { Fragment, useRef, useState } from "react";

const LocNamThang = (props) => {
  //Tọa biến năm nay để làm default value cho chọn năm
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  //Biến ref chứa input
  const monthRef = useRef();
  const yearRef = useRef();
  //Biến state quan sát render thông báo kết quả lọc
  const [showNoti, changeShowNoti] = useState(false);
  const [month, changeMonth] = useState("");
  const [year, changeYear] = useState("");

  //Callback clear input
  const clearInput = () => {
    monthRef.current.value = "";
    yearRef.current.value = "";
  };

  //Func chính lấy month year data
  const getMonthYearHandler = (event) => {
    event.preventDefault();
    const month = +monthRef.current.value;
    const year = +yearRef.current.value;
    //Thay đổi để render thông báo
    changeMonth(month);
    changeYear(year);
    //Kiểm tra có render thông báo khôngß
    if (month > 0 && year > 0) {
      changeShowNoti(true);
    } else {
      changeShowNoti(false);
    }
    //Truyền ngược lên comp chính cần dùng data
    props.getMonthYear({
      month: month,
      year: year,
    });
    clearInput();
    //Xử lý load lại comp thêm mới ngày điềm danh cá nhân để có giá trị ngày mặc định
    if (props.refreshAddForm) {
      props.refreshAddForm();
    }
  };
  //Biến render thông báo
  const renderNoti = (
    <p className={classes.noti}>{`Kết quả lọc : ${month} / ${year}`}</p>
  );

  return (
    <Fragment>
      <form onSubmit={getMonthYearHandler} className={classes.container}>
        <label>Tháng:</label>
        <input
          ref={monthRef}
          type="number"
          min="1"
          max="12"
          defaultValue={nowMonth + 1}
          required
        />
        <label>Năm:</label>
        <input
          ref={yearRef}
          type="number"
          minLength="4"
          maxLength="4"
          min="2021"
          defaultValue={nowYear}
          required
        />
        <button className="btn-sm btn-sm-sub">Lọc</button>
        {showNoti && renderNoti}
      </form>
    </Fragment>
  );
};

export default LocNamThang;
