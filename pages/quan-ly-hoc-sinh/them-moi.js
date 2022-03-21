import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import FormThemMoiHocSinh from "../../components/quan-ly-hoc-sinh/them-moi-hs/them-moi-hs";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/UI/Loading/Loading";
import { LoadingActions } from "../../store/redux/loading/loading-slice";
import { useRouter } from "next/router";

const TrangThemMoiHocSinh = (props) => {
  const router = useRouter();
  const pathname = router.pathname;
  //Tạo biến loading nội bộ
  const [loading, changeLoading] = useState(false);
  //callback thay đổi
  const onLoading = () => {
    changeLoading(true);
  };
  const offLoading = () => {
    changeLoading(false);
  };

  // const dispatchFn = useDispatch();
  //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
  const contentNavi = [
    { label: "Quản lý học sinh", slug: "quan-ly-hoc-sinh", isActive: false },
    { label: "Thêm mới", slug: "quan-ly-hoc-sinh/them-moi", isActive: true },
  ];
  //CallBack chính sumit
  const addNewStudentHandler = (dataSubmit) => {
    //Post request lên custom api route
    onLoading();
    fetch("/api/quan-ly-hoc-sinh", {
      method: "POST",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        offLoading();
      })
      .catch((error) => {
        offLoading();
      });
  };
  return (
    <Fragment>
      {loading && <Loading />}
      <ThanhDieuHuongNoiDung arrNavi={contentNavi} />
      <FormThemMoiHocSinh doAddNewStu={addNewStudentHandler} />
    </Fragment>
  );
};
export default TrangThemMoiHocSinh;
