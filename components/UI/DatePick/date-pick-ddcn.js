import classes from "./date-pick.module.css";
import { useState, useEffect, useRef } from "react";

const FormChonNgayDDCN = (props) => {
  //Biến state quản lý nút được click và giá trị loại của nó
  const [actionType, changeActionType] = useState("them");
  //Biến state kiểm tra input date thay đổi để làm submit
  const [isDateChange, changeDateChange] = useState(false);
  //Biến ref cho input ngày
  const dateRef = useRef();

  //Callback active nút tương ứng
  const activeActionType = (val) => {
    changeActionType(val);
  };
  //Callback kiểm tra khi input ngày thay đổi
  const checkDateChange = () => {
    changeDateChange(!isDateChange);
  };

  const makeInputDefault = (date, type) => {
    dateRef.current.value = date;
    changeActionType(type);
  };

  //Dùng side effect để truyền ngược data lên comp chính khi có thay đổi về chọn ngày và chọn lọại hoạt động
  useEffect(() => {
    if (dateRef.current.value !== "") {
      props.getDateType({
        date: dateRef.current.value,
        type: actionType,
      });
    }
  }, [isDateChange, actionType]);
  //Dùng side efect load lần đầu giá trị mặc định cho giao diện view
  useEffect(() => {
    if (
      props.dateTypeDefault && props.dateTypeDefault.date !== "" &&
      props.dateTypeDefault.type !== ""
    ) {
      makeInputDefault(props.dateTypeDefault.date, props.dateTypeDefault.type);
    }
  }, []);

  //Biến render css cho nút
  let btnCss = classes.btn;
  let btnActiveCss = `${classes.btn} ${classes["btn-active"]}`;

  return (
    <div className={classes.container}>
      <label htmlFor="datePick">Chọn ngày:</label>
      <input
        id="datePick"
        type="date"
        ref={dateRef}
        onChange={checkDateChange}
        required
      />
      <label>Chọn loại:</label>
      <button
        className={actionType === "them" ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "them")}
      >
        Thêm
      </button>
      <button
        className={actionType === "nghi" ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "nghi")}
      >
        Nghỉ
      </button>
      <button
        className={actionType === "bu" ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "bu")}
      >
        Bù
      </button>
      <button
        className={actionType === "tang" ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "tang")}
      >
        Tăng
      </button>
    </div>
  );
};

export default FormChonNgayDDCN;
