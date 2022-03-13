import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import DiemDanhCaNhan from "../../components/diem-danh-ca-nhan/diem-danh/DDCN";
import Loading from "../../components/UI/Loading/Loading";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchGetStudentData,
  getStusDataAndCreateArrTags,
} from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import { fetchGetArrTeacher } from "../../store/redux/quan-ly-giao-vien/qlgv-slice";
import { fetchGetArrDiemDanhCaNhan } from "../../store/redux/diem-danh-ca-nhan/ddcn-slice";
import { LoadingActions } from "../../store/redux/loading/loading-slice";

const TrangThemDiemDanhCaNhan = (props) => {
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    {
      label: "Điểm danh học sinh cá nhân",
      slug: "diem-danh-ca-nhan",
      isActive: false,
    },
    {
      label: "Thêm thông tin điểm danh",
      slug: "diem-danh-ca-nhan/diem-danh",
      isActive: true,
    },
  ];

  //------------ KHU VỤC THIẾT LẬP BIẾN ------------
  const dispatchFn = useDispatch();
  const router = useRouter();
  //Thiết lập biến chứa ngày tháng được lọc
  const [monthYearFilter, changeMonthYearFilter] = useState({
    month: "",
    year: "",
  });
  //Biến tạm thời chứa thông tin ngày tháng, loại hành động điềm danh lấy từ comp thêm mới ngày điẻm danh
  const [dateTypeData, changeDateTypeData] = useState({
    date: "",
    type: "",
  });
  //Biến tạm thời chứa thông tin giáo viên cho ngày điểm danh dạng ARR
  const [teacherTaughtData, changeTeacherTaughtData] = useState([]);
  //Biến tạm thời trạng thái cho phép ấn nút cạp nhật hay không
  const [disUpdateBtn, changeDisUpdateBtn] = useState(true);
  //Biến tạm thời chứa id ngày điềm danh được click khi sửa
  const [idDateTemp, changeIdDateTemp] = useState("");

  //------------ KHU VỤC LẤY VỀ DATA VÀ XỬ LÝ ĐÊ DÙNG ------------
  //Lấy về mảng arrDiemDanhCaNhan để render Lịch điểm danh
  const arrDiemDanhCaNhan = useSelector(
    (state) => state.ddcn.arrDiemDanhCaNhan
  );
  //Lấy về biến quyết định render loading
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Lấy về mảng tag học sinh để truỳen xuống comp dưới cho việc chọn hs để điểm danh
  const arrStudentTags = useSelector((state) => state.qlhs.arrStudentTags);
  //Lóc lại mảng học sinh cá nhân dùng thôi
  const arrSingleStuTags = arrStudentTags.filter((cv) => cv.singleClass);
  //DATA-DÙNG-SUBMIT Từ mảng tags học sinh, lọc ra học sinh được chọn theo id
  const stuSelected = arrSingleStuTags.find((tag) => tag.isSelected);

  //------------ KHU VỤC CALLBACKS ------------
  //Thay đổi idDate tạm thời dùng để load data default cho giao diện sửa
  const changeIdDateTempHandler = (id) => {
    changeIdDateTemp(id);
  };
  //Thay đổi đối tượng month year filter từ comp dưới
  const changeMonthYearFilterHandler = (obj) => {
    changeMonthYearFilter(obj);
  };
  //Lấy giá trị ngày tháng và loại hành động từ comp lấy data ngày điềm danh mới
  const changeDateTypeHandler = (obj) => {
    changeDateTypeData(obj);
  };
  //Lấy mảng giá trị giáo viên dạy trong ngày được điểm danh
  const changeTeacherTaughtHandler = (arr) => {
    changeTeacherTaughtData(arr);
  };
  //Chạy reload lại trang khi hoàn thành một thao tác nào đó bên dưới
  const reloadPage = () => {
    router.reload();
  };
  //SUBMIT Post request thêm ngày điêm danh mới
  const addDateSingleCheckHandler = () => {
    //Tổng hợp data tiến hành post request
    const dataSubmit = {
      idStu: stuSelected.id,
      nameStu: stuSelected.name,
      dateSingleCheck: dateTypeData.date,
      typeSingleCheck: dateTypeData.type,
      arrTeacherTaught: teacherTaughtData,
    };
    //Chạy submit
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/diem-danh-ca-nhan", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      })
      .catch((error) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      });
  };
  //SUBMIT edit request sửa ngày điểm danh
  const editDateSingleCheckHandler = () => {
    //Tổng hợp lại data submit
    const data = {
      idStu: stuSelected.id,
      nameStu: stuSelected.name,
      dateSingleCheck: dateTypeData.date,
      typeSingleCheck: dateTypeData.type,
      arrTeacherTaught: teacherTaughtData,
    };
    const dataSubmit = {
      id: idDateTemp,
      data: data,
    };
    //Chạy submit
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/diem-danh-ca-nhan", {
      method: "PUT",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      })
      .catch((error) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      });
  };
  //SUBMIT del request xóa ngày điểm danh
  const delDateSingleCheckHandler = (id) => {
    //Chạy submit
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/diem-danh-ca-nhan", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      })
      .catch((error) => {
        dispatchFn(LoadingActions.deactiveLoading());
        reloadPage();
      });
  };

  //------------ KHU VỤC SIDE EFFECT ------------
  //Xử lý load lại data để cạp nhật đúng data dùng trong app
  useEffect(() => {
    //Đầu tiên là get về mảng học sinh
    dispatchFn(fetchGetStudentData());
    //Tiếp đến là chuyển hóa mảng học sinh thành mảng hs tags
    dispatchFn(getStusDataAndCreateArrTags());
    //Get về mảng giáo viên để tạo danh sách giáo viên cho giao diện chọn giáo vien
    dispatchFn(fetchGetArrTeacher());
    //Get về mảng điểm danh cá nhân để có data render cho Lịch điểm danh
    dispatchFn(fetchGetArrDiemDanhCaNhan());
  }, []);
  //Xử lý kiểm tra xem nút cập nhật có được bấm hay không
  useEffect(() => {
    if (
      dateTypeData.date !== "" &&
      dateTypeData.type !== "" &&
      teacherTaughtData.length > 0
    ) {
      changeDisUpdateBtn(false);
    } else {
      changeDisUpdateBtn(true);
    }
  }, [dateTypeData, teacherTaughtData]);

  //------------ KHU VỤC XỬ LÝ PHỤ ------------

  //Xử lý lấy về giá trị mặc định cho giao diện chỉnh sửa
  let dateTypeDefault = { date: "", type: "" };
  let arrTeacherTaughtDefault = [];
  //Clone lại arrDiemDanh cho chắc
  const arrDiemDanhCN = [...arrDiemDanhCaNhan];
  //Lọc lại đối tượng ngày điểm danh theo id
  const result = arrDiemDanhCN.find((cv) => cv._id === idDateTemp);
  if (result) {
    dateTypeDefault.date = result.dateSingleCheck;
    dateTypeDefault.type = result.typeSingleCheck;
    arrTeacherTaughtDefault = result.arrTeacherTaught;
  }

  ////////////////////////////////////
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading />}
      <DiemDanhCaNhan
        arrStudentTags={arrSingleStuTags}
        arrDiemDanhCaNhan={arrDiemDanhCaNhan}
        stuSelected={stuSelected}
        monthYearFilter={monthYearFilter}
        dateType={dateTypeData}
        disUpdateBtn={disUpdateBtn}
        idDateTemp={idDateTemp}
        dateTypeDefault={dateTypeDefault}
        arrTeacherTaughtDefault={arrTeacherTaughtDefault}
        getMonthYearFilter={changeMonthYearFilterHandler}
        getDateType={changeDateTypeHandler}
        getTeacherData={changeTeacherTaughtHandler}
        getIdDateTemp={changeIdDateTempHandler}
        doReload={reloadPage}
        doPostRequest={addDateSingleCheckHandler}
        doPutRequest={editDateSingleCheckHandler}
        doDelRequest={delDateSingleCheckHandler}
      />
    </Fragment>
  );
};
export default TrangThemDiemDanhCaNhan;
