import Header from "../../components/UI/Header";
import { Fragment, useContext, useEffect } from "react";
import LabelsContext from "../../store/context/NavbarLabels/labels-context";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchGetStudentData } from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";

const TrangQuanLyHocSinh = (props) => {
  const dispatchFn = useDispatch();
  //Lấy về slug
  const route = useRouter().route.replace("/", "");
  //Lấy về ctx labels navbar để load cho header
  const LabelsCtx = useContext(LabelsContext);
  const objLabelByRoute = LabelsCtx.getObjByRoute(route);
  const title = objLabelByRoute.label;

  //Tạo đối tượng chứa thông tin các tag điều hướng
  const arrOptions = [
    { label: "Thêm mới", slug: "them-moi" },
    { label: "Ds cá nhân", slug: "ds-ca-nhan" },
    { label: "Ds nhóm", slug: "ds-nhom" },
  ];

  //Tổng hợp lai đói tượng truyền xuống comp head dể render
  const dataHeader = {
    title,
    arrOptions,
  };

  //Xử lý side effect gom get Data ở đây
  useEffect(() => {
    dispatchFn(fetchGetStudentData());
  }, []);

  return (
    <Fragment>
      <Header dataHeader={dataHeader} />
    </Fragment>
  );
};
export default TrangQuanLyHocSinh;
