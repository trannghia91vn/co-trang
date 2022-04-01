import classes from "./LuongGiaoVien.module.css";
import ChonGiaoVien from "../../diem-danh-nhom/diem-danh/ChonGiaoVien";
import LocNamThang from "../../UI/MonthYearPick/MonthYearPick";
import LuongCaNhan from "./LuongCaNhan";
import LuongNhom from "./LuongNhom";
import ThemPhuPhi from "./ThemPhuPhi";
import ThongKeLuongCaNhan from "../ThongKe/ThongKeLCN";
import ThongKeLuongNhom from "../ThongKe/ThongKeLuongNhom";
import ThongKePhuPhi from "../ThongKe/ThongKePhuPhi";
import { formatMoney } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";

const LuongGiaoVien = (props) => {
  //Des props xử lý
  const {
    arrTeacherTags,
    teaSelected,
    monthYear,
    singleWage,
    groupWage,
    totalPlusWage,
    totalSingleWage,
    totalGroupWage,
    idTeaSelected,
    arrLuongCaNhanData,
    arrLuongNhomData,
    arrPhuPhiData,
    changeArrLuongCaNhan,
  } = props;
  //Biến state render giao diện hỏi xóa data
  const [confirmDel, changeConfirmDel] = useState(false);
  //Callback
  const viewConfirmDelHandler = () => {
    changeConfirmDel(true);
  };
  const hideConfirmDelHandler = () => {
    changeConfirmDel(false);
  };

  //Kiểm tra xem giáo viên đuóc chọn và ngày tháng lọc đã tồn tại trong mảng lương giaos viên chưa, nếu rồi thì không render giao diện thêm nữa mà chuyển sang giao diện edit
  //Lấy về mảng lương giáo viên
  const arrLuongThangGiaoVien = useSelector(
    (state) => state.lgv.arrLuongThangGiaoVien
  );
  //Kiểm tra xem đối tượng lương tháng đã tồn tại hay chưa
  const monthWageExist = arrLuongThangGiaoVien.find(
    (cv) =>
      cv.idTea === idTeaSelected &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );
  return (
    <section className={classes.container}>
      <ChonGiaoVien arrTags={arrTeacherTags} doRefresh={props.doRefresh} />
      {teaSelected && (
        <label className={classes.note}>
          Không điền giá trị nếu muốn tính lương tháng hiện tại.
          <br /> Điền giá trị nếu muốn xem lại / chỉnh sửa tháng cũ.{" "}
        </label>
      )}
      {teaSelected && <LocNamThang getMonthYear={props.getMonthYear} />}

      {teaSelected && !monthWageExist && (
        <LuongCaNhan
          monthYear={monthYear}
          teaSelected={teaSelected}
          singleWage={singleWage}
          idTeaSelected={idTeaSelected}
          getTotalSingleWage={props.getTotalSingleWage}
        />
      )}
      {teaSelected && monthWageExist && (
        <ThongKeLuongCaNhan
          // targetScale={targetScale}
          monthYear={monthYear}
          idTeaSelected={idTeaSelected}
          singleWage={singleWage}
          arrLuongCaNhan={arrLuongCaNhanData}
          getTotalSingleWage={props.getTotalSingleWage}
          changeArrLuongCaNhan={changeArrLuongCaNhan}
        />
      )}
      {teaSelected && !monthWageExist && (
        <LuongNhom
          monthYear={monthYear}
          teaSelected={teaSelected}
          groupWage={groupWage}
          idTeaSelected={idTeaSelected}
          getTotalGroupWage={props.getTotalGroupWage}
        />
      )}
      {teaSelected && monthWageExist && (
        <ThongKeLuongNhom
          monthYear={monthYear}
          teaSelected={teaSelected}
          groupWage={groupWage}
          idTeaSelected={idTeaSelected}
          getTotalGroupWage={props.getTotalGroupWage}
          arrLuongNhom={arrLuongNhomData}
        />
      )}
      {teaSelected && !monthWageExist && (
        <ThemPhuPhi
          monthYear={monthYear}
          teaSelected={teaSelected}
          getTotalPlusWage={props.getTotalPlusWage}
        />
      )}
      {teaSelected && monthWageExist && (
        <ThongKePhuPhi
          monthYear={monthYear}
          teaSelected={teaSelected}
          getTotalPlusWage={props.getTotalPlusWage}
          arrPhuPhi={arrPhuPhiData}
          idTeaSelected={idTeaSelected}
        />
      )}
      {teaSelected && !monthWageExist && (
        <div className={classes.result}>
          <label>Tổng cộng</label>
          <h3>
            {formatMoney(totalPlusWage + totalSingleWage + totalGroupWage)} đ
          </h3>
          <button
            type="button"
            className="btn btn-submit"
            onClick={props.doAddMonthWage}
            disabled={monthWageExist ? "disabled" : ""}
          >
            Thêm mới
          </button>
        </div>
      )}
      {teaSelected && monthWageExist && !confirmDel && (
        <div className={classes.result}>
          <label>Tổng cộng</label>
          <h3>
            {formatMoney(totalPlusWage + totalSingleWage + totalGroupWage)} đ
          </h3>
          <div className={classes["result-actions"]}>
            <button
              type="button"
              className="btn btn-submit"
              onClick={props.doUpdateMonthWage}
              disabled={!monthWageExist ? "disabled" : ""}
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              disabled={!monthWageExist ? "disabled" : ""}
              onClick={viewConfirmDelHandler}
            >
              Xóa
            </button>
          </div>
        </div>
      )}

      {/* Render giao diện xác thực xóa  */}
      {teaSelected && monthWageExist && confirmDel && (
        <div className={classes.result}>
          <label style={{ fontSize: "1rem", color: "coral" }}>
            Cô Trang lùn có chắc muốn xóa toàn bộ data lương tháng này không ?
          </label>
          <div className={classes["result-actions"]}>
            <button
              type="button"
              className="btn btn-submit"
              onClick={props.doDelMonthWage}
              disabled={!monthWageExist ? "disabled" : ""}
            >
              Xóa
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              disabled={!monthWageExist ? "disabled" : ""}
              onClick={hideConfirmDelHandler}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LuongGiaoVien;
