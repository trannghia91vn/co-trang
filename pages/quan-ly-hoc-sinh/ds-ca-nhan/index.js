import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import DanhSach from "../../../components/UI/List/List";
import { getSingleArrStuddents } from "../../../support/quan-ly-hoc-sinh/qlhc-uti";

const TrangDanhSachCaNhan = (props) => {
  //Load về mảng học sinh tử redux
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  const contentNavi = [
    { label: "Quản lý học sinh", slug: "quan-ly-hoc-sinh", isActive: false },
    {
      label: "Danh sách học sinh cá nhân",
      slug: "quan-ly-hoc-sinh/ds-ca-nhan",
      isActive: true,
    },
  ];
  //Lọc lại danh sách học sinh cá nhân
  const arrSingleStus = getSingleArrStuddents(arrStudents);
  //truyền váo DanhSach prop tuong ứng arrStu và arrTeach
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <DanhSach
        title={"Danh sách học sinh cá nhân"}
        arrStudents={arrSingleStus}
      />
    </Fragment>
  );
};
export default TrangDanhSachCaNhan;
