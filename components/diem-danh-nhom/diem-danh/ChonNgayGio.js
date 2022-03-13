import classes from "./ChonNgayGio.module.css";
import { Fragment, useRef, useState } from "react";

const ChonNgayGio = (props) => {
  //Lấy về giá trị default
  let dateDefault = "";
  let timeDefault = "";
  if (props.defaultData) {
    dateDefault = props.defaultData.taughtDate;
    timeDefault = props.defaultData.taughtTime;
  }
  if (props.defaultAddDate) {
    dateDefault = props.defaultAddDate;
  }

  const teachedTimeRef = useRef();
  const teachedDateRef = useRef();

  //Biến state cho phép render thông báo két quả tạm thời
  const [showNoti, changeShowNoti] = useState(false);
  //Biến state lưu tạm thời kết quả đẻ render thông báo
  const [tempDate, changeTempDate] = useState("");
  const [tempTime, changeTempTime] = useState("");

  const clearInput = () => {
    teachedTimeRef.current.value = "";
    teachedDateRef.current.value = "";
  };

  //Callback điền nhanh giá trị số phút dạy
  const getQuickTeachedTime = (val) => {
    teachedTimeRef.current.value = val;
  };

  //Callback chính xử lý thêm thông tin ngày điểm danh
  const addDateDataHandler = (event) => {
    event.preventDefault();
    const date = teachedDateRef.current.value;
    const time = +teachedTimeRef.current.value;
    //Kiểm tra xem có cho phép render thông báo kq tạm ko
    if (date !== "" && time > 0) {
      changeShowNoti(true);
      changeTempDate(date);
      changeTempTime(time);
    } else {
      changeShowNoti(false);
      changeTempDate("");
      changeTempTime("");
    }
    //Tổng hợp data gởi lên comp chính diem-danh
    const dataSubmit = {
      date: date,
      time: time,
    };
    props.getDateTimeData(dataSubmit);
    clearInput();
  };

  return (
    <Fragment>
      <h3
        style={{
          margin: ".2rem 0",
          fontWeight: "bold",
          color: `var(--mauTieuDe--)`,
          fontSize: "1rem",
        }}
      >
        Chọn ngày, giờ dạy nhóm
      </h3>

      <form onSubmit={addDateDataHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="date-select">Ngày</label>
          <input
            ref={teachedDateRef}
            type="date"
            id="date-select"
            required
            defaultValue={dateDefault ? dateDefault : ""}
          />

          <label htmlFor="hour-teach">Giờ dạy (phút)</label>
          <input
            ref={teachedTimeRef}
            className={classes.smInput}
            id="hour-teach"
            type="number"
            required
            min="0"
            defaultValue={timeDefault ? timeDefault : ""}
          />

          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 30)}
          >
            30
          </div>
          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 45)}
          >
            45
          </div>
          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 60)}
          >
            60
          </div>
          <button
            style={{ marginLeft: "20px", fontSize: "1rem" }}
            type="submit"
            className="btn-sm btn-sm-detail"
          >
            Thêm
          </button>
        </div>
      </form>
      {showNoti && (
        <p style={{ color: "green", fontSize: ".8rem", margin: "5px auto" }}>
          Ngày:{" "}
          {new Date(tempDate).toLocaleString("en-UK", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}{" "}
          - số phút dạy : {tempTime} phút
        </p>
      )}
    </Fragment>
  );
};
export default ChonNgayGio;
