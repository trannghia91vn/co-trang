import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import HocPhiHocSinh from "../../components/hoc-phi-hoc-snh/HocPhiHocSinh";
import Loading from "../../components/UI/Loading/Loading";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetStudentData,
  getStusDataAndCreateArrTags,
} from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import { LichActions } from "../../store/redux/lich/lich-slice";

const TrangTinhPhiThangMoiHocSinh = (props) => {
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Học phí học sinh", slug: "hoc-phi-hoc-sinh", isActive: false },
    {
      label: "Tính phí tháng mới",
      slug: "hoc-phi-hoc-sinh/tinh-phi-thang-moi",
      isActive: true,
    },
  ];

  //------------ KHU TẠO BIẾN ------------
  const dispatchFn = useDispatch();
  //Tạo biến mặc định cho tháng năm luôn trước một tháng
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  let nowYear = now.getFullYear();
  const nextMonth = nowMonth + 1;
  if (nextMonth > 12) {
    nowYear = nowYear + 1;
  }

  //Biến lưu tạm thời giá trị ngày tháng lấy từ comp filter
  const [monthYearFilter, changeMonthYearFilter] = useState({
    month: nextMonth,
    year: nowYear,
  });

  //------------ KHU LẤY DATA VỀ VÀ XỬ LÝ DATA ------------
  //Lấy về mảng tags học sinh dùng cho comp lựa chọn học sinh tính tiền
  const arrStudentTags = useSelector((state) => state.qlhs.arrStudentTags);
  //Lọc lại chỉ lấy danh sách học sinh cá nhân thôi vì hs nhóm không cần tính tiền (để tự con vợ lo)
  const arrSingleStuTags = arrStudentTags.filter((tag) => tag.singleClass);
  //Lấy về biến isLoading
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Xử lý tag data học sinh được chọn
  const stuSelected = arrSingleStuTags.find((tag) => tag.isSelected);
  //Lấy về mảng lịch tiến hành tính toán số buổi học tổng của học sinh
  const arrLich = useSelector(state=>state.lich.arrLich)
  console.log(arrLich)

  //------------ KHU CALLBACK------------
  //Callback lấy và lưu tạm gái trị month year filter
  const changeMonthYearFilterHandler = (obj) => {
    changeMonthYearFilter(obj);
  };
  //------------ KHU XỬ LÝ SIDE EFFECT ------------
  useEffect(() => {
    //Xử lý get data học sinh và tạo mảng học sinh
    dispatchFn(fetchGetStudentData());
    dispatchFn(getStusDataAndCreateArrTags());
    //Xử lý load lần đầu thì tạo arrLich để dùng cho comp chọn ngày
    dispatchFn(LichActions.createInitCalendar());
  }, []);
  //------------ KHU XỬ LÝ PHỤ ------------
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading />}
      <HocPhiHocSinh
        stuSelected={stuSelected}
        arrStudentTags={arrSingleStuTags}
        monthYearFilter={monthYearFilter}
        getMonthYearFilter={changeMonthYearFilterHandler}
      />
    </Fragment>
  );
};
export default TrangTinhPhiThangMoiHocSinh;
