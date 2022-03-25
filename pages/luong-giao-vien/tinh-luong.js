import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import LuongGiaoVien from "../../components/luong-giao-vien/ThemMoi/LuongGiaoVien";
import Loading from "../../components/UI/Loading/Loading";
import { LoadingActions } from "../../store/redux/loading/loading-slice";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetArrTeacher } from "../../store/redux/quan-ly-giao-vien/qlgv-slice";
import { fetchGetArrDiemDanhCaNhan } from "../../store/redux/diem-danh-ca-nhan/ddcn-slice";
import { fetchGetArrDiemDanhNhom } from "../../store/redux/diem-danh-nhom/ddn-slice";
import { fetchGetLuongGiaoVien } from "../../store/redux/luong-giao-vien/lgv-slice";
import {
  getArrStudentsTaughtByIdTeaMonthYear,
  getSingleGroupWageTeacher,
  getMonthWageData,
  getArrDdcnHandeled,
  getInitArrLuongNhom,
} from "../../support/luong-giao-vien/lgn-uti";
import { LgvActions } from "../../store/redux/luong-giao-vien/lgv-slice";
import { useRouter } from "next/router";

const TrangTinhLuongGiaoVien = (props) => {
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Lương giáo vien", slug: "luong-giao-vien", isActive: false },
    {
      label: "Tính lương giáo viên",
      slug: "luong-giao-vien/tinh-luong",
      isActive: true,
    },
  ];
  //------------ KHU TẠO BIẾN ------------
  const router = useRouter();
  const dispatchFn = useDispatch();
  //Biến nội bộ chạy reload lại comp bên dưới khi thay đỏi chọn tag giáo viên
  const [refresh, changeRefresh] = useState(false);
  //Biến tháng năm hiện tại
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();
  //Biến nội bộ lấy giá trị năm tháng được lọc
  const [monthYearFilter, changeMonthYearFilter] = useState({
    month: nowMonth,
    year: nowYear,
  });
  //Biến nội bộ lấy gía trị tổng tiền phụ phí truyền từ comp dưới
  const [totalPlusWage, changeTotalPlusWage] = useState(0);
  //Biến nội bộ lấy gía trị tổng tiền nhóm truyền từ comp dưới
  const [totalGroupWage, changeTotalGroupWage] = useState(0);
  //Biến nội bộ lấy gía trị tổng tiền nhóm truyền từ comp dưới
  const [totalSingleWage, changeTotalSingleWage] = useState(0);

  //------------ KHU LẤY DATA VỀ VÀ XỬ LÝ DATA ------------
  //Lấy về biến isLoading
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Lấy về mảng giáo viên tạo tags lựa chọn
  const arrTeacherTags = useSelector((state) => state.qlgv.arrTeacherTags);
  //Lấy về mảng giáo viên để tra các thông tin cần thiết
  const arrTeachers = useSelector((state) => state.qlgv.arrTeachers);
  //Xử lý tags giáo viên được chọn
  const teacherSelected = arrTeacherTags.find((tag) => tag.isSelected);
  let idTea = "";
  if (teacherSelected) {
    idTea = teacherSelected.id;
  }
  //Xử lý Lấy về lương cá nhân của giáo viên
  const { singleWage, groupWage } = getSingleGroupWageTeacher(
    arrTeachers,
    idTea
  );
  //Lấy về data mảng điểm danh cá nhân để xác thực tính tiền cho hs cá nhân cho giáo viên
  const arrDiemDanhCaNhan = useSelector(
    (state) => state.ddcn.arrDiemDanhCaNhan
  );
  //Xử lý từ mảng điểm danh cá nhân -> lọc lại mảng với các điều kiện : giáo vien dạy, ngày tháng lọc và loại ngày học là thêm
  const arrDataCaNhan = getArrStudentsTaughtByIdTeaMonthYear(
    arrDiemDanhCaNhan,
    idTea,
    monthYearFilter
  );
  //Lấy về mảng điểm danh nhóm
  const arrDiemDanhNhom = useSelector((state) => state.ddn.arrDiemDanhNhom);
  //Xử lý từ arr điểm danh nhóm -> arr lương nhóm --> dùng arr này so sánh với arr lương nhóm của arr lương cá giáo viên lấy về từ db để quêyst định lấy thằng nào
  const arrLuongNhomFromDDN = getInitArrLuongNhom(
    arrDiemDanhNhom,
    idTea,
    monthYearFilter
  );
  //Lấy về mảng lương cá nhân để submit post
  const arrLuongCaNhan = useSelector((state) => state.lgv.arrLuongCaNhan);
  console.log(arrLuongCaNhan);
  //Lấy về mảng lương cá nhân để submit post
  const arrLuongNhom = useSelector((state) => state.lgv.arrLuongNhom);
  //Lấy về mảng lương cá nhân để submit post
  const arrPhuPhi = useSelector((state) => state.lgv.arrPhuPhi);

  //Lấy về mảng lương tháng giáo viên để render giao diện edit
  const arrLuongThangGiaoVien = useSelector(
    (state) => state.lgv.arrLuongThangGiaoVien
  );

  //Xử lý lấy arrLuongCaNhan từ điêm danh cá nhân gần nhất dể truyền xuống Func hỗ trợ bên dưới
  const arrLuongCaNhanFromDDCN = getArrDdcnHandeled(arrDataCaNhan);
  //Lọc ra đối tượng lương tháng theo idTea,monthYEar
  const monthWageData = getMonthWageData(
    arrLuongThangGiaoVien,
    idTea,
    monthYearFilter,
    arrLuongCaNhanFromDDCN,
    arrLuongNhomFromDDN
  );
  //Des ra ba mảng cần để render kết quả
  const { arrLuongCaNhanData, arrLuongNhomData, arrPhuPhiData, idMonthWage } =
    monthWageData;

  //------------ KHU CALLBACK------------
  //Func lấy giá trị tổng tiền phụ phí
  const getTotalPlusWageHandler = (val) => {
    changeTotalPlusWage(val);
  };
  //Func lấy giá trị tổng tiền nhóm
  const getTotalGroupWageHandler = (val) => {
    changeTotalGroupWage(val);
  };
  //Func lấy giá trị tổng tiền cá nhân
  const getTotalSingleWageHandler = (val) => {
    changeTotalSingleWage(val);
  };

  //Func tiến hành reload lại nội dung bên dưới chọn giáo viên
  const doRefreshHandler = () => {
    changeRefresh(true);
    setTimeout(() => {
      changeRefresh(false);
    }, 200);
  };
  //Func lấy về giá trị tháng năm được lọc
  const getMonthYearFilter = (obj) => {
    changeMonthYearFilter(obj);
  };
  //SUBMIT -- callback chính tiến hành thêm mới lương tháng của giáo vien
  const addMonthWageHandler = () => {
    //Tổng hợp lại data để submit lương tháng cho giáo viên
    const dataSubmit = {
      idTea: idTea,
      nameTea: teacherSelected.name,
      monthYear: monthYearFilter,
      singleWage: singleWage,
      groupWage: groupWage,
      arrLuongCaNhan: arrLuongCaNhan,
      arrLuongNhom: arrLuongNhom,
      arrPhuPhi: arrPhuPhi,
    };
    //Chạy fetch thôi
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/luong-giao-vien", {
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
  //SUBMIT -- callback chính tiến hành update lại lương tháng của giáo vien
  const updateMonthWageHandler = () => {
    //Tổng hợp lại data để submit
    const data = {
      idTea: idTea,
      nameTea: teacherSelected.name,
      monthYear: monthYearFilter,
      singleWage: singleWage,
      groupWage: groupWage,
      arrLuongCaNhan: arrLuongCaNhanData,
      arrLuongNhom: arrLuongNhomData,
      arrPhuPhi: arrPhuPhiData,
    };
    const dataSubmit = {
      id: idMonthWage,
      data: data,
    };
    //Chạy fetch thôi
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/luong-giao-vien", {
      method: "PUT",
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
  //SUBMIT -- xóa data lương tháng luôn
  const delMonthWageHandler = () => {
    //Chạy fetch thôi
    dispatchFn(LoadingActions.activeLoading());
    fetch("/api/luong-giao-vien", {
      method: "DELETE",
      body: JSON.stringify(idMonthWage),
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
  //Xử lý side effect get data
  useEffect(() => {
    //Get data giáo viên về tạo mảng tags
    dispatchFn(fetchGetArrTeacher());
    //Get data điểm danh cá nhân về để xác thực
    dispatchFn(fetchGetArrDiemDanhCaNhan());
    //Get data điểm danh nhóm về để xác thực
    dispatchFn(fetchGetArrDiemDanhNhom());
    //Phải get data lương giáo viên về để check xem lương tháng giáo viên đã tồn tại chưa, nếu đã tồn tại thì không cho thêm mới nữa mà phải chuyển sang giao diện chỉnh sửa
    dispatchFn(fetchGetLuongGiaoVien());
    //--> nếu chạy get cái này sẽ bị lỗi 304 vì bên thong ke lương ta đã get rồi -- lỗi 304 tức ta get data 2 lần mà data đó là như nhau
    //Để khắc phục điều này --> khi load trang này ta sé cho redirect qua thằng thông ke trước để nó load data rồi mới trở lại đây, hoặc đẩy fetch mảng lương thagns lên page trước
  }, []);
  //Ngay khi một giáo viên được click, xử lý tạo logic trên redux cho việc render thông tin điểm danh cá nhân , nhóm và phụ phí
  useEffect(() => {
    if (teacherSelected) {
      //Tạo mới trên redux arrLuongCaNhan tạm thời để thao tác
      dispatchFn(
        LgvActions.createArrLuongCaNhan({
          arrDDCN: arrDiemDanhCaNhan,
          idTeacher: idTea,
          objMonthYear: monthYearFilter,
        })
      );
      //Tạo mới trên redux arrLuongNhom tạm thời để thao tác
      dispatchFn(
        LgvActions.createArrLuongNhom({
          arrDiemDanhNhom: arrDiemDanhNhom,
          idTea: idTea,
          monthYear: monthYearFilter,
        })
      );
    }
  }, [teacherSelected, monthYearFilter]);
  //Xử lý ghi đè lại mảng con trong magnr arrLuongGiaoVien trên redux trong trường hợp  mảng con đó bị trống (cá nhan và nhóm)
  useEffect(() => {
    dispatchFn(
      LgvActions.replaceArrLCN({
        arrLuongCaNhanData: arrLuongCaNhanData,
        idTea: idTea,
        monthYear: monthYearFilter,
      })
    );
    dispatchFn(
      LgvActions.replaceArrLN({
        arrLuongNhomData: arrLuongNhomData,
        idTea: idTea,
        monthYear: monthYearFilter,
      })
    );
  }, [arrLuongCaNhanData, arrLuongNhomData]);

  //------------ KHU XỬ LÝ PHỤ ------------

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading />}
      {!refresh && (
        <LuongGiaoVien
          arrTeacherTags={arrTeacherTags}
          teaSelected={teacherSelected}
          idTeaSelected={idTea}
          monthYear={monthYearFilter}
          arrDataCaNhan={arrDataCaNhan}
          arrLuongCaNhanData={arrLuongCaNhanData}
          arrLuongNhomData={arrLuongNhomData}
          arrPhuPhiData={arrPhuPhiData}
          singleWage={singleWage}
          groupWage={groupWage}
          totalPlusWage={totalPlusWage}
          totalGroupWage={totalGroupWage}
          totalSingleWage={totalSingleWage}
          getMonthYear={getMonthYearFilter}
          getTotalPlusWage={getTotalPlusWageHandler}
          getTotalGroupWage={getTotalGroupWageHandler}
          getTotalSingleWage={getTotalSingleWageHandler}
          doRefresh={doRefreshHandler}
          doAddMonthWage={addMonthWageHandler}
          doUpdateMonthWage={updateMonthWageHandler}
          doDelMonthWage={delMonthWageHandler}
        />
      )}
    </Fragment>
  );
};
export default TrangTinhLuongGiaoVien;
