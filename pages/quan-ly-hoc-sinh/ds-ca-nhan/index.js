import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DanhSach from "../../../components/UI/List/List";
import {
  getSingleArrStuddents,
  sortArrByName,
} from "../../../support/quan-ly-hoc-sinh/qlhc-uti";
import Loading from "../../../components/UI/Loading/Loading";

const TrangDanhSachCaNhan = (props) => {
  //Load về mảng học sinh tử redux
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  //Load về biến loading
  const isLoading = useSelector((state) => state.loading.isLoading);
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
  //Sort lại view theo name alphabet
  const arrSingleStusSort = sortArrByName(arrSingleStus);

  return (
    <Fragment>
      {isLoading && <Loading />}
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <DanhSach
        title={"Danh sách học sinh cá nhân"}
        arrStudents={arrSingleStusSort}
      />
    </Fragment>
  );
};
export default TrangDanhSachCaNhan;
