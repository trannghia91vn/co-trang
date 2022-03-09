import classes from "./ds-lop-nhom.module.css";
import { useSelector } from "react-redux";
import LopNhomItem from "./lop-nhom";

const DanhSachLopNhom = (props) => {
  const arrLopNhom = useSelector((state) => state.qlln.arrLopNhom);
  return (
    <div className={classes.container}>
      <LopNhomItem arrLopNhom={arrLopNhom} />
    </div>
  );
};

export default DanhSachLopNhom;
