import classes from "./LichDiemDanh.module.css";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  sortDateChecked,
  getArrDiemDanhCaNhanByStuAndMonthYear,
} from "../../../support/diem-danh-ca-nhan/ddcn-uti";
import { useDispatch } from "react-redux";
import { Fragment } from "react";

const LichDiemDanh = (props) => {
  //Lấy về props
  const { stuSelected, arrDDCN, monthYearFilter } = props;
  //Lấy về tên học sinh được chọn để render cho dễ nhận biết
  const nameStuSelected = stuSelected.name;
  //Lấy về mảng ddcn lọc lại theo học id học sinh
  const arrDiemDanhCaNhan = arrDDCN.filter((cv) => cv.idStu === stuSelected.id);
  //Tạo biến ngày hôm nay -> lọc ra tháng để chỉ render tháng cần điểm danh là now
  const now = new Date();
  const nowMonth = now.getMonth()+1;
  const nowYear = now.getFullYear();

  //Xử lý lọc lại arrDiemDanhCaNhan theo idStu và ngày tháng
  let arrHandler = [];
  if (monthYearFilter.month === "" && monthYearFilter.year === "") {
    arrHandler = getArrDiemDanhCaNhanByStuAndMonthYear(
      arrDiemDanhCaNhan,
      stuSelected.id,
      nowMonth,
      nowYear
    );
  } else {
    arrHandler = getArrDiemDanhCaNhanByStuAndMonthYear(
      arrDiemDanhCaNhan,
      stuSelected.id,
      monthYearFilter.month,
      monthYearFilter.year
    );
  }
  //Lấy về data từ props để render lich điểm danh
  const arrDateChecked = sortDateChecked(arrHandler);

  //Callback xử lý chính
  const editDateHandler = (idDate) => {
    props.changeEditUi(idDate);
  };
  const delDateHandler = (idDate) => {
    props.doDelRequest(idDate);
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
            {props.monthYearFilter.month > 0
              ? props.monthYearFilter.month
              : nowMonth}
          </span>
          /
          <span style={{ color: "yellow" }}>
            {props.monthYearFilter.year > 0
              ? props.monthYearFilter.year
              : nowYear}
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
