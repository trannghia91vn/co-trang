import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchGetArrLopNhom } from "../../store/redux/quan-ly-lop-nhom/qlln-slice";
import DanhSachLopNhom from "../../components/quan-ly-lop-nhom/ds-lop-nhom/ds-lop-nhom";
import Loading from '../../components/UI/Loading/Loading';

const TrangDanhSachLopNhom = (props) => {
  const dispatchFn = useDispatch();
  const isLoading = useSelector(state=>state.loading.isLoading)
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý lớp nhóm", slug: "quan-ly-lop-nhom", isActive: false },
    {
      label: "Danh sách lớp nhóm",
      slug: "quan-ly-lop-nhom/ds-lop-nhom",
      isActive: true,
    },
  ];
  useEffect(() => {
    dispatchFn(fetchGetArrLopNhom());
  }, []);
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {isLoading && <Loading/>}
      {!isLoading && <DanhSachLopNhom/>}
      
    </Fragment>
  );
};
export default TrangDanhSachLopNhom;
