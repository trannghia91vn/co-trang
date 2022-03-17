import Header from "../../components/UI/Header";
import { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import LabelsContext from "../../store/context/NavbarLabels/labels-context";
import { fetchGetLuongGiaoVien } from "../../store/redux/luong-giao-vien/lgv-slice";

const TrangLuongGiaoVien = (props) => {
  const dispatchFn = useDispatch();
  //Lấy về slug
  const route = useRouter().route.replace("/", "");
  //Lấy về ctx labels navbar để load cho header
  const LabelsCtx = useContext(LabelsContext);
  const objLabelByRoute = LabelsCtx.getObjByRoute(route);
  const title = objLabelByRoute.label;

  //Tạo đối tượng chứa thông tin các tag điều hướng
  const arrOptions = [
    { label: "Tính lương", slug: "tinh-luong" },
    { label: "Thông kê lương", slug: "thong-ke-luong" },
  ];

  useEffect(() => {
    dispatchFn(fetchGetLuongGiaoVien());
  }, []);

  //Tổng hợp lai đói tượng truyền xuống comp head dể renders
  const dataHeader = {
    title,
    arrOptions,
  };

  return (
    <Fragment>
      <Header dataHeader={dataHeader} />
    </Fragment>
  );
};
export default TrangLuongGiaoVien;
