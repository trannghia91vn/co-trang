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
    />
  ));
  return <div className={classes.container}>{renderListTags}</div>;
};

export default ListTag;
