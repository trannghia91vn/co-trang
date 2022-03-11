import classes from "./ListTag.module.css";
import Tag from "./Tag";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Loading from "../../UI/Loading/Loading";

const ListTag = (props) => {
  const arrTags = props.arrTags;

  const [searchVal, changeSearchVal] = useState("");

  //Func theo dõi ô tìm kiếm
  const searchHandler = (e) => {
    setTimeout(() => {
      changeSearchVal(e.target.value);
    }, 1200);
  };

  //Xử lý lọc lại arr có name trùng với kí tự search
  let arrTagsFilter = [];
  if (searchVal.trim().length > 0) {
    arrTagsFilter = arrTags.filter((tag) =>
      tag.name.toLowerCase().includes(searchVal)
    );
  }

  //Xử lý quyết định arr tags nào được render
  let arrTagsFinal = [];
  if (arrTagsFilter.length === 0) {
    arrTagsFinal = arrTags;
  } else {
    arrTagsFinal = arrTagsFilter;
  }

  //Tạo biến render tags
  const renderListTags = arrTagsFinal.map((item) => (
    <Tag
      key={item.id}
      id={item.id}
      name={item.name}
      isSelected={item.isSelected}
      disabled={props.disabled}
      type={props.type ? props.type : null}
      changeStuTag={props.changeStuTag}
    />
  ));
  let allClass = classes.container;
  if (props.disabled === "disabled") {
    allClass = `${classes.container} ${classes.dis}`;
  }

  return arrTagsFinal.length === 0 ? (
    <Loading />
  ) : (
    <div className={classes.overall}>
      <div className={classes.search}>
        <input type="text" id="search" onChange={searchHandler} />
        <label>
          <FaSearch style={{fontSize:'.9rem',position:'relative',top:'3px'}}/>{" "}
        </label>
      </div>
      <div className={allClass}>{renderListTags}</div>
    </div>
  );
};

export default ListTag;
