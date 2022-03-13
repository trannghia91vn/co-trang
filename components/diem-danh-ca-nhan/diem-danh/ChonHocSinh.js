import ListTag from "../../UI/ListTag/ListTag";
import { Fragment } from "react";

const ChonHocSinh = (props) => {
  return (
    <Fragment>
      <h3
        style={{
          margin: ".5rem 0",
          fontWeight: "normal",
          color: `var(--mauTieuDe--)`,
        }}
      >
        Chọn học sinh tiến hành điểm danh
      </h3>
      <ListTag
        type="only-one"
        arrTags={props.arrTags}
        changeStuTag={props.changeStuTag}
        isStudent={true}
        isTeacher={false}
      />
    </Fragment>
  );
};

export default ChonHocSinh;
