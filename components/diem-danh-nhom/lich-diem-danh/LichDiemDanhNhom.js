import classes from "./LichDiemDanhnhom.module.css";
import NgayDiemDanhItem from "./NgayDiemDanh";
import { Fragment } from "react";
import { filterArrDdnIdteaMonthYear } from "../../../support/diem-danh-nhom/ddn-uti";
import { sortArrByDateIncrease } from "../../../support/diem-danh-nhom/ddn-uti";

const LichDiemDanhNhom = (props) => {
  //Biến lấy giá trị năm tháng hiện tại
  const now = new Date();
  const nowMonth = now.getMonth()+1;
  const nowYear = now.getFullYear();
  //Lấy về ngày tháng lọc từ props
  const monthYearFilter = props.monthYearFilter;
  //Lầy vè từ props mảng điềm danh nhóm
  const arrDiemDanhNhom = props.arrDDN;
  //Lấy vè idTea từ tag tacher được selected
  const idTeaSelected = props.teaSelected.id;
  const nameTeaSelected = props.teaSelected.name;

  //Tạo biến quyết định ngày tháng nào được dùng để lọc mảng điểm danh nhóm
  let finalTimeFilter = { month: nowMonth, year: nowYear };
  if (monthYearFilter.month !== "" && monthYearFilter.year !== "") {
    finalTimeFilter = monthYearFilter;
  }


  //Lọc lại mảng điểm danh nhóm theo 3dk : idTea, ngày, tháng
  let arrDiemDanhNhomByTeaMonthYear = [];
  if (arrDiemDanhNhom && arrDiemDanhNhom.length > 0) {
    arrDiemDanhNhomByTeaMonthYear = filterArrDdnIdteaMonthYear(
      arrDiemDanhNhom,
      idTeaSelected,
      finalTimeFilter
    );
  }

  //Sắp xếp lại mảng điểm danh theo ngày tăng dần
  const arrSortFinal = sortArrByDateIncrease(arrDiemDanhNhomByTeaMonthYear)
  console.log(arrSortFinal)

  //Tạo biên render danh sách ngày điềm danh
  let renderGroupDateChecked = "";
  if (arrDiemDanhNhomByTeaMonthYear.length > 0) {
    renderGroupDateChecked = arrSortFinal.map((cv) => (
      <NgayDiemDanhItem
        key={cv._id}
        idGroupDate={cv._id}
        taughtDate={cv.taughtDate}
        taughtTime={cv.taughtTime}
        arrLearnedStus={cv.arrLearnedStus}
        showEditUi={props.showEditUi}
        doDelSubmit={props.doDelSubmit}
      />
    ));
  }

  return (
    <Fragment>
      <div className={classes.overall}>
        <h3>
          Giáo viên: <span style={{ color: "yellow" }}> {nameTeaSelected}</span>{" "}
          - Time:
          <span style={{ color: "yellow" }}>{finalTimeFilter.month}</span>/
          <span style={{ color: "yellow" }}>{finalTimeFilter.year}</span>
        </h3>

        <div className={classes.container}>
          {renderGroupDateChecked}
        </div>
      </div>
    </Fragment>
  );
};

export default LichDiemDanhNhom;
