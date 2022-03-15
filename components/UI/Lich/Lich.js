import classes from "./Lich.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFirstLastDateOfMonth } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";
import { useEffect } from "react";
import { LichActions } from "../../../store/redux/lich/lich-slice";
import { getColumnWeekdayData } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";

const Lich = (props) => {
  const dispatchFn = useDispatch();
  //Lấy về từ props monthYear để render ra đúng ngày tháng
  const { monthYear } = props;
  //Des ra ngày đầu và cuối tháng
  const { firstWeekday, lastDayNum } = getFirstLastDateOfMonth(monthYear);
  useEffect(() => {
    //Dispatch tạo mảng lich cuối cùng trên redux
    dispatchFn(LichActions.createFinalCalendar({ firstWeekday, lastDayNum }));
  }, [monthYear]);
  //Lấy về mảng cell cảu lich từ redux
  const arrLich = useSelector((state) => state.lich.arrLich);
  // console.log(arrLich);

  //Xử lý đếm ngày điểm danh một cột ngày được điẻm danh nhiều hơn 2 lần đẻ render ra thông báo
  //Đẩu tiên là tạo mảng labels khớp với redux đã
  const arrWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  //Tạo mảng chứa thông tin thông baos
  const arrCountNoti = [];
  //Chạy vòng lặp xử lý
  arrWeekday.forEach((wd) => {
    //Lấy về đối tượng đếm cho từng cột weekday
    const objCount = getColumnWeekdayData(arrLich, wd);
    //Nếu đếm được thì push vào mảng thông báo
    if (objCount && objCount.countTotal > 1) {
      arrCountNoti.push(objCount);
    }
  });
  //Tạo biến render thông báo đếm cột ngày điểm dánh
  let renderCountNoti = "";
  if (arrCountNoti.length > 0) {
    renderCountNoti = arrCountNoti.map((noti) => (
      <div key={noti.weekday} className={classes.noti}>
        <div> {noti.weekday}</div>
        <div> {noti.countSingle > 0 && `Cá nhân : x${noti.countSingle}`} </div>
        <div>{noti.countGroup > 0 && `Nhóm : x${noti.countGroup}`}</div>
      </div>
    ));
  }

  //Tạo mảng label thứ
  const arrLabels = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  //Callback chính xử lý chỉnh sửa thông tin của ngày được chọn
  const editDateHandler = (idCell) => {
    props.getIdDate(idCell);
    props.doShowEdit();
  };
  //Biến render labels thứ trong tuần
  const renderLabels = arrLabels.map((cv) => (
    <div key={cv} className={classes.label}>
      {cv}
    </div>
  ));
  //Biến render 42 ô cho lịch
  const renderDates =
    arrLich.length > 0 &&
    arrLich.map((cell) => {
      let finalClass = classes.date;
      if (cell.singleClass) {
        finalClass = `${classes.date} ${classes["date-single"]}`;
      }
      if (cell.groupClass) {
        finalClass = `${classes.date} ${classes["date-group"]}`;
      }
      if (cell.bothClass) {
        finalClass = `${classes.date} ${classes["date-both"]}`;
      }

      return (
        <button
          key={cell.idCell}
          disabled={cell.disable ? "disabled" : ""}
          className={finalClass}
          onClick={editDateHandler.bind(0, cell.idCell)}
        >
          {cell.date}
        </button>
      );
    });

  return (
    <section className={classes.overall}>
      <h3>
        Tháng {monthYear.month} năm {monthYear.year}
      </h3>
      <div className={classes.container}>
        {renderLabels}
        {renderDates}
      </div>
      {renderCountNoti !== "" && (
        <div className={classes.notis}>{renderCountNoti}</div>
      )}
    </section>
  );
};

export default Lich;
