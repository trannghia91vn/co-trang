import classes from "./DDCN.module.css";
import ChonHocSinh from "./ChonHocSinh";
import ChonNgayDDCN from "./ChonNgayDDCN";
import ChonGiaoVienCN from "./ChonGiaoVien";
import LichDiemDanh from "../lich-diem-danh/LichDiemDanh";
import LocNamThang from "../../UI/MonthYearPick/MonthYearPick";
import { useState } from "react";
import { sortArrByName } from "../../../support/diem-danh-ca-nhan/ddcn-uti";

const DiemDanhCaNhan = (props) => {
  //Lấy về đói tượng stuSelected để quết định render giao diện thao tác cho học sinh này
  const {
    stuSelected,
    dateType,
    disUpdateBtn,
    arrStudentTags,
    arrDiemDanhCaNhan,
    monthYearFilter,
    idDateTemp,
    dateTypeDefault,
    arrTeacherTaughtDefault,
  } = props;
  //Biến state trạng thái giao diện add/edit
  const [isViewEditUi, changeViewEditUi] = useState(false);
  //Biến refresh lại toàn bộ khi ta nhấn lọc ngày tháng ở comp dươkc
  const [disable, changeDisable] = useState(false);

  //Tạo biến date mặc định truyền xuống add form khi có monthYearFileter
  let defaultDateAddForm = `${monthYearFilter.year}-${monthYearFilter.month}-01`;
  if (monthYearFilter.month.toString().length === 1) {
    defaultDateAddForm = `${monthYearFilter.year}-0${monthYearFilter.month}-01`;
  }

  //Sort lại mảng arrTag học sinh cho dễ nhìn
  const arrStudentTagsSort = sortArrByName(arrStudentTags);
  //Callback chuyển đổi giao diện
  const viewAddUiHandler = () => {
    changeViewEditUi(false);
  };
  const viewEditUiHandler = (idDate) => {
    changeViewEditUi(true);
    props.getIdDateTemp(idDate);
  };

  //Dùng comp này đẻ load lại gía trị mặc định cho giao diẹn thêm mới ngày điẻm danh
  const tempDisableCompHandler = () => {
    changeDisable(true);
    setTimeout(() => {
      changeDisable(false);
    }, 200);
  };

  //Callback chính submit
  const submitEditHandler = () => {
    viewAddUiHandler();
    props.doPostRequest();
  };

  return (
    <section className={classes.container}>
      <ChonHocSinh arrStudentTags={arrStudentTagsSort} />

      {stuSelected && !isViewEditUi && (
        <label className={classes.note}>
          Không điền giá trị nếu muốn điểm danh tháng hiện tại.
          <br /> Điền giá trị nếu muốn xem lại / chỉnh sửa tháng cũ.{" "}
        </label>
      )}
      {stuSelected && !isViewEditUi && (
        <LocNamThang
          getMonthYear={props.getMonthYearFilter}
          refreshAddForm={tempDisableCompHandler}
        />
      )}

      {stuSelected && !isViewEditUi && !disable && (
        <div className={classes.addForm}>
          {stuSelected && (
            <ChonNgayDDCN
              getDateType={props.getDateType}
              dateAddDefault={defaultDateAddForm}
            />
          )}
          {stuSelected && dateType.type !== "nghi" && (
            <ChonGiaoVienCN getTeacherData={props.getTeacherData} />
          )}
          {stuSelected && (
            <div className={classes.actions}>
              <button
                type="button"
                style={{ fontSize: "1.2rem" }}
                className="btn btn-submit"
                onClick={submitEditHandler}
                disabled={!disUpdateBtn ? "" : "disabled"}
              >
                Cập nhật
              </button>
              <button
                type="button"
                style={{ fontSize: "1.2rem" }}
                className="btn btn-cancel"
                onClick={props.doReload}
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      )}

      {stuSelected && !isViewEditUi && (
        <LichDiemDanh
          stuSelected={stuSelected}
          arrDDCN={arrDiemDanhCaNhan}
          monthYearFilter={monthYearFilter}
          doDelRequest={props.doDelRequest}
          changeEditUi={viewEditUiHandler}
        />
      )}

      {stuSelected && isViewEditUi && (
        <div className={classes.editForm}>
          {stuSelected && isViewEditUi && (
            <ChonNgayDDCN
              getDateType={props.getDateType}
              dateTypeDefault={dateTypeDefault}
            />
          )}

          {stuSelected && isViewEditUi && dateType.type !== "nghi" && (
            <ChonGiaoVienCN
              arrTeacherTaughtDefault={arrTeacherTaughtDefault}
              getTeacherData={props.getTeacherData}
            />
          )}
          {stuSelected && isViewEditUi && (
            <div className={classes.actions}>
              <button
                type="button"
                style={{ fontSize: "1.2rem" }}
                className="btn btn-submit"
                onClick={props.doPutRequest}
              >
                Sửa
              </button>
              <button
                type="button"
                style={{ fontSize: "1.2rem" }}
                className="btn btn-cancel"
                onClick={viewAddUiHandler}
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DiemDanhCaNhan;
