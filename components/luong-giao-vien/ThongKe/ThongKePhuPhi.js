import classes from "../ThemMoi/ThemPhuPhi.module.css";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LgvActions } from "../../../store/redux/luong-giao-vien/lgv-slice";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { formatMoney } from "../../../support/hoc-phi-hoc-sinh/hphs-uti";
import { sortDateExtraChecked } from "../../../support/luong-giao-vien/lgn-uti";

const ThongKePhuPhi = (props) => {
  const dispatchFn = useDispatch();
  //Des từ props
  const { monthYear, teaSelected, arrPhuPhi, idTeaSelected } = props;
  //Lấy về từ redux mảng phu phí đẻ redner két quả luôn - giao diện edti thay thằng này là xong
  // const arrPhuPhi = useSelector((state) => state.lgv.arrPhuPhi);

  //Lọc lại mảng phụ phí với id giáo viên và thắng năm truyễn xuôngns
  const arrPhuPhiFilter = arrPhuPhi.filter(
    (cv) =>
      cv.idTea === teaSelected.id &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );
  //Các biến ref input
  const dateRef = useRef();
  const plusWageRef = useRef();
  const desRef = useRef();
  //Callback clear iput
  const clearInput = () => {
    dateRef.current.value = "";
    plusWageRef.current.value = "";
    desRef.current.value = "";
  };
  //Callback chính thêm phu phí
  const addPlusWageHandler = (event) => {
    event.preventDefault();
    //Tổng hợp data
    const dataSubmit = {
      idTea: teaSelected.id,
      monthYear: monthYear,
      date: dateRef.current.value,
      plusWage: +plusWageRef.current.value,
      description: desRef.current.value,
    };
    //Dispatch lên redux
    dispatchFn(LgvActions.addPlusWageExist(dataSubmit));
    clearInput();
  };

  //Sort lại mảng phụ phí tăng dần theo ngày
  const arrPhuPhiSortDate = sortDateExtraChecked(arrPhuPhiFilter)

  //Tọạo biến render kết quả tạm thời của ngày thêm phu phí
  const renderPlusWageDates =
    arrPhuPhiFilter.length > 0 &&
    arrPhuPhiSortDate.map((cv) => {
      //Callback xóa ngày thêm phụ phí
      const delPlusWageDate = (id) => {
        dispatchFn(
          LgvActions.delPlusWageExist({
            idPlusWageDate: id,
            idTea: idTeaSelected,
            monthYear: monthYear,
          })
        );
      };
      return (
        <div key={cv.idPlusWageDate} className={classes.plusDate}>
          <div className={classes.date}>
            <BsFillCalendarCheckFill
              style={{ fontSize: ".9rem", margin: "2px" }}
            />
            {new Date(cv.date).getDate()}
          </div>
          <div style={{ maxWidth: "250px" }}>{cv.description}</div>
          <div style={{ color: "var(--mauPhu1--" }}>
            {formatMoney(cv.plusWage)} đ
          </div>
          <button
            className="btn-sm btn-sm-delete"
            type="button"
            onClick={delPlusWageDate.bind(0, cv.idPlusWageDate)}
          >
            Xóa
          </button>
        </div>
      );
    });

  //Xử lý tính tổng phụ phí:
  let totalPlusWage = 0;
  if (arrPhuPhiFilter.length > 0) {
    const arrPlusWage = arrPhuPhiFilter.map((cv) => cv.plusWage);
    totalPlusWage = arrPlusWage.reduce((tong, cv) => tong + cv);
  }
  //Biến render tổng tièn
  const renderTotalRow = totalPlusWage > 0 && (
    <div className={classes.plusDate}>
      <div>Tổng tiền phụ phí : </div>
      <div style={{ color: "var(--mauPhu1--", fontWeight: "bold" }}>
        {formatMoney(totalPlusWage)} đ
      </div>
    </div>
  );

  //Xử lý side effect truyền giá trị tổng tiền phụ phí lên comp chính
  useEffect(() => {
    props.getTotalPlusWage(totalPlusWage);
  }, [arrPhuPhi]);

  return (
    <section className={classes.overall}>
      <h3>
        Bổ sung phụ phí tháng :{" "}
        <span style={{ color: "var(--mauPhu1--" }}>
          {monthYear.month} / {monthYear.year}
        </span>
      </h3>
      <form onSubmit={addPlusWageHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="ngay-phu-phi">Ngày</label>
          <input ref={dateRef} required type="date" id="ngay-phu-phi" />
          <label htmlFor="tien-phu-phi">Phí</label>
          <input
            style={{ width: "110px" }}
            ref={plusWageRef}
            min="0"
            step="1000"
            required
            type="number"
            id="tien-phu-phi"
          />
          <button type="submit" className="btn-sm btn-sm-sub">
            Thêm
          </button>
        </div>
        <div className={classes.control}>
          <textarea
            ref={desRef}
            rows="3"
            cols="43"
            required
            placeholder="Thêm ghi chú"
          />
        </div>
        {/* Khu render ra kết quả ngày phu pí */}
        {renderPlusWageDates}
        {renderTotalRow}
      </form>
    </section>
  );
};

export default ThongKePhuPhi;
