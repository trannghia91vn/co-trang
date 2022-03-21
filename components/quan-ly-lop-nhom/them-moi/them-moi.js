import classes from "./them-moi.module.css";
import ListTag from "../../UI/ListTag/ListTag";
import { useRef, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { QlhsActions } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import Loading from "../../UI/Loading/Loading";

const ThemMoiLopNhom = (props) => {
  const dispatchFn = useDispatch();
  //tạo một biến loading nội bộ để render loading khi fetch post
  const [loading, changeLoading] = useState(false);
  //Callback kích hoạt loading
  const onLoadingHandler = () => {
    changeLoading(true);
  };
  const offLoadingHandler = () => {
    changeLoading(false);
  };
  //Lấy về mảng tag được chọn
  const arrGroupSelectedStus = props.arrGroupSelectedStus;
  //Biên lấy tên lớp nhóm
  const nameClassRef = useRef();
  //Clear functino
  const clearInput = () => {
    nameClassRef.current.value = "";
    dispatchFn(QlhsActions.clearStuTag());
  };
  //Callback chính
  const addGroupClassHandler = (e) => {
    e.preventDefault();
    //Tổng hợp data fetch
    const dataSubmit = {
      nameClass: nameClassRef.current.value,
      arrTags: arrGroupSelectedStus,
    };
    onLoadingHandler();
    //Fetch lên api
    fetch("/api/quan-ly-lop-nhom", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json(), offLoadingHandler())
      .then((data) => console.log(data), offLoadingHandler());
    clearInput();
  };
  const cancelAddClassHandler = () => {
    clearInput();
  };
  return (
    <Fragment>
      {loading && <Loading />}
      <section className={classes.container}>
        <h3>Thêm mới lớp nhóm </h3>
        <form onSubmit={addGroupClassHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="name">Đặt tên lớp nhóm</label>
              <input
                ref={nameClassRef}
                id="name"
                type="text"
                minLength="1"
                required
              />
            </div>
            <div className={classes.tags}>
              <label>Chọn học sinh cho lóp nhóm</label>
              <ListTag
                arrTags={props.arrGroupStus}
                isStudent={true}
                isTeacher={false}
              />
            </div>
          </div>
          <div className={classes.actions}>
            <button className="btn btn-submit" type="submit">
              Thêm mới
            </button>
            <button
              className="btn btn-cancel"
              type="button"
              onClick={cancelAddClassHandler}
            >
              Hủy thêm
            </button>
          </div>
        </form>
      </section>{" "}
    </Fragment>
  );
};

export default ThemMoiLopNhom;
