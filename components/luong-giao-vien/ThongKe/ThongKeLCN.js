import classes from "./TKLCN.module.css";
import { useSelector, useDispatch } from "react-redux";
import { LgvActions } from "../../../store/redux/luong-giao-vien/lgv-slice";
import { Fragment, useEffect } from "react";
import {
  getCalcMoneyEachStu,
  sortArrByNameStu,
} from "../../../support/luong-giao-vien/lgn-uti";
import { formatMoney } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";

const ThongKeLuongCaNhan = (props) => {
  const dispatchFn = useDispatch();
  //Des props
  const { monthYear, singleWage, idTeaSelected, arrLuongCaNhan } = props;

  //mảng labels cho hàng đầu tiên
  const arrLabels = ["Học sinh", "Ngày học", "Hs", "Tổng giờ", "Thành tiền"];
  //Biến render hàng labels
  const renderLabelsRow = arrLabels.map((cv) => (
    <div key={cv} className={classes.label}>
      {cv}
    </div>
  ));

  //Lấy về từ redux mảng ddcn để redner --- Arr này là data chinh để render, khi làm giao diện edit chỉ cần load arr này từ db là xong
  // const arrLuongCaNhan = useSelector((state) => state.lgv.arrLuongCaNhan);

  //Lọc lại theo id teacher và month year
  // const arrLuongCaNhan = arrLuongCaNhan.filter(
  //   (cv) =>
  //     cv.isTea === idTeaSelected &&
  //     +cv.monthYear.month === +monthYear.month &&
  //     +cv.monthYear.year === +monthYear.year
  // );
  // console.log(arrLuongCaNhan)

  //Tạo mảng chứa các giá trị tiền tính được của từng dòng data, mỗi vòng lặp bên dưới push vào mản này
  let arrThanhTien = [];
  //Sort lại mảng render chính theo thứ tự tên học sinh abc
  const arrLuongCaNhanSort = sortArrByNameStu(arrLuongCaNhan)
  //Biến render hàng data
  const renderDataRow = arrLuongCaNhanSort.map((cv) => {
    //Callback kích hoạt hệ số scale
    const active45 = (id) => {
      dispatchFn(
        LgvActions.changeSingleStuScale({
          idTea: idTeaSelected,
          monthYear: monthYear,
          idStu: id,
          scale: 45,
        })
      );
    };
    const active60 = (id) => {
      dispatchFn(
        LgvActions.changeSingleStuScale({
          idTea: idTeaSelected,
          monthYear: monthYear,
          idStu: id,
          scale: 60,
        })
      );
    };

    //Xử lý biến render mảng ngày học và giờ dạy
    //Lấy về mảng
    const arrTaughtData = [...cv.taughtData];
    //Sort lại thứ tự cho mange ngày
    const arrTaughtDataSortDate = arrTaughtData.sort((a, b) =>
      new Date(a.dateSingleCheck).getDate() >
      new Date(b.dateSingleCheck).getDate()
        ? 1
        : -1
    );
    //render ra mảng data dạy
    const renderTaughtDates = arrTaughtDataSortDate.map((item) => (
      <div key={item.dateSingleCheck} className={classes.date}>
        {new Date(item.dateSingleCheck).getDate()}{" "}
        <span className={classes.minute}>{item.taughtTime}'</span>
      </div>
    ));

    //Render ra hệ số của hoc sinh
    let dateCss = classes.scale;
    let dateActiveCss = `${classes.scale} ${classes["scale-active"]}`;
    const renderScale = (
      <div className={classes.scales}>
        <div
          className={cv.scale === 45 ? dateActiveCss : dateCss}
          onClick={active45.bind(0, cv.idStu)}
        >
          45
        </div>
        <div
          className={cv.scale === 60 ? dateActiveCss : dateCss}
          onClick={active60.bind(0, cv.idStu)}
        >
          60
        </div>
      </div>
    );

    //Render ra tổng giờ, support tính tổng giờ và thành tổng tiền
    const { totalMinutes, totalHour, totalWage } = getCalcMoneyEachStu(
      arrTaughtData,
      singleWage,
      cv.scale
    );
    //Đẩy giá trị tính được của dòng vào mảng tính tổng tiền
    arrThanhTien.push(totalWage);
    const renderCalcHour = (
      <div className={classes.cell}>
        {cv.scale === 1
          ? "None"
          : `${totalMinutes}' / ${cv.scale} = ${totalHour}h`}
      </div>
    );

    return (
      <Fragment key={cv.idStu}>
        <div className={classes.cell} style={{ fontSize: "1rem" }}>
          {cv.nameStu}
        </div>
        <div className={classes.cell}>{renderTaughtDates}</div>
        <Fragment>{renderScale}</Fragment>
        <Fragment>{renderCalcHour}</Fragment>
        <div className={classes.cell}>
          {cv.scale === 1 ? "None" : `${formatMoney(totalWage)} đ`}
        </div>
      </Fragment>
    );
  });

  //Biến render hàng tính tổng
  //Tính ra tổng tiền
  let totalMoneyCalc = 0;
  if (arrThanhTien.length > 0) {
    totalMoneyCalc = arrThanhTien.reduce((cv, tong) => cv + tong);
  }
  //Xử lý side effect push tổng tiền cá nhân lên comp chính
  useEffect(() => {
    props.getTotalSingleWage(totalMoneyCalc);
  }, [arrLuongCaNhan]);

  //Biến render hàng tổng
  const renderResultRow = (
    <Fragment>
      <div className={classes.hide}></div>
      <div className={classes.hide}></div>
      <div className={classes.hide}></div>
      <div className={classes.cell} style={{ fontWeight: "bold" }}>
        Tổng:
      </div>
      <div
        className={classes.cell}
        style={{ fontWeight: "bold", color: "var(--mauPhu1--" }}
      >
        {formatMoney(totalMoneyCalc)} đ
      </div>
    </Fragment>
  );

  return (
    <section className={classes.overall}>
      <h3>
        Tổng hợp giờ dạy cá nhân tháng{" "}
        <span style={{ color: "var(--mauPhu1--" }}>
          {monthYear.month} / {monthYear.year}{" "}
        </span>
      </h3>
      <div className={classes.container}>
        {renderLabelsRow}
        {renderDataRow}
        {renderResultRow}
      </div>
    </section>
  );
};

export default ThongKeLuongCaNhan;
