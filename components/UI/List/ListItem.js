import classes from "./ListItem.module.css";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { LoadingActions } from "../../../store/redux/loading/loading-slice";

const PhanTuDanhSach = (props) => {
  const router = useRouter();
  const dispatchFn = useDispatch();
  //Các thông tin cần từ props
  const { name, birthday, _id, type } = props;
  // const viewDetaiHandler = (id) => {console.log('viewDetail')};
  const deleteItemHandler = (id) => {
    dispatchFn(LoadingActions.activeLoading());
    //Xử lý xóa học sinh
    if (type === "student") {
      //Định danh lạ id thăng mongodb mới hiểu
      fetch("/api/quan-ly-hoc-sinh", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          dispatchFn(LoadingActions.deactiveLoading()),
            router.replace("/quan-ly-hoc-sinh");
          router.replace(router.pathname);
        })
        .catch((error) => {
          dispatchFn(LoadingActions.deactiveLoading()),
            router.replace("/quan-ly-hoc-sinh");
          router.replace(router.pathname);
        });
    }

    //Xử lý xóa giáo viên
    if (type === "teacher") {
      fetch("/api/quan-ly-giao-vien", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          dispatchFn(LoadingActions.deactiveLoading()),
            router.replace("/quan-ly-giao-vien");
          router.replace("/quan-ly-giao-vien/ds-giao-vien");
        })
        .catch((error) => {
          dispatchFn(LoadingActions.deactiveLoading()),
            router.replace("/quan-ly-giao-vien");
          router.replace("/quan-ly-giao-vien/ds-giao-vien");
        });
      //Xử lý trỏ về trang qlgv load lại data ròi mới push lại trang hiện tại
      // router.replace("/quan-ly-giao-vien");
      // setTimeout(() => {
      //   router.replace(router.pathname);
      // }, 500);
    }
  };
  return (
    <div className={classes.items}>
      <div className={classes.item}>
        <div>
          <span style={{ position: "relative", top: "2px" }}>
            <RiCharacterRecognitionFill />
          </span>{" "}
          {name}
        </div>
        <div>
          <span>
            <FaBirthdayCake />
          </span>{" "}
          {birthday}
        </div>
      </div>
      <div className={classes.actions}>
        <Link
          href={
            type === "student"
              ? `/quan-ly-hoc-sinh/chi-tiet/${_id}`
              : `/quan-ly-giao-vien/chi-tiet/${_id}`
          }
        >
          <button className="btn-sm btn-sm-detail">Chi tiết</button>
        </Link>

        <button
          onClick={deleteItemHandler.bind(0, _id)}
          className="btn-sm btn-sm-delete"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default PhanTuDanhSach;
