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
import { useRouter } from "next/router";
import {
  countSingleGroupDates,
  calcMoneyMonthStu,
} from "../../support/hoc-phi-hoc-sinh/hphs-uti";
import { LoadingActions } from "../../store/redux/loading/loading-slice";
import { fetchGetArrHocPhiHocSinh } from "../../store/redux/hoc-phi-hoc-sinh/hphs-slice";
import { fetchGetArrDiemDanhCaNhan } from "../../store/redux/diem-danh-ca-nhan/ddcn-slice";

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
  const router = useRouter();
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
  //Biến nội bộ quan sát nếu đổi chọn học sinh thì relaod lại giao diện
  const [refresh, changeRefresh] = useState(false);
  //Lấy về mảng học sinh dùng lấy thông tin học phí của học sinh
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  //Lấy về mảng học phí tháng học sinh từ redux đẻ render kết quả
  const arrHocPhiHocSinh = useSelector((state) => state.hphs.arrHocPhiHocSinh);
  //Lọc lại chỉ lấy danh sách học sinh cá nhân thôi vì hs nhóm không cần tính tiền (để tự con vợ lo)
  const arrSingleStuTags = arrStudentTags.filter((tag) => tag.singleClass);
  //Xử lý tag data học sinh được chọn
  const stuSelected = arrSingleStuTags.find((tag) => tag.isSelected);
  let idStu = null;
  if (stuSelected) {
    idStu = stuSelected.id;
  }
  //Lấy về mảng điểm dánh cá nhân để lấy thông tin ngày nghỉ/ bù/tăng của tháng trước
  const arrDiemDanhCaNhan = useSelector(
    (state) => state.ddcn.arrDiemDanhCaNhan
  );
  //Lọc lại mảng điẻm danh cá nhân tháng trước
  const arrDiemDanhCaNhanThangTruoc = arrDiemDanhCaNhan.filter(
    (cv) =>
      new Date(cv.dateSingleCheck).getMonth() + 1 ===
        monthYearFilter.month - 1 &&
      new Date(cv.dateSingleCheck).getFullYear() === monthYearFilter.year &&
      cv.idStu === idStu
  );
  //Từ mảng học phí học sinh -> lọc lại đối tượng học phí có tháng năm đang được filter --> dùng render kết quả
  const dataHocPhiThangHocSinh = arrHocPhiHocSinh.find(
    (cv) =>
      +cv.monthYear.month === +monthYearFilter.month &&
      +cv.monthYear.year === +monthYearFilter.year &&
      cv.idStu === idStu
  );
  //Lấy về biến isLoading
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Lấy về mảng lịch tiến hành tính toán số buổi học tổng của học sinh
  const arrLich = useSelector((state) => state.lich.arrLich);
  //Tính tổng ngày đơn và nhóm
  const { totalSingle, totalGroup } = countSingleGroupDates(arrLich);
  //Tính tổng tiền đơn và tiền nhóm
  const {
    totalMoneySingle,
    totalMoneyGroup,
    totalPreMonthMoneyOff,
    totalPreMonthMoneyPlus,
    totalPreMonthMoneyReplace,
    totalMoneyMonth,
    totalPreMonthOffDates,
    totalPreMonthReplaceDates,
    totalPreMonthPlusDates,
  } = calcMoneyMonthStu(
    arrStudents,
    idStu,
    totalSingle,
    totalGroup,
    arrDiemDanhCaNhanThangTruoc
  );

  //------------ KHU CALLBACK------------
  //Callback refresh lại nội dung bên dưới comp chọn hó sinh
  const refreshHandler = () => {
    changeRefresh(true);
    setTimeout(() => {
      changeRefresh(false);
    }, 200);
  };
  //Callback lấy và lưu tạm gái trị month year filter
  const changeMonthYearFilterHandler = (obj) => {
    changeMonthYearFilter(obj);
  };
  //Callback cho nút hủy thêm phí tháng
  const cancelAddStuMonthFeeHandler = () => {
    router.reload();
  };
  //SUBMIT - chính submit thông tin học phí tháng của học sinh
  const submitStuMonthFreeHandler = () => {
    //Tổng hợp data submit tiền học phí hs tháng lên db
    const dataSubmit = {
      idStu: stuSelected.id,
      nameStu: stuSelected.name,
      monthYear: monthYearFilter,
      totalSingleDates: totalSingle,
      totalGroupDates: totalGroup,
      totalPreMonthOffDates,
      totalPreMonthReplaceDates,
      totalPreMonthPlusDates,
      totalSingleFee: totalMoneySingle,
      totalGroupFee: totalMoneyGroup,
      totalMonthFee: totalMoneyMonth,
      totalPreMonthMoneyOff,
      totalPreMonthMoneyPlus,
      totalPreMonthMoneyReplace,
    };
    //Chạy submit
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/hoc-phi-hoc-sinh", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then(
        (res) => dispatchFn(LoadingActions.deactiveLoading()),
        router.reload()
      )
      .catch(
        (error) => dispatchFn(LoadingActions.deactiveLoading()),
        router.reload()
      );
  };
  //SUBMIT - xóa học phí tháng này
  const delStuMonthFeeHandler = (idMonthFee) => {
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/hoc-phi-hoc-sinh", {
      method: "DELETE",
      body: JSON.stringify(idMonthFee),
      headers: { "Content-Type": "application/json" },
    })
      .then(
        (res) => dispatchFn(LoadingActions.deactiveLoading()),
        router.reload()
      )
      .catch(
        (error) => dispatchFn(LoadingActions.deactiveLoading()),
        router.reload()
      );
  };

  //------------ KHU XỬ LÝ SIDE EFFECT ------------
  useEffect(() => {
    //Xử lý get data học sinh và tạo mảng học sinh
    dispatchFn(fetchGetStudentData());
    dispatchFn(getStusDataAndCreateArrTags());
    //Xử lý load lần đầu thì tạo arrLich để dùng cho comp chọn ngày
    dispatchFn(LichActions.createInitCalendar());
    //Xử lý get data học phí tháng học sinh trong lần đàu load --> render két quả học phí của tháng
    dispatchFn(fetchGetArrHocPhiHocSinh());
    //Xử lý get data mảng điểm danh cá nhân --> lấy data ngày học tăng/nghỉ/bù của tháng trước
    dispatchFn(fetchGetArrDiemDanhCaNhan());
  }, []);
  //------------ KHU XỬ LÝ PHỤ ------------
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading />}
      <HocPhiHocSinh
        refresh={refresh}
        stuSelected={stuSelected}
        arrStudentTags={arrSingleStuTags}
        monthYearFilter={monthYearFilter}
        getMonthYearFilter={changeMonthYearFilterHandler}
        doSubmitMonthFee={submitStuMonthFreeHandler}
        doDelMonthFee={delStuMonthFeeHandler}
        doCancelAddMonthFee={cancelAddStuMonthFeeHandler}
        doRefresh={refreshHandler}
        dataHocPhiThangHocSinh={dataHocPhiThangHocSinh}
      />
    </Fragment>
  );
};
export default TrangTinhPhiThangMoiHocSinh;
