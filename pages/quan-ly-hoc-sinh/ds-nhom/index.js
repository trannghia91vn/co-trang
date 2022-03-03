import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import { Fragment } from "react";
import DanhSach from "../../../components/UI/List/List";
import { useSelector } from "react-redux";
import { getGroupArrStuddents } from "../../../support/quan-ly-hoc-sinh/qlhc-uti";

const TrangDanhSachNhom = (props) => {
  //Lây về danh sách học sinh từ redux
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý học sinh", slug: "quan-ly-hoc-sinh", isActive: false },
    {
      label: "Danh sách học sinh nhóm",
      slug: "quan-ly-hoc-sinh/ds-nhom",
      isActive: true,
    },
  ];
  //Lọc lại danh sách học sinh cá nhân
  const arrGroupStus = getGroupArrStuddents(arrStudents);

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <DanhSach title={"Danh sách học sinh nhóm"} arrStudents={arrGroupStus} />
    </Fragment>
  );
};
export default TrangDanhSachNhom;
