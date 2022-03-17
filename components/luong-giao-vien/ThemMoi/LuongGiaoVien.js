import classes from "./LuongGiaoVien.module.css";
import ChonGiaoVien from "../../diem-danh-nhom/diem-danh/ChonGiaoVien";
import LocNamThang from "../../UI/MonthYearPick/MonthYearPick";
import LuongCaNhan from "./LuongCaNhan";
import LuongNhom from "./LuongNhom";
import ThemPhuPhi from "./ThemPhuPhi";
import { formatMoney } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";

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
  } = props;
  return (
    <section className={classes.container}>
      <ChonGiaoVien arrTags={arrTeacherTags} doRefresh={props.doRefresh} />
      {teaSelected && (
        <label className={classes.note}>
          Không điền giá trị nếu muốn điểm danh tháng hiện tại.
          <br /> Điền giá trị nếu muốn xem lại / chỉnh sửa tháng cũ.{" "}
        </label>
      )}
      {teaSelected && <LocNamThang getMonthYear={props.getMonthYear} />}
      {teaSelected && (
        <LuongCaNhan
          monthYear={monthYear}
          teaSelected={teaSelected}
          singleWage={singleWage}
          getTotalSingleWage={props.getTotalSingleWage}
        />
      )}
      {teaSelected && (
        <LuongNhom
          monthYear={monthYear}
          teaSelected={teaSelected}
          groupWage={groupWage}
          getTotalGroupWage={props.getTotalGroupWage}
        />
      )}
      {teaSelected && (
        <ThemPhuPhi
          monthYear={monthYear}
          teaSelected={teaSelected}
          getTotalPlusWage={props.getTotalPlusWage}
        />
      )}
      {teaSelected && (
        <div className={classes.result}>
          <label>Tổng cộng</label>
          <h3>
            {formatMoney(totalPlusWage + totalSingleWage + totalGroupWage)} đ
          </h3>
          <button
            type="button"
            className="btn btn-submit"
            onClick={props.doAddMonthWage}
          >
            Thêm mới
          </button>
        </div>
      )}
    </section>
  );
};

export default LuongGiaoVien;
