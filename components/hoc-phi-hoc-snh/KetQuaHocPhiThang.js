import classes from "./KQHPT.module.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../support/hoc-phi-hoc-sinh/hphs-uti";

const KetQuaHocPhiThang = (props) => {
  //Lấy về mảng học sinh để lấy thông tin học phí
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  //Des ra các data để render
  const {
    _id,
    idStu,
    nameStu,
    monthYear,
    totalSingleDates,
    totalGroupDates,
    totalPreMonthOffDates,
    totalPreMonthReplaceDates,
    totalPreMonthPlusDates,
    totalSingleFee,
    totalGroupFee,
    totalMonthFee,
    totalPreMonthMoneyOff,
    totalPreMonthMoneyPlus,
    totalPreMonthMoneyReplace,
  } = props.dataHocPhiThangHocSinh;

  //Tạo các biến kiểm tra điều kiện render
  let renderCurrentRow = false;
  if (+totalSingleDates > 0 || +totalGroupDates > 0) {
    renderCurrentRow = true;
  }
  let renderPreOffRow = false;
  if (+totalPreMonthOffDates > 0) {
    renderPreOffRow = true;
  }
  let renderPreRelaceRow = false;
  if (+totalPreMonthReplaceDates > 0) {
    renderPreRelaceRow = true;
  }
  let renderPrePlusRow = false;
  if (+totalPreMonthPlusDates > 0) {
    renderPrePlusRow = true;
  }
  let renderFinalRow = false;
  if (
    renderCurrentRow ||
    renderPreOffRow ||
    renderPreRelaceRow ||
    renderPrePlusRow
  ) {
    renderFinalRow = true;
  }

  //Lấy về tiền học phí của học sinh theo id
  const stuMatched = arrStudents.find((cv) => cv._id === idStu);
  const singleFee = stuMatched.singleFee;
  const groupFee = stuMatched.groupFee;
  //Tạo mảng labels để render
  const arrLabels = ["Thời gian", "Số buổi học", "Học phí", "Thành tiền"];
  const renderLabels = arrLabels.map((cv) => (
    <div key={cv} className={classes.label}>
      {cv}
    </div>
  ));
  //Tạo render thông tin tháng này
  const renderCurrentData = (
    <Fragment>
      <div className={classes.cell}>
        {monthYear.month} / {monthYear.year}
      </div>
      <div className={classes.cell}>
        Cá nhân : {totalSingleDates} buổi, Nhóm : {totalGroupDates} buổi.
      </div>
      <div className={classes.cell}>
        CN : {formatMoney(singleFee)} đ, Nhóm : {formatMoney(groupFee)} đ
      </div>
      <div className={`${classes.cell} ${classes.result}`}>
        {formatMoney(totalSingleFee + totalGroupFee)} đ
      </div>
    </Fragment>
  );
  //Tạo render thông tin ngày nghỉ tháng trước
  const renderPreMonthOff = (
    <Fragment>
      <div className={classes.cell}>
        {monthYear.month - 1} / {monthYear.year}
      </div>
      <div className={classes.cell}>
        Số ngày nghỉ : {totalPreMonthOffDates} buổi
      </div>
      <div className={classes.cell}>
        CN : {formatMoney(singleFee)} đ, Nhóm : {formatMoney(groupFee)} đ
      </div>
      <div className={`${classes.cell} ${classes.result}`}>
        - {formatMoney(totalPreMonthMoneyOff)} đ
      </div>
    </Fragment>
  );
  //Tạo render thông tin ngày bù tháng trước
  const renderPreMonthReplace = (
    <Fragment>
      <div className={classes.cell}>
        {monthYear.month - 1} / {monthYear.year}
      </div>
      <div className={classes.cell}>
        Số ngày bù : {totalPreMonthReplaceDates} buổi
      </div>
      <div className={classes.cell}>
        CN : {formatMoney(singleFee)} đ, Nhóm : {formatMoney(groupFee)} đ
      </div>
      <div className={`${classes.cell} ${classes.result}`}>
        + {formatMoney(totalPreMonthMoneyReplace)} đ
      </div>
    </Fragment>
  );

  //Tạo render thông tin ngày bù tháng trước
  const renderPreMonthPlus = (
    <Fragment>
      <div className={classes.cell}>
        {monthYear.month - 1} / {monthYear.year}
      </div>
      <div className={classes.cell}>
        Số ngày tăng cường : {totalPreMonthPlusDates} buổi
      </div>
      <div className={classes.cell}>
        CN : {formatMoney(singleFee)} đ, Nhóm : {formatMoney(groupFee)} đ
      </div>
      <div className={`${classes.cell} ${classes.result}`}>
        + {formatMoney(totalPreMonthMoneyPlus)} đ
      </div>
    </Fragment>
  );

  //Tạo render thông tin ngày bù tháng trước
  const renderResult = (
    <Fragment>
      <div className={`${classes.cell} ${classes.hide}`}></div>
      <div className={`${classes.cell} ${classes.hide}`}></div>
      <div className={classes.cell}>TỔNG :</div>
      <div className={`${classes.cell} ${classes.final}`}>
        + {formatMoney(totalMonthFee)} đ
      </div>
    </Fragment>
  );

  //Calback chính xóa tháng học phí
  const delMonthFeeHandler = () => {
      props.doDelMonthFee(_id)
  }

  return (
    <section className={classes.container}>
      <div className={classes.horizental}>
        <h3>
          Học phí học sinh: <span style={{ color: "coral" }}>{nameStu}</span>{" "}
          --- Thời gian:{" "}
          <span style={{ color: "coral" }}>
            {monthYear.month} / {monthYear.year}
          </span>
        </h3>
      </div>
      <div className={classes.results}>
        {renderFinalRow && renderLabels}
        {renderCurrentRow && renderCurrentData}
        {renderPreOffRow && renderPreMonthOff}
        {renderPreRelaceRow && renderPreMonthReplace}
        {renderPrePlusRow && renderPreMonthPlus}
        {renderFinalRow && renderResult}
      </div>
      <button onClick={delMonthFeeHandler} style={{width : '300px',alignSelf:'center',margin:'1rem 0'}} className="btn btn-submit">Xóa học phí tháng này.</button>
    </section>
  );
};

export default KetQuaHocPhiThang;
