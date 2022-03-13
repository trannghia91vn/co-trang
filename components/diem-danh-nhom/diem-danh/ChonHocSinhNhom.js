import classes from "./ChonHocSinhNhom.module.css";
import { Fragment } from "react";
import ListTag from "../../UI/ListTag/ListTag";

const ChonHocSinhNhom = (props) => {
  //Lấy về mảng học sinh đã chọn cho việc edit
  let arrDefaultStus = [];
  if (props.defaultData) {
    arrDefaultStus = props.defaultData.arrLearnedStus;
  }
  return (
    <Fragment>
      <h3
        style={{
          margin: ".2rem 0",
          fontWeight: "bold",
          color: `var(--mauTieuDe--)`,
          fontSize: "1rem",
        }}
      >
        Chọn học sinh trong lớp nhóm
      </h3>
      <ListTag
        arrTags={props.arrTags}
        isTeacher={false}
        isStudent={true}
        isSelectClass={true}
        arrLopNhom={props.arrLopNhom}
        arrDefault={arrDefaultStus}
      />
    </Fragment>
  );
};

export default ChonHocSinhNhom;
