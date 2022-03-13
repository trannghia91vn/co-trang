import classes from "./NgayDiemDanh.module.css";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { MdChildCare } from "react-icons/md";

const NgayDiemDanhItem = (props) => {
  //Des ra data cần thiết
  const { idGroupDate, taughtDate, taughtTime, arrLearnedStus } = props;
  //Tùy chỉnh lại biến phù hợp để render
  const renderDate = new Date(taughtDate).getDate();
  const renderArrStus = arrLearnedStus.map((stu) => (
    <div key={stu.id} className={classes.stu}>
      <MdChildCare style={{ marginRight: "5px" }} />
      {stu.name}
    </div>
  ));

  //Callback chính xử lý
  const editDateHandler = () => {
    props.showEditUi(idGroupDate);
  };
  const delDateHandler = () => {
    props.doDelSubmit(idGroupDate)
  };

  return (
    <div className={classes.item}>
      <div className={classes.date}>
        <BsFillCalendarCheckFill style={{ marginRight: "5px" }} />
        {renderDate}
      </div>
      <div className={classes.time}>
        <FaClock style={{ marginRight: "5px" }} />
        {taughtTime} phút
      </div>
      <div className={classes.stus}>{renderArrStus}</div>
      <div className={classes.actions}>
        <button
          type="button"
          className="btn-sm btn-sm-detail"
          onClick={editDateHandler}
        >
          Sửa
        </button>
        <button
          type="button"
          className="btn-sm btn-sm-delete"
          onClick={delDateHandler}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default NgayDiemDanhItem;
