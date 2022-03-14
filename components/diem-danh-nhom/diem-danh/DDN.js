import ChonGiaoVien from "./ChonGiaoVien";
import ChonNgayGio from "./ChonNgayGio";
import ChonHocSinhNhom from "./ChonHocSinhNhom";
import LocNamThang from "../../UI/MonthYearPick/MonthYearPick";
import LichDiemDanhNhom from "../lich-diem-danh/LichDiemDanhNhom";
import classes from "./DDN.module.css";
import { Fragment, useState } from "react";

const DiemDanhNhom = (props) => {
  //Lấy về biến giáo viên được chọn chưa mới render các comp thiét lập
  const teaSelected = props.teaSelected;
  //Biến state nội bộ lưu tạm giá trị ngày điềm danh được click khi sửa ngày điềm dánh
  const [idDateTemp, changeIdDateTemp] = useState("");
  //Lấy về mảng data điểm danh
  const arrDiemDanhNhom = props.arrDDN;
  //Biến state chuyển giao diện thêm và sửa
  const [showAddUi, changeShowAddUi] = useState(true);
  //Biến state disable một số comp tạm thời
  const [disable, changeDisable] = useState(false);
  //Callback kích hoạt disable comp Thêm mới và load lại đẻ lấy input ngày mặc định
  const disableAddUiTemHandler = () => {
    changeDisable(true);
    setTimeout(() => {
      changeDisable(false);
    }, 200);
  };
  //Callback kích hoạt chuyển giao diện add/edit
  const showAddUiHandler = () => {
    changeShowAddUi(true);
  };
  const showEditUiHandler = (idDate) => {
    changeShowAddUi(false);
    changeIdDateTemp(idDate);
    props.getIdDateTemp(idDate);
  };
  //Từ idDateTemp và mảng điểm danh nhóm -> lọc lại đói tượng điểm dánh được clicj theo id ngày, dùng đối tượng data này để truyền xuống default cho gd sửa
  let objDateSelected = {
    _id: "",
    idTea: "",
    nameTea: "",
    taughtDate: "",
    taughtTime: 0,
    arrLearnedStus: [],
  };
  if (idDateTemp !== "" && arrDiemDanhNhom.length > 0) {
    objDateSelected = arrDiemDanhNhom.find((cv) => cv._id === idDateTemp);
  }

  //Xử lý giá trị ngày mặc định cho giao diện thêm mới ngày điêm danh
  const monthYearFilter = props.monthYearFilter;
  let defaultAddDate = `${monthYearFilter.year}-${monthYearFilter.month}-01`;
  if (monthYearFilter.month.toString().length === 1) {
    defaultAddDate = `${monthYearFilter.year}-0${monthYearFilter.month}-01`;
  }

  return (
    <Fragment>
      <section className={classes.container}>
        <ChonGiaoVien arrTags={props.arrTeaTags} />

        {teaSelected && (
          <label className={classes.note}>
            Không điền giá trị nếu muốn điểm danh tháng hiện tại.
            <br /> Điền giá trị nếu muốn xem lại / chỉnh sửa tháng cũ.{" "}
          </label>
        )}
        {teaSelected && (
          <LocNamThang
            getMonthYear={props.getMonthYear}
            refreshAddForm={disableAddUiTemHandler}
          />
        )}

        {teaSelected && showAddUi && !disable && (
          <div className={classes.addForm}>
            <ChonNgayGio
              getDateTimeData={props.getDateTimeData}
              defaultAddDate={defaultAddDate}
            />
            <ChonHocSinhNhom
              arrTags={props.arrStuTags}
              arrLopNhom={props.arrLopNhom}
            />
            <div className={classes.actions}>
              <button
                type="button"
                className="btn btn-submit"
                onClick={props.doAddSubmit}
                disabled={props.disSubmitBtn ? "disabled" : ""}
              >
                Cập nhật
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={props.doReload}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {teaSelected && showAddUi && (
          <LichDiemDanhNhom
            arrDDN={props.arrDDN}
            teaSelected={props.teaSelected}
            monthYearFilter={props.monthYearFilter}
            showAddUi={showAddUiHandler}
            showEditUi={showEditUiHandler}
            doDelSubmit={props.doDelSubmit}
          />
        )}

        {teaSelected && !showAddUi && (
          <div className={classes.editForm}>
            {" "}
            <ChonNgayGio
              getDateTimeData={props.getDateTimeData}
              defaultData={objDateSelected}
            />
            <ChonHocSinhNhom
              arrTags={props.arrStuTags}
              arrLopNhom={props.arrLopNhom}
              defaultData={objDateSelected}
            />
            <div className={classes.actions}>
              <button
                type="button"
                className="btn btn-submit"
                onClick={props.doEditSubmit}
              >
                Sửa
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={props.doReload}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default DiemDanhNhom;
