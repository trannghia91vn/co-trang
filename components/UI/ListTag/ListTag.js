import classes from "./ListTag.module.css";
import Tag from "./Tag";

const ListTag = (props) => {
  const arrTags = props.arrTags;

  //Tạo biến render tags
  const renderListTags = arrTags.map((item) => (
    <Tag
      key={item.id}
      id={item.id}
      name={item.name}
      isSelected={item.isSelected}
      disabled={props.disabled}
    />
  ));
  let allClass = classes.container;
  if (props.disabled === "disabled") {
    allClass = `${classes.container} ${classes.dis}`;
  }
  return <div className={allClass}>{renderListTags}</div>;
};

export default ListTag;
