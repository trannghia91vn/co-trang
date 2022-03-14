import classes from "./CNNN.module.css";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { LichActions } from "../../store/redux/lich/lich-slice";

//Xử lý reducer
const reducerFn = (preState, action) => {
  if (action.type === "active") {
    const arrTags = [...preState];
    const objMatch = arrTags.find((cv) => cv.label === action.data);
    objMatch.isSelected = true;
    return arrTags;
  }
  if (action.type === "deactive") {
    const arrTags = [...preState];
    const objMatch = arrTags.find((cv) => cv.label === action.data);
    objMatch.isSelected = false;
    return arrTags;
  }
  if (action.type === "clear") {
    const arrTags = [...preState];
    arrTags.forEach((cv) => (cv.isSelected = false));
    return arrTags;
  }
  return preState;
};

//Func chính
const ChonNhanhNhieuNgay = (props) => {
  const dispatchFn = useDispatch();
  //Tạo mảng tags chọn nhanh ngày
  const arrTags = [
    { val: "Mon", label: "hai", isSelected: false },
    { val: "Tue", label: "ba", isSelected: false },
    { val: "Wed", label: "tư", isSelected: false },
    { val: "Thu", label: "năm", isSelected: false },
    { val: "Fri", label: "sáu", isSelected: false },
    { val: "Sat", label: "bảy", isSelected: false },
    { val: "Sun", label: "cn", isSelected: false },
  ];
  //Thiết lập biến reducer để kích hoạt tag được click
  const [initArrTags, dispatchReducer] = useReducer(reducerFn, arrTags);
  //Thiết lập biến lầy giá trị laoij lớp
  const [typeClass, changeTypeClass] = useState("");
  //Callback active tag được click, và deactive
  const activeDateHandler = (label) => {
    dispatchReducer({ type: "active", data: label });
  };
  const deActiveDateHandler = (label) => {
    dispatchReducer({ type: "deactive", data: label });
  };
  const clearActiveAllDates = () => {
    dispatchReducer({ type: "clear" });
  };
  const clearDataAllDates = () => {
    //Phải xử lý trên redux để xóa toàn bộ
    dispatchFn(LichActions.clearAllDatesDate());
    clearActiveAllDates();
  };

  //Lọc lại mảng tags được chọn để submit lên redux xử lý
  const arrTagsSelected = initArrTags.filter((tag) => tag.isSelected);

  //Callback lấy giá trị type class
  const getTypeClassHandler = (event) => {
    if (event.target.value !== "none") {
      changeTypeClass(event.target.value);
    }
  };

  //2 Callback chính xử lý thêm / xóa ngày
  const addDatesHandler = () => {
    //Tổng hợp data submit lên redux
    const dataSubmit = {
      arrSelectedDates: arrTagsSelected,
      typeClass: typeClass,
    };
    //Dispatch lên redux thêm data cho nhiều ngayuf
    dispatchFn(LichActions.addDataToMultiDates(dataSubmit));
    clearActiveAllDates();
  };
  const delDatesHandler = () => {
    //Chỉ cần submit lên mảng thứ đế tiến hành xóa thôi
    dispatchFn(LichActions.delDataMultiDates(arrTagsSelected));
    clearActiveAllDates();
  };

  //Tạo biến render mảng tags
  const renderTags = initArrTags.map((date) => {
    let finalCss = classes.date;
    if (date.isSelected) {
      finalCss = `${classes.date} ${classes["date-active"]}`;
    }
    return (
      <div
        key={date.label}
        className={finalCss}
        onClick={activeDateHandler.bind(0, date.label)}
        onDoubleClick={deActiveDateHandler.bind(0, date.label)}
      >
        {date.label}
      </div>
    );
  });
  return (
    <section className={classes.overall}>
      <h3>Thêm nhanh nhiều ngày:</h3>
      <div className={classes.container}>
        <div className={classes.dateTags}>{renderTags}</div>
        <div className={classes.selection}>
          <label htmlFor="chon-lop-nhanh">Lớp:</label>
          <select
            required
            id="chon-lop-nhanh"
            defaultValue="none"
            onChange={getTypeClassHandler}
          >
            <option value="none">None</option>
            <option value="single">Cá nhân</option>
            <option value="group">Nhóm</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-detail"
            onClick={addDatesHandler}
          >
            Thêm
          </button>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-delete"
            onClick={delDatesHandler}
          >
            Xóa
          </button>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-delete"
            onClick={clearDataAllDates}
          >
            Clear
          </button>
        </div>{" "}
      </div>
    </section>
  );
};

export default ChonNhanhNhieuNgay;
