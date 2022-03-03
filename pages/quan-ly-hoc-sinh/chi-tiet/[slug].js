import ThongTinChiTiet from "../../../components/quan-ly-hoc-sinh/chi-tiet-hs/detail-info";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getStuById } from "../../../support/quan-ly-hoc-sinh/qlhc-uti";
import { Fragment } from "react";
import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";

const TrangThongTinChiTietHocSinh = (props) => {
  //Lấy về id học sinh
  const router = useRouter();
  const _id = router.query.slug;

  //Lấy về mảng học sinh all
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  const studentData = getStuById(arrStudents, _id);

  const contentNavi = [
    { label: "Quản lý học sinh", slug: "quan-ly-hoc-sinh", isActive: false },
    {
      label: "Thông tin chi tiết",
      slug: "quan-ly-hoc-sinh/chi-tiet",
      isActive: true,
    },
  ];

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <ThongTinChiTiet stuData={studentData} />
    </Fragment>
  );
};

export default TrangThongTinChiTietHocSinh;
