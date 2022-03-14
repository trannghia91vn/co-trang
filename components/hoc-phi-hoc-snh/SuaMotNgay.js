import classes from "./CNNN.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LichActions } from "../../store/redux/lich/lich-slice";

const SuaMotNgay = (props) => {
  const dispatchFn = useDispatch();
  //Lấy về giá trị idDate được click từ lịch
  const { idDateSelected, monthYear } = props;
  //Thiết lập biến lầy giá trị laoij lớp
  const [typeClass, changeTypeClass] = useState("");

  //Lấy về mảng arrLich từ redux, ròi dựa vào id cell được click đẻ lấy về data cho ngày được chọn
  const arrLich = useSelector((state) => state.lich.arrLich);
  const dataDateSelected = arrLich.find(
    (date) => date.idCell === idDateSelected
  );
  //Lọc ra mảng arrValue của ngày được chọn -> dùng render info số lớp của ngày được chọn
  let arrValueDateSelected = [];
  let numSingleClass = 0;
  let numGroupClass = 0;
  if (dataDateSelected) {
    arrValueDateSelected = dataDateSelected.arrValue;
    const arrSingleValue = arrValueDateSelected.filter((cv) => cv === "single");
    const arrGroupValue = arrValueDateSelected.filter((cv) => cv === "group");
    numSingleClass = arrSingleValue.length;
    numGroupClass = arrGroupValue.length;
  }

  //Format lại ngày hiển thị
  let dayFormat = "01";
  if (dataDateSelected) {
    dayFormat = dataDateSelected.date;
  }
  const dateResult = `${dayFormat}/${monthYear.month}/${monthYear.year}`;

//   //Biến tạo mặc định cho lớp
//   let defaultClass = "none";
//   if (dataDateSelected && dataDateSelected.singleClass) {
//     defaultClass = "single";
//   }
//   if (dataDateSelected && dataDateSelected.groupClass) {
//     defaultClass = "group";
//   }

  //Callback lấy giá trị type class
  const getTypeClassHandler = (event) => {
    if (event.target.value !== "none") {
      changeTypeClass(event.target.value);
    }
  };

  //Callback submit edit lên redux
  const addDateHandler = () => {
    //Tổng hợp lại thông tin data ngày cần sửa
    const dataSubmit = {
      idCell: idDateSelected,
      typeClass: typeClass,
    };
    dispatchFn(LichActions.addSingleDate(dataSubmit));
  };
  const minusDateHandler = () => {
    //Tổng hợp lại thông tin data ngày cần sửa
    const dataSubmit = {
      idCell: idDateSelected,
      typeClass: typeClass,
    };
    dispatchFn(LichActions.minusSingleDate(dataSubmit));
  };
  //Callback xóa ngày lên redux
  const delDateHandler = () => {
    dispatchFn(LichActions.clearSingleDate(idDateSelected));
  };
  //Callback trở lại giao diện thêm
  const cancelEditHandler = () => {props.doHideEdit()};

  return (
    <section className={classes.overall}>
      <h3>Sửa ngày được chọn:</h3>
      <div className={classes.container}>
        <div style={{ margin: "0 .5rem" }}>
          Ngày <span style={{ color: "coral" }}>{dateResult}</span>
        </div>
        {numSingleClass > 0 && (
          <div style={{ margin: "0 .5rem" }}>
            {" "}
            Lớp cá nhân :{" "}
            <span style={{ color: "coral" }}>{numSingleClass}</span>
          </div>
        )}
        {numGroupClass > 0 && (
          <div style={{ margin: "0 .5rem" }}>
            {" "}
            Lớp nhóm : <span style={{ color: "coral" }}>{numGroupClass}</span>
          </div>
        )}
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
            onClick={addDateHandler}
          >
            Thêm
          </button>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-detail"
            onClick={minusDateHandler}
          >
            Bớt
          </button>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-delete"
            onClick={delDateHandler}
          >
            Xóa
          </button>
          <button
            style={{ margin: "3px" }}
            className="btn-sm btn-sm-delete"
            onClick={cancelEditHandler}
          >
            Hủy sửa
          </button>
        </div>{" "}
      </div>
    </section>
  );
};

export default SuaMotNgay;
