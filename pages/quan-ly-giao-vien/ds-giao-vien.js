import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment, useEffect } from "react";
import DanhSach from "../../components/UI/List/List";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetArrTeacher } from "../../store/redux/quan-ly-giao-vien/qlgv-slice";
import Loading from "../../components/UI/Loading/Loading";

const TrangDanhSachGiaoVien = (props) => {
  const dispatchFn = useDispatch();
  const arrTeachers = useSelector((state) => state.qlgv.arrTeachers);
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý giáo viên", slug: "quan-ly-giao-vien", isActive: false },
    {
      label: "Danh sách giáo viên",
      slug: "quan-ly-giao-vien/ds-giao-vien",
      isActive: true,
    },
  ];
  //Xử lý side effect để lấy data mới nhất của giáo viên
  useEffect(() => {
    dispatchFn(fetchGetArrTeacher());
  }, []);
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {!isLoading && (
        <DanhSach arrTeachers={arrTeachers} title="Danh sách giáo viên" />
      )}
      {isLoading && <Loading />}
    </Fragment>
  );
};
export default TrangDanhSachGiaoVien;
