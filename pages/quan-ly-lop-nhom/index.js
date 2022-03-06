import Header from "../../components/UI/Header";
import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import LabelsContext from "../../store/context/NavbarLabels/labels-context";
// import { useDispatch } from "react-redux";
// import { getStusDataAndCreateArrTags } from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";

const TrangQuanLyLopNhom = (props) => {
  // const dispatchFn = useDispatch()
  //Lấy về slug
  const route = useRouter().route.replace("/", "");
  //Lấy về ctx labels navbar để load cho header
  const LabelsCtx = useContext(LabelsContext);
  const objLabelByRoute = LabelsCtx.getObjByRoute(route);
  const title = objLabelByRoute.label;

  //Tạo đối tượng chứa thông tin các tag điều hướng
  const arrOptions = [
    { label: "Thêm mới", slug: "them-moi" },
    { label: "Ds lớp nhóm", slug: "ds-lop-nhom" },
  ];

  //Tổng hợp lai đói tượng truyền xuống comp head dể render
  const dataHeader = {
    title,
    arrOptions,
  };

  //Xử lý lần đầu load thì request data học sinh để tạo mảng tags,
  // useEffect(() => {
  //   dispatchFn(getStusDataAndCreateArrTags())
  // }, []);

  return (
    <Fragment>
      <Header dataHeader={dataHeader} />
    </Fragment>
  );
};
export default TrangQuanLyLopNhom;
