import classes from "./Tag.module.css";
import { useDispatch } from "react-redux";
import { QlhsActions } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";
import { QlgvActions } from "../../../store/redux/quan-ly-giao-vien/qlgv-slice";

const Tag = (props) => {
  const dispatchFn = useDispatch();
  //Des các prop cần thiết
  const { id, name, isSelected } = props;
  //Callack select,deselect
  const selectHandler = (id) => {
    //Xử lý cho học sinh
    if (props.isStudent) {
      if (props.type === "only-one") {
        dispatchFn(QlhsActions.clearStuTag());
        if (props.changeStuTag) {
          props.changeStuTag();
        }
      }
      dispatchFn(QlhsActions.activeStuTag(id));
    }
    //Xử lý cho giáo viên
    if (props.isTeacher) {
      if (props.type === "only-one") {
        dispatchFn(QlgvActions.clearAllTag());
      }
      dispatchFn(QlgvActions.activeTeaTag(id));
    }
  };
  const deSelectHandler = (id) => {
    //Xử lý chó học sịnh
    if (props.isStudent) {
      dispatchFn(QlhsActions.deActiveStuTag(id));
    }
    //Xử lý cho giáovieen
    if (props.isTeacher) {
      dispatchFn(QlgvActions.deactiveTeaTag(id));
    }
  };
  return (
    <button
      disabled={props.disabled === "disabled" ? "disabled" : ""}
      onClick={selectHandler.bind(0, id)}
      onDoubleClick={deSelectHandler.bind(0, id)}
      type="button"
      className={
        isSelected ? `${classes.tag} ${classes["tag-active"]}` : classes.tag
      }
    >
      {name}
    </button>
  );
};

export default Tag;
