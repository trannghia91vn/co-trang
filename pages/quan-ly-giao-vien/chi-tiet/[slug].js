import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getObjTeacherDataById } from "../../../support/quan-ly-giao-vien/qlgv-uti";
import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import ThongTinChiTietGiaoVien from "../../../components/quan-ly-giao-vien/chi-tiet/chi-tiet-gv";

const TrangThongTinChiTietGiaoVien = (props) => {
  //Lấy về mảng gv từ redux, lọc ra data giáo viên theo id giáo viên
  const router = useRouter();
  const idBySlug = router.query.slug;
  const arrTeachers = useSelector((state) => state.qlgv.arrTeachers);
  const objDataTeacher = getObjTeacherDataById(arrTeachers, idBySlug);
  console.log(objDataTeacher);
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý giáo viên", slug: "quan-ly-giao-vien", isActive: false },
    {
      label: "Thông tin chi tiết giáo viên",
      slug: "quan-ly-giao-vien/chi-tiet",
      isActive: true,
    },
  ];

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {objDataTeacher && <ThongTinChiTietGiaoVien dataDefault={objDataTeacher}/>}
    </Fragment>
  );
};
export default TrangThongTinChiTietGiaoVien;
