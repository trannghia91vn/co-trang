import classes from "./LichDiemDanh.module.css";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { sortDateChecked } from "../../../support/diem-danh-ca-nhan/ddcn-uti";
import { useDispatch } from "react-redux";
import { Fragment } from "react";

const LichDiemDanh = (props) => {
  //Lấy về tên học sinh được chọn để render cho dễ nhận biết
  const nameStuSelected = props.stuSelected.name;
  const dispatchFn = useDispatch();
  //Tạo biến ngày hôm nay -> lọc ra tháng để chỉ render tháng cần điểm danh là now
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();
  //Lấy về data từ props để render lich điểm danh
  const arrDateChecked = sortDateChecked(props.dataDiemDanh);
  //Callback xử lý chính
  const editDateHandler = (id) => {
    props.editDate(id);
  };
  const delDateHandler = (id) => {
    //Push loading
    props.activeLoading();
    //Chạy fetch xóa ngày điểm danh
    fetch("/api/diem-danh-ca-nhan", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => props.deActiveLoading(), props.activeRefetch())
      .catch((error) => props.deActiveLoading(), props.activeRefetch());
  };

  //Biến render ra nội dung ngày điểm danh
  const renderDatesChecked = arrDateChecked.map((date) => {
    let finalDateCss = classes.date;
    if (date.typeSingleCheck === "nghi") {
      finalDateCss = `${classes.date} ${classes["date-nghi"]}`;
    }
    if (date.typeSingleCheck === "bu") {
      finalDateCss = `${classes.date} ${classes["date-bu"]}`;
    }
    if (date.typeSingleCheck === "tang") {
      finalDateCss = `${classes.date} ${classes["date-tang"]}`;
    }
    return (
      <div key={date._id} className={finalDateCss}>
        <p>{new Date(date.dateSingleCheck).getDate()}</p>
        <button
          className={classes.xmbtn}
          type="button"
          onClick={editDateHandler.bind(0, date._id)}
        >
          <FaRegEdit
            style={{ color: "green", fontWeight: "bold", fontSize: "1rem" }}
          />
        </button>
        <button
          className={classes.xmbtn}
          type="button"
          onClick={delDateHandler.bind(0, date._id)}
        >
          <AiFillDelete
            style={{ color: "darkred", fontWeight: "bold", fontSize: "1rem" }}
          />
        </button>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={classes.overall}>
        <h3>
          Hs: <span style={{ color: "yellow" }}> {nameStuSelected}</span> -
          Time:
          <span style={{ color: "yellow" }}>
            {props.objMonthYear.month > 0 ? props.objMonthYear.month : nowMonth}
          </span>
          /
          <span style={{ color: "yellow" }}>
            {props.objMonthYear.year > 0 ? props.objMonthYear.year : nowYear}
          </span>
        </h3>

        <div className={classes.notes}>
          <div className={classes.note}>
            <div className={classes.hoc} /> <label>Ngày học</label>
          </div>
          <div className={classes.note}>
            <div className={classes.nghi} /> <label>Ngày nghỉ</label>
          </div>
          <div className={classes.note}>
            <div className={classes.bu} /> <label>Ngày học bù</label>
          </div>
          <div className={classes.note}>
            <div className={classes.tang} /> <label>Ngày tăng cường</label>
          </div>
        </div>

        <div className={classes.container}>{renderDatesChecked}</div>
      </div>
    </Fragment>
  );
};

export default LichDiemDanh;
