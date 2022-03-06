import ThanhDieuHuongNoiDung from "../../../components/UI/Breadscums";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DanhSach from "../../../components/UI/List/List";
import { getSingleArrStuddents } from "../../../support/quan-ly-hoc-sinh/qlhc-uti";
import { fetchGetStudentData } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import Loading from "../../../components/UI/Loading/Loading";

const TrangDanhSachCaNhan = (props) => {
  const dispatchFn = useDispatch();
  //Load về mảng học sinh tử redux
  const arrStudents = useSelector((state) => state.qlhs.arrStudents);
  //Lấy về trạng thái loading
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
  //truyền váo DanhSach prop tuong ứng arrStu và arrTeach
  //Xử lý side effect để luôn load được trang này từ db
  useEffect(() => {
    dispatchFn(fetchGetStudentData());
  }, []);
  return (
    <Fragment>
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      {!isLoading && (
        <DanhSach
          title={"Danh sách học sinh cá nhân"}
          arrStudents={arrSingleStus}
        />
      )}
      {isLoading && <Loading />}
    </Fragment>
  );
};
export default TrangDanhSachCaNhan;
