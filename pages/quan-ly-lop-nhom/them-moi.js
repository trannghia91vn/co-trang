import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment, useEffect } from "react";
import ThemMoiLopNhom from "../../components/quan-ly-lop-nhom/them-moi/them-moi";
import { useSelector, useDispatch } from "react-redux";
import {
  getGroupArrStuddents,
  getArrSelectedStusTags,
} from "../../support/quan-ly-hoc-sinh/qlhc-uti";
import Loading from "../../components/UI/Loading/Loading";
import { getStusDataAndCreateArrTags } from "../../store/redux/quan-ly-hoc-sinh/qlhs-slice";

const TrangThemLopNhom = (props) => {
  const dispatchFn = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  //Lấy về mảng tags học sinh từ redux
  const arrStusTags = useSelector((state) => state.qlhs.arrStudentTags);
  console.log(arrStusTags);
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý lớp nhóm", slug: "quan-ly-lop-nhom", isActive: false },
    {
      label: "Thêm mới lớp nhóm",
      slug: "quan-ly-lop-nhom/them-moi",
      isActive: true,
    },
  ];

  //Lọc lại mảng tag học sinh nhóm
  const arrGroupStusTags = getGroupArrStuddents(arrStusTags);
  const arrSelectedStusTags = getArrSelectedStusTags(arrGroupStusTags);


  //Xử lý side effect mỗi lần load trang này phải fetch lại tạo magnr hs tags
  useEffect(() => {
    dispatchFn(getStusDataAndCreateArrTags());
  }, []);

  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <ThemMoiLopNhom
        arrGroupStus={arrGroupStusTags}
        arrGroupSelectedStus={arrSelectedStusTags}
      />
      {isLoading && <Loading />}
    </Fragment>
  );
};
export default TrangThemLopNhom;
