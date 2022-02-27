import Header from "../../components/UI/Header";
import { Fragment, useContext } from "react";
import {useRouter} from 'next/router';
import LabelsContext from '../../store/context/NavbarLabels/labels-context';

const TrangQuanLyGiaoVien = (props) => {
  //Lấy về slug
  const route = useRouter().route.replace("/", "");
  //Lấy về ctx labels navbar để load cho header
  const LabelsCtx = useContext(LabelsContext);
  const objLabelByRoute = LabelsCtx.getObjByRoute(route);
  const title = objLabelByRoute.label;

  //Tạo đối tượng chứa thông tin các tag điều hướng
  const arrOptions = [
    { label: "Thêm mới", slug: "them-moi" },
    { label: "Ds giáo viên", slug: "ds-giao-vien" },
  ];

  //Tổng hợp lai đói tượng truyền xuống comp head dể render
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
export default TrangQuanLyGiaoVien;
