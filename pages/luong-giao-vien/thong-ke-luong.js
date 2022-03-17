// import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
// import Loading from "../../components/UI/Loading/Loading";
// import ThongKeLuongGiaoVien from "../../components/luong-giao-vien/ThongKe/ThongKeLGV";
// import { LoadingActions } from "../../store/redux/loading/loading-slice";
// import { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchGetArrTeacher } from "../../store/redux/quan-ly-giao-vien/qlgv-slice";
// import { fetchGetArrDiemDanhCaNhan } from "../../store/redux/diem-danh-ca-nhan/ddcn-slice";
// import { fetchGetArrDiemDanhNhom } from "../../store/redux/diem-danh-nhom/ddn-slice";
// import { fetchGetLuongGiaoVien } from "../../store/redux/luong-giao-vien/lgv-slice";
// import { getMonthWageData } from "../../support/luong-giao-vien/lgn-uti";
// import { LgvActions } from "../../store/redux/luong-giao-vien/lgv-slice";
// import { useRouter } from "next/router";

// const TrangThongKeLuongGiaoVien = (props) => {
//   //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
//   const contentNavi = [
//     { label: "Lương giáo vien", slug: "luong-giao-vien", isActive: false },
//     {
//       label: "Thống kê lương giáo viên",
//       slug: "luong-giao-vien/thong-ke-luong",
//       isActive: true,
//     },
//   ];
//   //------------ KHU TẠO BIẾN ------------
//   const router = useRouter();
//   const dispatchFn = useDispatch();
//   //Biến nội bộ chạy reload lại comp bên dưới khi thay đỏi chọn tag giáo viên
//   const [refresh, changeRefresh] = useState(false);
//   //Biến tháng năm hiện tại
//   const now = new Date();
//   const nowMonth = now.getMonth() + 1;
//   const nowYear = now.getFullYear();
//   //Biến nội bộ lấy giá trị năm tháng được lọc
//   const [monthYearFilter, changeMonthYearFilter] = useState({
//     month: nowMonth,
//     year: nowYear,
//   });
//   //Biến nội bộ lấy gía trị tổng tiền phụ phí truyền từ comp dưới
//   const [totalPlusWage, changeTotalPlusWage] = useState(0);
//   //Biến nội bộ lấy gía trị tổng tiền nhóm truyền từ comp dưới
//   const [totalGroupWage, changeTotalGroupWage] = useState(0);
//   //Biến nội bộ lấy gía trị tổng tiền nhóm truyền từ comp dưới
//   const [totalSingleWage, changeTotalSingleWage] = useState(0);

//   //------------ KHU LẤY DATA VỀ VÀ XỬ LÝ DATA ------------
//   //Lấy về biến isLoading
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   //Lấy về mảng giáo viên tạo tags lựa chọn
//   const arrTeacherTags = useSelector((state) => state.qlgv.arrTeacherTags);
//   //Xử lý tags giáo viên được chọn
//   const teacherSelected = arrTeacherTags.find((tag) => tag.isSelected);
//   let idTea = "";
//   if (teacherSelected) {
//     idTea = teacherSelected.id;
//   }
//   //Lấy vè mảng chính : mảng lương tháng giáo viên đẻ render kết quả
//   const arrLuongThangGiaoVien = useSelector(
//     (state) => state.lgv.arrLuongThangGiaoVien
//   );
//   console.log(arrLuongThangGiaoVien);

//   //Dùng support lọc lại đối tượng lương tháng phù hợp và láy data cúa nỏ ra dùng
//   const {
//     arrLuongCaNhanData,
//     arrLuongNhomData,
//     arrPhuPhiData,
//     singleWageData,
//     groupWageData,
//     idMonthWage,
//   } = getMonthWageData(arrLuongThangGiaoVien, idTea, monthYearFilter);

//   //Từ mảng lọc này ta des re

//   //------------ KHU CALLBACK------------
//   //Func tiến hành reload lại nội dung bên dưới chọn giáo viên
//   const doRefreshHandler = () => {
//     changeRefresh(true);
//     setTimeout(() => {
//       changeRefresh(false);
//     }, 200);
//   };
//   //Func lấy về giá trị tháng năm được lọc
//   const getMonthYearFilter = (obj) => {
//     changeMonthYearFilter(obj);
//   };
//   //Func lấy giá trị tổng tiền phụ phí
//   const getTotalPlusWageHandler = (val) => {
//     changeTotalPlusWage(val);
//   };
//   //Func lấy giá trị tổng tiền nhóm
//   const getTotalGroupWageHandler = (val) => {
//     changeTotalGroupWage(val);
//   };
//   //Func lấy giá trị tổng tiền cá nhân
//   const getTotalSingleWageHandler = (val) => {
//     changeTotalSingleWage(val);
//   };

//   //------------ KHU XỬ LÝ SIDE EFFECT ------------
//   //Xử lý side effect get data
//   useEffect(() => {
    
//   }, []);
//   //------------ KHU XỬ LÝ PHỤ ------------
//   return (
//     <Fragment>
//       <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
//       {isLoading && <Loading />}
//       {!refresh && (
//         <ThongKeLuongGiaoVien
//           doRefresh={doRefreshHandler}
//           getMonthYear={getMonthYearFilter}
//           getTotalPlusWage={getTotalPlusWageHandler}
//           getTotalGroupWage={getTotalGroupWageHandler}
//           getTotalSingleWage={getTotalSingleWageHandler}
//           teaSelected={teacherSelected}
//           monthYear={getMonthYearFilter}
//           idTea={idTea}
//           arrTeacherTags={arrTeacherTags}
//           arrLuongCaNhan={arrLuongCaNhanData}
//           arrLuongNhom={arrLuongNhomData}
//           arrPhuPhi={arrPhuPhiData}
//           singleWage={singleWageData}
//           groupWage={groupWageData}
//           idMonthWage={idMonthWage}
//         />
//       )}
//     </Fragment>
//   );
// };
// export default TrangThongKeLuongGiaoVien;
