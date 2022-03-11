import { Fragment, useEffect, useState, useRef, useReducer } from "react";
import classes from "./ChonGiaoVien.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetArrTeacher } from "../../../store/redux/quan-ly-giao-vien/qlgv-slice";
import { getTeaNameById } from "../../../support/diem-danh-ca-nhan/ddcn-uti";
//Func reducer
const reducerFn = (preState, action) => {
  if (action.type === "ADD") {
    //Lấy về mảng trước đó
    const arrTeacherDataExist = [...preState];
    //Tìm kiếm xem data được thêm vào đã tồn tại chưa
    const objMatched = arrTeacherDataExist.find(
      (cv) => cv.idTea === action.idTea
    );
    //Nếu có thì update, nếu chứa thì push vào
    if (objMatched) {
      objMatched.teachedTime = action.teachedTime;
      return arrTeacherDataExist;
    } else {
      arrTeacherDataExist.push({
        idTea: action.idTea,
        teachedTime: action.teachedTime,
      });
      return arrTeacherDataExist;
    }
  }
  if (action.type === "DEL") {
    console.log(action.idTea);
    console.log(preState);
    //Lấy về mảng trước đó
    const arrTeacherDataExist = [...preState];
    //TÌm kiếm data tồn tại để xóa
    const indexObjMatched = arrTeacherDataExist.findIndex(
      (cv) => cv.idTea === action.idTea
    );
    //Có thì xóa ,không thì trả lại
    if (indexObjMatched !== -1) {
      arrTeacherDataExist.splice(indexObjMatched, 1);
      return arrTeacherDataExist;
    } else {
      return arrTeacherDataExist;
    }
  }
  if (action.type === "REPLACE") {
    return action.data;
  }
  return preState;
};
//Comp chính
const ChonGiaoVienCN = (props) => {
  const dispatchFn = useDispatch();
  //Biến state quản lý giá trị giáo viên và giờ dạy
  const [teacher, changeTeacher] = useState("none");
  const [refresh, changeRefresh] = useState(false);
  const teachedTime = useRef();
  //Biến sate quản lý mảng giáo viên được chọn cho ngày dạy
  const [arrTeacherData, dispatchTeaData] = useReducer(reducerFn, []);
  //Lấy về mảng teacher để map vào chọn giáo viên
  const arrTeachers = useSelector((state) => state.qlgv.arrTeachers);
  //Lọc về mảng giáo viên với hai props cần là tên và idTea
  const arrTeachersRemake = arrTeachers.map((tea) => {
    return { id: tea._id, name: tea.name };
  });
  const arrTeachersRemakeWithNone = [
    { id: "none", name: "none" },
    ...arrTeachersRemake,
  ];
  //Tạo biến render option cho select giáo viền
  const renderTeasOptions = arrTeachersRemakeWithNone.map((tea) => (
    <option key={tea.id} value={tea.id}>
      {tea.name}
    </option>
  ));
  //Callback lấy giá trị giờ dạy
  const getQuickTeachedTime = (value) => {
    // changeTeachedTime(value);
    document.getElementById("hour-teach").value = value;
  };
  //Callback lấy giá trị giáo viên
  const getTeacher = (event) => {
    changeTeacher(event.target.value);
  };
  //Sử lý side efffect getch get mảng teacher về khi load comp này
  useEffect(() => {
    dispatchFn(fetchGetArrTeacher());
  }, []);
  //Xử lý lấy danh sách default giáo viên đã tồn tại khi được edit
  useEffect(() => {
    if (props.defaultValue) {
      dispatchTeaData({
        type: "REPLACE",
        data: props.defaultValue.arrTeacherTaught,
      });
    }
  }, []);
  //Func chinhs xử lý thêm thông tin giáo viên lên comp chính
  const addTeacherDataHandler = (e) => {
    e.preventDefault();
    const teachedTimeVal = +teachedTime.current.value;
    dispatchTeaData({
      type: "ADD",
      idTea: teacher,
      teachedTime: teachedTimeVal,
    });
    // if (props.getTeacherData) {
    //   props.getTeacherData(arrTeacherData);
    // }
    // if (props.editTeacherData) {
    //   props.editTeacherData(arrTeacherData)
    // }
    changeRefresh(!refresh);
  };
  //Func xóa giáo viên tạm thời
  const delTempTeaHandler = () => {
    dispatchTeaData({
      type: "DEL",
      idTea: teacher,
    });
    changeRefresh(!refresh);
    // if (props.getTeacherData) {
    //   props.getTeacherData(arrTeacherData);
    // }
    // if (props.editTeacherData) {
    //   props.editTeacherData(arrTeacherData)
    // }
  };
  useEffect(() => {
    if (props.getTeacherData) {
      props.getTeacherData(arrTeacherData);
    }
    if (props.editTeacherData) {
      props.editTeacherData(arrTeacherData);
    }
  }, [arrTeacherData]);
  //Tạo biến render tạm giáo viên được chọn data
  const renderSubNoti = arrTeacherData.map((cv) => (
    <div key={cv.idTea} className={classes.noti}>
      {getTeaNameById(arrTeachers, cv.idTea)} - {cv.teachedTime} phút
    </div>
  ));
  return (
    <Fragment>
      <h3
        style={{
          margin: ".5rem 0",
          fontWeight: "normal",
          color: `var(--mauTieuDe--)`,
        }}
      >
        Chọn giáo viên
      </h3>

      <form onSubmit={addTeacherDataHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="gv-select">Chọn giáo viên:</label>
          <select id="gv-select" onChange={getTeacher} defaultValue="none">
            {renderTeasOptions}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="hour-teach">Giờ dạy (phút)</label>
          <input ref={teachedTime} id="hour-teach" type="number" required />
          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 30)}
          >
            30
          </div>
          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 45)}
          >
            45
          </div>
          <div
            className={classes.btnTime}
            onClick={getQuickTeachedTime.bind(0, 60)}
          >
            60
          </div>
          <button
            style={{ marginLeft: "20px", fontSize: "1rem" }}
            type="submit"
            className="btn-sm btn-sm-detail"
          >
            Thêm
          </button>
          <button
            type="button"
            style={{ fontSize: "1rem" }}
            className="btn btn-cancel"
            onClick={delTempTeaHandler}
          >
            Xóa
          </button>
        </div>
      </form>
      {arrTeacherData.length > 0 && (
        <div className={classes.notis}>{renderSubNoti}</div>
      )}
    </Fragment>
  );
};

export default ChonGiaoVienCN;
