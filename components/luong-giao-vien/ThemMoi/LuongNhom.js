import classes from "./LuongCaNhan.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filterArrLuongNhomByIdTeaMonthYear } from "../../../support/luong-giao-vien/lgn-uti";
import { Fragment, useRef, useEffect } from "react";
import { formatMoney } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";
import { LgvActions } from "../../../store/redux/luong-giao-vien/lgv-slice";

export const DesLuongNhom = (props) => {
  const dispatchFn = useDispatch();

  //Biến ref lấy value của ô ghi chú
  const descriptionRef = useRef();
  //Callback thêm ghi chú vào ngày
  //Callback clearinput
  const clearInput = () => {
    descriptionRef.current.value = "";
  };

  const addDesToDate = (idGroupDate) => {
    dispatchFn(
      LgvActions.addDescriptionToDate({
        idGroupDate: idGroupDate,
        description: descriptionRef.current.value,
      })
    );
    clearInput();
  };
  //Callback xóa ghi chú
  const delDesDate = (idGroupDate) => {
    dispatchFn(LgvActions.delDescriptionDate(idGroupDate));
    clearInput();
  };

  return props.description === "" ? (
    <div className={classes.cell}>
      <textarea rows="2" ref={descriptionRef} required />
      <button
        className="btn-sm btn-sm-sub"
        type="button"
        onClick={addDesToDate.bind(0, props.idGroupDate)}
      >
        Thêm
      </button>
    </div>
  ) : (
    <div className={classes.cell}>
      <textarea
        rows="2"
        ref={descriptionRef}
        placeholder={props.description}
        disabled
      />
      <button
        className="btn-sm btn-sm-delete"
        type="button"
        onClick={delDesDate.bind(0, props.idGroupDate)}
      >
        Xóa
      </button>
    </div>
  );
};

const LuongNhom = (props) => {
  //Des
  const { monthYear, teaSelected, groupWage,idTeaSelected } = props;
  //Lấy về mảng lương nhóm được tạo khi click giáo viên ban đầu -- khi dùng cho giao diẹn edti thay thế mảng này là xong
  const arrLuongNhom = useSelector((state) => state.lgv.arrLuongNhom);

  //Lọc lại mảng lương nhóm theo id giáo viên , month year -- dùng support cho gọn
  const arrLuongNhomFilter = filterArrLuongNhomByIdTeaMonthYear(
    arrLuongNhom,
    idTeaSelected,
    monthYear
  );
  //Mảng labels
  const arrLabels = ["Ngày", "Ghi chú", "Số giờ", "Thành tiền"];

  //Biến render hàng labels
  const renderLabelsRow = arrLabels.map((cv) => (
    <div key={cv} className={classes.label}>
      {cv}
    </div>
  ));

  //Thiết lập mảng chứa tổng của từng dòng bên dưới
  const arrSumMoneyRow = [];
  //Biến render hàng data
  const renderDataRow = arrLuongNhomFilter.map((cv) => {
    //Biến lấy lại ngày thôi
    const day = new Date(cv.taughtDate).getDate();
    //Xử lý đổi phút ra giờ dạy
    const taughtCalc = +cv.taughtTime / 60;
    const taughtHourView = taughtCalc.toFixed(2);
    //Xử lý tính tiền
    const rowMoney = Math.round(taughtCalc * groupWage);
    //Đảy tổng tiền cảu hàng vào mảng tổng tiền
    arrSumMoneyRow.push(rowMoney);

    return (
      <Fragment key={cv.idGroupDate}>
        {/* Render ngày */}
        <div className={classes.cell}>{day}</div>
        {/* Render form thêm ghi chú */}
        <DesLuongNhom
          description={cv.description}
          idGroupDate={cv.idGroupDate}
        />
        {/* Render Số giờ dạy */}
        <div className={classes.cell}>
          {cv.taughtTime}'/ 60 = {taughtHourView}
        </div>
        {/* Render thành tiền của ngày */}
        <div className={classes.cell}>{formatMoney(rowMoney)} đ</div>
      </Fragment>
    );
  });

  //Tính tổng tiền
  let totalMoney = 0;
  if (arrSumMoneyRow.length > 0) {
    totalMoney = arrSumMoneyRow.reduce((tong, cv) => tong + cv);
  }
  //Side effect truyền tổng tiền nhóm lên comp chính
  useEffect(() => {
    props.getTotalGroupWage(totalMoney);
  }, [arrLuongNhom]);
  //Biến render hàng tính tổng tiền
  const renderTotalRow = (
    <Fragment>
      <div className={classes.hide}></div>
      <div className={classes.hide}></div>
      <div className={classes.cell}>Tổng:</div>
      <div
        style={{ fontWeight: "bold", color: "var(--mauPhu1--" }}
        className={classes.cell}
      >
        {formatMoney(totalMoney)} đ
      </div>
    </Fragment>
  );

  return (
    <section className={classes.overall}>
      <h3>
        Tổng hợp giờ dạy nhóm tháng{" "}
        <span style={{ color: "var(--mauPhu1--" }}>
          {monthYear.month} / {monthYear.year}{" "}
        </span>
      </h3>
      <div className={classes["container-4col"]}>
        {renderLabelsRow}
        {renderDataRow}
        {renderTotalRow}
      </div>
    </section>
  );
};

export default LuongNhom;
