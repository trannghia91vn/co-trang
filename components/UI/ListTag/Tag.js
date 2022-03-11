import classes from "./Tag.module.css";
import { useDispatch } from "react-redux";
import { QlhsActions } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";

const Tag = (props) => {
  const dispatchFn = useDispatch();
  //Des các prop cần thiết
  const { id, name, isSelected } = props;
  //Callack select,deselect
  const selectHandler = (id) => {
    if (props.type === "only-one") {
      dispatchFn(QlhsActions.clearStuTag());
      if (props.changeStuTag) {
        props.changeStuTag();
      }
    }
    dispatchFn(QlhsActions.activeStuTag(id));
  };
  const deSelectHandler = (id) => {
    dispatchFn(QlhsActions.deActiveStuTag(id));
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