import classes from "./DDCN.module.css";
import ChonHocSinh from "./ChonHocSinh";
import ChonNgayDDCN from "./ChonNgayDDCN";
import ChonGiaoVienCN from "./ChonGiaoVien";
import LichDiemDanh from "../lich-diem-danh/LichDiemDanh";
import LocNamThang from "../../UI/MonthYearPick/MonthYearPick";
import { useSelector, useDispatch } from "react-redux";
import { LoadingActions } from "../../../store/redux/loading/loading-slice";
import { useState } from "react";
import { getArrDiemDanhCaNhanNow } from "../../../support/diem-danh-ca-nhan/ddcn-uti";

const DiemDanhCaNhan = (props) => {
  const dispatchFn = useDispatch();
  //Lấy về giá trị tag đã được chọn chưa để cho phép render các trường thêm thông tin
  const isTagSelected = props.isTagSelected;
  //Dùng biến state quản lý render giao diện thêm mới data hoẵc sủa data
  const [isViewEditUi, changeViewEditUi] = useState(false);
  //Biên state quản lý nội bộ giá trị id ngày nhận được
  const [idDateTemp, changeIdDateTemp] = useState();

  //Submit -- ngày tháng và lọại điểm danh
  const [dateData, changeDateData] = useState({ date: null, actionType: null });
  //Sumit -- thông tin giáo viên cho ngày điểm danh
  const [teacherData, changeTeacherData] = useState([]);

  //Func xử lý chuyển giao diện chỉnh sửa data cho ngày
  const switchEditHandler = (idDate) => {
    changeIdDateTemp(idDate);
    //Chuyển giao diện chỉnh sửa
    changeViewEditUi(true);
  };
  //Func xử lý lấy data ngày từ giao diện chọn ngày chỉnh sửa
  const editDateDataTempHandler = (objData) => {
    changeDateData(objData);
  };
  //Func xử lý lấy data giáo viên từ giao diện sửa giáo viên
  const editTeaDataTempHandler = (arr) => {
    console.log(arr);
    changeTeacherData(arr);
  };
  //Func xử lý khi lọc năm tháng được bấm thì load lại giao diện thêm mới thông tin ngày điềm danh đê có giá trị mặc định cho input ngày
  const refreshAddUi = () => {
    changeViewEditUi(true);
    setTimeout(() => {
      changeViewEditUi(false);
    }, 100);
  };
  //Lấy thông tin mảng ngày điểm danh cá nhân
  const arrDiemDanhCaNhan = useSelector(
    (state) => state.ddcn.arrDiemDanhCaNhan
  );
  //Lọc lại arrDiemDanhCaNhanNow để chỉ lays data hiện tại
  const arrDiemDanhCaNhanNow = getArrDiemDanhCaNhanNow(arrDiemDanhCaNhan);
  //Xử lý lọc lại data từ mảng arrDiemDanhCaNhanNow với id ngày được click, data này được truyền xuống các gd chỉnh sửa đẻ làm default
  const objDateData = arrDiemDanhCaNhanNow.find((cv) => cv._id === idDateTemp);
  console.log(teacherData);
  //Func xử lý chính để submit thông tin ngày được chỉnh sửa
  const editDateDataHandler = () => {
    //Tổng hợp data submit cho edit ngày điểm danh
    const data = {
      idStu: props.isTagSelected ? props.isTagSelected.id : "",
      nameStu: props.isTagSelected ? props.isTagSelected.name : "",
      dateSingleCheck: dateData.date,
      typeSingleCheck: dateData.actionType,
      arrTeacherTaught: teacherData,
    };
    //Tổng hợp lịa data submit cuối
    const dataSubmit = {
      id: idDateTemp,
      data: data,
    };
    //Push loading
    dispatchFn(LoadingActions.activeLoading());
    //Chạy fetch put
    fetch("/api/diem-danh-ca-nhan", {
      method: "PUT",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        props.activeRefetch();
        changeViewEditUi(false);
        dispatchFn(LoadingActions.deactiveLoading());
      })
      .catch((error) => {
        changeViewEditUi(false), dispatchFn(LoadingActions.deactiveLoading());
      });
  };
  const cancelEditHandler = () => {
    changeViewEditUi(false);
  };

  return (
    <section className={classes.container}>
      <ChonHocSinh arrTags={props.arrTags} />

      {isTagSelected && (
        <label className={classes.note}>
          Không điền giá trị nếu muốn điểm danh tháng hiện tại.
          <br /> Điền giá trị nếu muốn điểm danh theo tháng năm cần.{" "}
        </label>
      )}
      {isTagSelected && (
        <LocNamThang
          getMonthYear={props.getMonthYear}
          refresh={refreshAddUi}
        />
      )}

      <div className={classes.editForm}>
        {isTagSelected && !isViewEditUi && (
          <ChonNgayDDCN
            getDateData={props.getDateData}
            objMonthYear={props.objMonthYear}
          />
        )}
        {isTagSelected && !isViewEditUi && !props.isDateOff && (
          <ChonGiaoVienCN getTeacherData={props.getTeacherData} />
        )}
        {isTagSelected && !isViewEditUi && (
          <div className={classes.actions}>
            <button
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-submit"
              onClick={props.diemDanh}
              disabled={props.isSumitAccess ? "" : "disabled"}
            >
              Cập nhật
            </button>
            <button
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-cancel"
              onClick={props.huyDiemDanh}
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {isTagSelected && (
        <LichDiemDanh
          dataDiemDanh={props.dataDiemDanh}
          editDate={switchEditHandler}
          activeRefetch={props.activeRefetch}
          objMonthYear={props.objMonthYear}
        />
      )}

      {/* Phần này là giao diện chỉnh sửa cho ngày */}
      <div className={classes.editForm}>
        {isTagSelected && isViewEditUi && (
          <ChonNgayDDCN
            defaultValue={objDateData}
            editDateData={editDateDataTempHandler}
          />
        )}

        {isTagSelected && isViewEditUi && dateData.actionType !== "nghi" && (
          <ChonGiaoVienCN
            defaultValue={objDateData}
            editTeacherData={editTeaDataTempHandler}
          />
        )}
        {isTagSelected && isViewEditUi && (
          <div className={classes.actions}>
            <button
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-submit"
              onClick={editDateDataHandler}
            >
              Sửa
            </button>
            <button
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-cancel"
              onClick={cancelEditHandler}
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiemDanhCaNhan;
