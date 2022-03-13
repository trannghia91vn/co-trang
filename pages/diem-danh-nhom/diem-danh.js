import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import DiemDanhNhom from "../../components/diem-danh-nhom/diem-danh/DDN";
import Loading from "../../components/UI/Loading/Loading";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchGetArrTeacher } from "../../store/redux/quan-ly-giao-vien/qlgv-slice";
import {
  fetchGetStudentData,
  getStusDataAndCreateArrTags,
} from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import { fetchGetArrLopNhom } from "../../store/redux/quan-ly-lop-nhom/qlln-slice";
import { fetchGetArrDiemDanhNhom } from "../../store/redux/diem-danh-nhom/ddn-slice";
import { LoadingActions } from "../../store/redux/loading/loading-slice";

const TrangThemDiemDanhNhom = (props) => {
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    {
      label: "Điểm danh học sinh nhóm",
      slug: "diem-danh-nhom",
      isActive: false,
    },
    {
      label: "Thêm thông tin điểm danh",
      slug: "diem-danh-nhom/diem-danh",
      isActive: true,
    },
  ];

  // ---------------- KHU THIẾT LẬP BIẾN ----------------
  const dispatchFn = useDispatch();
  const router = useRouter();
  //Biến state kích hoạt fetch get lại mảng giáo viên khi cần làm mới data
  const [refetch, doRefetch] = useState(false);
  //Biến state lưu trường giá trị ngày giờ dạy nhóm để submit
  const [dateTimeGroup, changeDateTimeGroup] = useState({ date: "", time: 0 });
  //Biến state lưu giá trị tháng / năm để lọc lại data theo tháng
  const [monthYear, changeMonthYear] = useState({ month: "", year: "" });
  //Biến state cho phép nút cập nhật được bấm
  const [isDisableSubmitBtn, changeDisableSubmitBtn] = useState(true);
  //Biến state quản lý id ngày được click để sửa
  const [idDateTemp, changeIdDateTemp] = useState("");

  // ---------------- KHU LẤY VỀ GIÁ TRỊ BIẾN SỬ DỤNG ----------------
  //Lấy vè mảng tag giáo viên để truỳen xuống render mảng tag chọn giáo viên
  const arrTeacherTags = useSelector((state) => state.qlgv.arrTeacherTags);
  //Lọc lại tag giáo viên được chọn để truyền xuống dùng
  const tagTeaSelected = arrTeacherTags.find((tag) => tag.isSelected);
  //Lấy về mảng tag học sinh để truyền xuống render mảng tag chọn học sinh cho lớp nhóm
  const arrStudentTagsGot = useSelector((state) => state.qlhs.arrStudentTags);
  //Lọc lịa mảng học sinh nhóm tag
  const arrStudentTags = arrStudentTagsGot.filter((cv) => cv.groupClass);
  //Lọc lại mảng tag học sinh được chọn đê dùng cho submit lên db
  const arrSelectedStuTags = arrStudentTags.filter((tag) => tag.isSelected);
  //Lấy về mảng lớp nhóm để tạo options chọn nhanh học sinh nhóm
  const arrLopNhom = useSelector((state) => state.qlln.arrLopNhom);
  //Lấy về mảng điểm danh nhóm dùng cho comp render ra thông tin ngày điểm dánh nhóm
  const arrDiemDanhNhom = useSelector((state) => state.ddn.arrDiemDanhNhom);
  //Lấy về biến isLoading
  const isLoading = useSelector((state) => state.loading.isLoading);

  // ---------------- KHU CALLBACKS ----------------
  //Xử lý reload lại trang khi bấm nút hủy từ comp bên dưới
  const reloadPageHandler = () => {
    router.reload();
  };
  //Xử lý truyền giá trị ngày giờ từ comp ChonNgayGio lên
  const getDateTimeHandler = (obj) => {
    changeDateTimeGroup(obj);
  };
  //Xử lý lấy giá trị lọc month year từ comp chọn ngày thangs filtẻ bên dưới
  const getMonthYearHandler = (obj) => {
    changeMonthYear(obj);
  };
  //Xử lý lấy id ngày được click để sửa
  const getIdDateTemp = (id) => {
    changeIdDateTemp(id);
  };
  //SUBMIT THÊM MỚI NGÀY ĐIỂM DANH NHÓM
  const addGroupDateHandler = () => {
    //Tổng hợp lại data submit lên db
    const dataSubmit = {
      idTea: tagTeaSelected.id,
      nameTea: tagTeaSelected.name,
      taughtDate: dateTimeGroup.date,
      taughtTime: dateTimeGroup.time,
      arrLearnedStus: arrSelectedStuTags,
    };
    dispatchFn(LoadingActions.activeLoading());
    //Chạy fetch post ngày điềm danh nhóm
    fetch("/api/diem-danh-nhom", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => dispatchFn(LoadingActions.deactiveLoading()))
      .catch((error) => dispatchFn(LoadingActions.deactiveLoading()));
    //Reload lại trang
    reloadPageHandler();
  };
  //SUBMIT SỬA NGÀY ĐIỀM DANH NHÓM
  const editGroupDateHandler = () => {
    //Tổng hợp lại data submit lên db
    const data = {
      idTea: tagTeaSelected.id,
      nameTea: tagTeaSelected.name,
      taughtDate: dateTimeGroup.date,
      taughtTime: dateTimeGroup.time,
      arrLearnedStus: arrSelectedStuTags,
    };
    //Data mới này cần có thêm id của ngày được sửa
    const dataSubmit = {
      id: idDateTemp,
      data: data,
    };
    //Chạy fetch put
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/diem-danh-nhom", {
      method: "PUT",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((res) => {
        dispatchFn(LoadingActions.deactiveLoading()), reloadPageHandler();
      })
      .catch((error) => {
        dispatchFn(LoadingActions.deactiveLoading()), reloadPageHandler();
      });
    //Reload lại trang để cập nhật data
  };
  //SUBMIT XÓA NGÀY ĐIỀM DANH
  const delGroupDateHandler = (id) => {
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/diem-danh-nhom", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatchFn(LoadingActions.deactiveLoading()), reloadPageHandler();
      })
      .catch((error) => {
        dispatchFn(LoadingActions.deactiveLoading()), reloadPageHandler();
      });
  };

  // ---------------- KHU XỬ LÝ SIDE EFFECT ----------------
  ///Xử lý side effect chính load về từ db mảng giáo viên và tự tạo mảng giáo viên tag
  useEffect(() => {
    //Get lại mảng giáo viên khi load trang này (gồm mảng gv và mảng tag gv tích hợp)
    dispatchFn(fetchGetArrTeacher());
    //Get lại mảng tag giáo viên (không có mảng giáo viên)
    dispatchFn(getStusDataAndCreateArrTags());
    //Get lại mảng lớp nhóm để chọn nhanh học sinh nhóm
    dispatchFn(fetchGetArrLopNhom());
    //Get lại mảng điềm danh nhóm để truyền xuống render điểm danh nhóm cho thang
    dispatchFn(fetchGetArrDiemDanhNhom());
  }, [refetch]);
  //Xử lý side effect xet điều kiện xem nút submit có được bấm hany không
  useEffect(() => {
    if (
      arrSelectedStuTags.length > 0 &&
      dateTimeGroup.date !== "" &&
      dateTimeGroup.time > 0
    ) {
      changeDisableSubmitBtn(false);
    } else {
      changeDisableSubmitBtn(true);
    }
  }, [arrSelectedStuTags, dateTimeGroup]);

  // ---------------- KHU THIÉT LẬP BIẾN RENDER CUỐI ----------------

  return (
    <Fragment>
      {isLoading && <Loading />}
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <DiemDanhNhom
        arrTeaTags={arrTeacherTags}
        arrStuTags={arrStudentTags}
        teaSelected={tagTeaSelected}
        disSubmitBtn={isDisableSubmitBtn}
        arrLopNhom={arrLopNhom}
        monthYearFilter={monthYear}
        arrDDN={arrDiemDanhNhom}
        doReload={reloadPageHandler}
        doAddSubmit={addGroupDateHandler}
        doEditSubmit={editGroupDateHandler}
        doDelSubmit={delGroupDateHandler}
        getDateTimeData={getDateTimeHandler}
        getMonthYear={getMonthYearHandler}
        getIdDateTemp={getIdDateTemp}
      />
    </Fragment>
  );
};
export default TrangThemDiemDanhNhom;
