import classes from "./date-pick.module.css";
import { useState, useEffect } from "react";

const FormChonNgayDDCN = (props) => {
  let dateDefault = "";
  let typeDefault = "";
  //Xử lý default Date khi thao tác lọc tháng năm truyền xuống
  if (props.objMonthYear) {
    let month = props.objMonthYear.month;
    if (month.toString().length === 1) {
      month = `0${month}`;
    }
    //Tạo định dạng ngày tháng chuẩn
    const defaultDateFormat = `${props.objMonthYear.year}-${month}-01`;
    dateDefault = defaultDateFormat;
  }
  //Xử lý default Date khi thao tác edit truyền xuống
  if (props.defaultValue) {
    dateDefault = props.defaultValue.dateSingleCheck;
    typeDefault = props.defaultValue.typeSingleCheck;
  }

  //Biến state kiểm soát loại hành động
  const [actionType, changeActionType] = useState({
    them: true,
    nghi: false,
    bu: false,
    tang: false,
  });
  //Chạy side effect lần đầu thiét lập các giá trị mặc định
  useEffect(() => {
    if (typeDefault === "them") {
      changeActionType({ them: true, nghi: false, bu: false, tang: false });
    }
    if (typeDefault === "bu") {
      changeActionType({ them: false, nghi: false, bu: true, tang: false });
    }
    if (typeDefault === "nghi") {
      changeActionType({ them: false, nghi: true, bu: false, tang: false });
    }
    if (typeDefault === "tang") {
      changeActionType({ them: false, nghi: false, bu: false, tang: true });
    }
  }, []);

  //Biến state quan sát ngày
  const [datePick, changeDatePick] = useState("");
  //Callback lấy giá trị ngày được chọn
  const getPickedDate = (event) => {
    changeDatePick(event.target.value);
  };
  //Tạo callback reset lại biến state
  const resetActionType = () => {
    changeActionType({ them: false, nghi: false, bu: false, tang: false });
  };
  //Tạo callback kích hoạt loại cụ thể
  const activeActionType = (val) => {
    resetActionType();
    changeActionType((preState) => {
      if (val === "them") {
        preState.them = true;
      }
      if (val === "nghi") {
        preState.nghi = true;
      }
      if (val === "bu") {
        preState.bu = true;
      }
      if (val === "tang") {
        preState.tang = true;
      }
      return preState;
    });
  };
  let actionTypeFinal = "";
  if (actionType.them) {
    actionTypeFinal = "them";
  }
  if (actionType.bu) {
    actionTypeFinal = "bu";
  }
  if (actionType.nghi) {
    actionTypeFinal = "nghi";
  }
  if (actionType.tang) {
    actionTypeFinal = "tang";
  }
  useEffect(() => {
    if (
      datePick.trim().length > 0 &&
      (actionType.them || actionType.nghi || actionType.bu || actionType.tang)
    ) {
      if (props.getDateData) {
        props.getDateData({
          date: datePick,
          actionType: actionTypeFinal,
        });
      }
    }
    if (props.editDateData) {
      props.editDateData({
        date: dateDefault,
        actionType: actionTypeFinal,
      });
    }
  }, [datePick, actionType]);
  //Trong lần load ban đầu nếu không có chỉnh sửa thì vần truyền ngược lên cho chế độ edti
  useEffect(() => {
    if (props.editDateData) {
      props.editDateData({
        date: dateDefault,
        actionType: actionTypeFinal,
      });
    }
  }, []);
  //Biến render css cho nút
  let btnCss = classes.btn;
  let btnActiveCss = `${classes.btn} ${classes["btn-active"]}`;

  return (
    <div className={classes.container}>
      <label htmlFor="datePick">Chọn ngày:</label>
      <input
        onChange={getPickedDate}
        id="datePick"
        type="date"
        defaultValue={dateDefault ? dateDefault : ""}
        // disabled={dateDefault ? "disabled" : ""}
        required
      />
      <label>Chọn loại:</label>
      <button
        className={actionType.them ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "them")}
      >
        Thêm
      </button>
      <button
        className={actionType.nghi ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "nghi")}
      >
        Nghỉ
      </button>
      <button
        className={actionType.bu ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "bu")}
      >
        Bù
      </button>
      <button
        className={actionType.tang ? btnActiveCss : btnCss}
        type="button"
        onClick={activeActionType.bind(0, "tang")}
      >
        Tăng
      </button>
    </div>
  );
};

export default FormChonNgayDDCN;
