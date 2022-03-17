import ListTag from "../../UI/ListTag/ListTag";
import { Fragment } from "react";

const ChonGiaoVien = (props) => {
  return (
    <Fragment>
      <h3
        style={{
          margin: ".5rem 0",
          fontWeight: "normal",
          color: `var(--mauTieuDe--)`,
        }}
      >
        Chọn giáo viên 
      </h3>
      <ListTag
        type="only-one"
        arrTags={props.arrTags}
        isStudent={false}
        isTeacher={true}
        doRefresh={props.doRefresh}
      />
    </Fragment>
  );
};

export default ChonGiaoVien;
