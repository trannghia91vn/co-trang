import classes from "./Breadscums.module.css";
import Link from "next/link";
const ThanhDieuHuongNoiDung = (props) => {
  //Lấy về từ props mảng labels và slug để navi
  const arrNavis = props.arrNavi;
  //Tạo biến render navi
  const renderNavis = arrNavis.map((item) => {
    let itemClass = classes.item;
    if (item.isActive === true) {
      itemClass = `${classes.item} ${classes["item-active"]}`;
    }
    return (
      <Link key={item.slug} href={`/${item.slug}`}>
        <div className={itemClass}>{item.label}</div>
      </Link>
    );
  });

  return (
    <div className={classes.container}>
        {renderNavis}
    </div>
  );
};
export default ThanhDieuHuongNoiDung;
