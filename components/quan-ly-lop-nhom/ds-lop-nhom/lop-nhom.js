import classes from "./lop-nhom.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const LopNhomItem = (props) => {
  const router = useRouter();
  const delClassHandler = (idClass) => {
    fetch("/api/quan-ly-lop-nhom", {
      method: "DELETE",
      body: JSON.stringify(idClass),
      headers: { "Content-Type": "application/json" },
    }).then((res) => console.log(res));
    router.replace("/quan-ly-lop-nhom");
    setTimeout(() => {
      router.replace("/quan-ly-lop-nhom/ds-lop-nhom");
    }, 300);
  };
  //Biến render danh sách lớp nhóm
  const renderListLopNhom = props.arrLopNhom.map((lop) => (
    <div key={lop._id} className={classes.item}>
      <div className={classes.head}>
        <h3>{lop.nameClass}</h3>
        <button
          className="btn-sm btn-sm-delete"
          type="button"
          onClick={delClassHandler.bind(0, lop._id)}
        >
          Xóa
        </button>
        {/* <Link href={`/quan-ly-lop-nhom/chi-tiet/${lop._id}`}>
          <div className="btn-sm btn-sm-detail">Sửa</div>
        </Link> */}
      </div>
      <div className={classes.stus}>
        {lop.arrTags.map((tag) => (
          <div key={tag.id} className={classes.stu}>
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  ));

  return renderListLopNhom;
};

export default LopNhomItem;
