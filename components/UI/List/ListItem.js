import classes from "./ListItem.module.css";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
const PhanTuDanhSach = (props) => {
  const router = useRouter();
  //Các thông tin cần từ props
  const { name, birthday, _id } = props;
  // const viewDetaiHandler = (id) => {console.log('viewDetail')};
  const deleteItemHandler = (id) => {
    //Định danh lạ id thăng mongodb mới hiểu
    fetch("/api/quan-ly-hoc-sinh", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-Type": "application/json" },
    });
    //Xử lý trỏ về trang qlhs để load lại data rồi mới push lại trang hiện tại
    router.replace('/quan-ly-hoc-sinh')
    setTimeout(()=>{
      router.replace(router.pathname)
    },500)
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
        <Link href={`/quan-ly-hoc-sinh/chi-tiet/${_id}`}>
          <button
            className="btn-sm btn-sm-detail"
          >
            Chi tiết
          </button>
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
