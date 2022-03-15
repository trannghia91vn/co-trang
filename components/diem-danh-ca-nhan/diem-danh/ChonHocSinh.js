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
        Chọn học sinh
      </h3>
      <ListTag
        type="only-one"
        arrTags={props.arrStudentTags}
        isStudent={true}
        isTeacher={false}
        doRefresh={props.doRefresh}
      />
    </Fragment>
  );
};

export default ChonHocSinh;
