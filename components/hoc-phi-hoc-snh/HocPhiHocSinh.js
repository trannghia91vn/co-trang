import classes from "./HocPhiHocSinh.module.css";
import ChonHocSinh from "../diem-danh-ca-nhan/diem-danh/ChonHocSinh";
import LocNamThang from "../UI/MonthYearPick/MonthYearPick";
import Lich from "../UI/Lich/Lich";
import ChonNhanhNhieuNgay from "./ChonNhanhNhieuNgay";
import SuaMotNgay from "./SuaMotNgay";
import { useState } from "react";

const HocPhiHocSinh = (props) => {
  //Des các data chính ra đẻ dùng
  const { arrStudentTags, monthYearFilter, stuSelected } = props;
  //Biến nội bộ lưu tạm đối tượng ngày được click từ lịch
  const [idDateSelected, changeIdDateSelected] = useState("");
  //Biến nội bộ quản lý hiển thi giao diẹn sửa ngày
  const [showEditDate, changeShowEditDate] = useState(false);
  //Callback lấy đối tượng ngày được click từ lịch
  const getIdDateHandler = (idCellDate) => {
    changeIdDateSelected(idCellDate);
  };
  //Callback chuyển giao diẹn edit / add ngày
  const showEditDateHandler = () => {
    changeShowEditDate(true);
  };
  const hideEditDateHandler = () => {
    changeShowEditDate(false);
  };
  return (
    <section className={classes.container}>
      <ChonHocSinh arrStudentTags={arrStudentTags} />
      {stuSelected && (
        <label className={classes.note}>
          Không điền giá trị nếu muốn tính tiền tháng tiếp theo.
          <br /> Điền giá trị nếu muốn xem lại / chỉnh sửa tiền tháng cũ.{" "}
        </label>
      )}
      {stuSelected && <LocNamThang getMonthYear={props.getMonthYearFilter} />}
      {stuSelected &&
        monthYearFilter.month !== "" &&
        monthYearFilter.year !== "" && (
          <div className={classes.addForm}>
            {!showEditDate && <ChonNhanhNhieuNgay />}
            {showEditDate && (
              <SuaMotNgay
                idDateSelected={idDateSelected}
                monthYear={monthYearFilter}
                doHideEdit={hideEditDateHandler}
              />
            )}

            <Lich
              monthYear={monthYearFilter}
              getIdDate={getIdDateHandler}
              doShowEdit={showEditDateHandler}
            />
            {!showEditDate && (
              <div>
                <div className={classes.actions}>
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={"#"}
                    disabled={props.disSubmitBtn ? "disabled" : ""}
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={"#"}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    </section>
  );
};

export default HocPhiHocSinh;
