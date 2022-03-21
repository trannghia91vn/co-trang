import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import { Fragment, useEffect } from "react";
import DanhSach from "../../../components/UI/List/List";
import { useSelector, useDispatch } from "react-redux";
import {
  getGroupArrStuddents,
  sortArrByName,
} from "../../../support/quan-ly-hoc-sinh/qlhc-uti";
import { fetchGetStudentData } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import Loading from "../../../components/UI/Loading/Loading";

const TrangDanhSachNhom = (props) => {
  const dispatchFn = useDispatch();
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
  //Sort lại theo alphab
  const arrGroupStusSort = sortArrByName(arrGroupStus);

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <DanhSach
        title={"Danh sách học sinh nhóm"}
        arrStudents={arrGroupStusSort}
      />
    </Fragment>
  );
};
export default TrangDanhSachNhom;
