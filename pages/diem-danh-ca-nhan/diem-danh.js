import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import DiemDanhCaNhan from "../../components/diem-danh-ca-nhan/diem-danh/DDCN";
import Loading from "../../components/UI/Loading/Loading";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStusDataAndCreateArrTags } from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import { fetchGetArrDiemDanhCaNhan } from "../../store/redux/diem-danh-ca-nhan/ddcn-slice";
import { useRouter } from "next/router";
import { getArrDiemDanhCaNhanByStuAndMonthYear } from "../../support/diem-danh-ca-nhan/ddcn-uti";

const TrangThemDiemDanhCaNhan = (props) => {
  const dispatchFn = useDispatch();
  const router = useRouter();
  //Tạo biến năm tháng hiện tại
  const now = new Date();
  const nowMonth = +now.getMonth();
  const nowYear = +now.getFullYear();

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
  //Submit -- ngày tháng và lọại điểm danh
  const [dateData, changeDateData] = useState({ date: null, actionType: null });
  //Sumit -- thông tin giáo viên cho ngày điểm danh
  const [teacherData, changeTeacherData] = useState([]);
  //Biến state quản lý lọc ngày tháng
  const [objMonthYear, changeObjMonthYear] = useState({ month: "", year: "" });
  //Biến state quyết định cho phép bấm nút cập nhật hay không
  const [submitAccess, changeSubmitAccess] = useState(false);
  //Biến state nếu là ngày nghỉ thì không cần render thêm thông tin giáo viên
  const [isDateOff, changeIsDateOff] = useState(false);
  //Biến state nội bộ render Loading cho send post request
  const [isLoading, changeIsLoading] = useState(null);
  //Biến state nộ bộ thực hiện fetch lại data khi cần
  const [isRefetch, changeIsRefetch] = useState(false);
  //Biến state quan sát thay đổi tag student
  const [isChangeTagStuSelected, changeTagStuSelected] = useState(false);
  useEffect(() => {
    //Kiểm tra submitAccess
    if (
      (dateData.date &&
        dateData.actionType !== "nghi" &&
        teacherData.length > 0) ||
      (dateData.actionType === "nghi" && dateData.date)
    ) {
      changeSubmitAccess(true);
    } else {
      changeSubmitAccess(false);
    }
    //Kiểm tra ngày nghỉ
    if (dateData.actionType === "nghi") {
      changeIsDateOff(true);
    } else {
      changeIsDateOff(false);
    }
  }, [dateData, teacherData, dateData.actionType]);

  //Lấy về mảng điểm danh cá nhân từ redux
  const arrDiemDanhCaNhan = useSelector(
    (state) => state.ddcn.arrDiemDanhCaNhan
  );
  //Lấy về mảng tags hs cá nhân từ redux
  const arrStusTags = useSelector((state) => state.qlhs.arrStudentTags);
  //Lọc lại mảng tags cá nâhn
  const arrSingleStusTags = arrStusTags.filter((tag) => tag.singleClass);

  //Func truyền dateData ngược lên từ props
  const getDateData = (data) => {
    changeDateData(data);
  };
  //Func truyền teacherData ngườc từ props lên
  const getTeacherData = (data) => {
    changeTeacherData(data);
  };
  //Func thay đổi đối tượng tháng năm từ props truyền lên
  const changeMonthYearFilterHandler = (objMonthYear) => {
    changeObjMonthYear(objMonthYear);
  };
  //Submit -- Lấy gía trị tag được chọn
  const tagStuSelected = arrSingleStusTags.find((tag) => tag.isSelected);

  //Xử lý load trang thì fetch và tạo mảng tags học sinh cho việc chọn điểm danh, đồng thời fetch get mảng điểm danh để load phần ngày điêm danh đã có của học sinh
  useEffect(() => {
    dispatchFn(getStusDataAndCreateArrTags());
    dispatchFn(fetchGetArrDiemDanhCaNhan());
  }, [isRefetch]);

  //Lọc lại data điểm danh đã tồn tại trên redux của học sinh được chọn
  let dataDiemDanh = [];
  //Xử lý nếu không lọc năm tháng thì trả về hiện tại và có lọc năm tháng thì trả về tương ứng
  if (tagStuSelected && objMonthYear.month === "" && objMonthYear.year === "") {
    dataDiemDanh = getArrDiemDanhCaNhanByStuAndMonthYear(
      arrDiemDanhCaNhan,
      tagStuSelected.id,
      nowMonth,
      nowYear
    );
  } else if (
    tagStuSelected &&
    objMonthYear.month > 0 &&
    objMonthYear.year > 0
  ) {
    dataDiemDanh = getArrDiemDanhCaNhanByStuAndMonthYear(
      arrDiemDanhCaNhan,
      tagStuSelected.id,
      objMonthYear.month - 1,
      objMonthYear.year
    );
  }
  //Tổng hợp data submit fetch lên đê thêm data cho ngày được điểm danh
  const dataSubmit = {
    idStu: tagStuSelected ? tagStuSelected.id : "",
    nameStu: tagStuSelected ? tagStuSelected.name : "",
    arrTeacherTaught: teacherData,
    dateSingleCheck: dateData.date,
    typeSingleCheck: dateData.actionType,
  };

  //Callback chính xử lý submit thông tin điểm danh
  const diemDanhHandler = () => {
    changeIsLoading(true);
    // Chạy fetch post lưu ngày điểm danh
    fetch("/api/diem-danh-ca-nhan", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        changeIsLoading(false);
      })
      .catch((error) => {
        changeIsLoading(false), router.reload();
      });
    //Chạy refetch lại data đẻ lấy được data mơi nhất từ db sau khi thêm mới ngày điẻm danh
    changeIsRefetch(!isRefetch);
  };

  const huyDiemDanhHandler = () => {
    //Tiến hành reload lại trang khi hủy
    router.reload();
  };

  //Calback kích hoạt refetch get lại
  const refetchGetHandler = () => {
    changeIsRefetch(!isRefetch);
  };

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading />}
      {!isLoading && (
        <DiemDanhCaNhan
          arrTags={arrSingleStusTags}
          getDateData={getDateData}
          getTeacherData={getTeacherData}
          diemDanh={diemDanhHandler}
          huyDiemDanh={huyDiemDanhHandler}
          isTagSelected={tagStuSelected}
          isSumitAccess={submitAccess}
          isDateOff={isDateOff}
          dataDiemDanh={dataDiemDanh}
          dateData={dateData}
          teacherData={teacherData}
          activeRefetch={refetchGetHandler}
          getMonthYear={changeMonthYearFilterHandler}
          objMonthYear={objMonthYear}
        />
      )}
    </Fragment>
  );
};
export default TrangThemDiemDanhCaNhan;
