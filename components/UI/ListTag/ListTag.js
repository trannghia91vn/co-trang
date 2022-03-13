import classes from "./ListTag.module.css";
import Tag from "./Tag";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Loading from "../../UI/Loading/Loading";
import { useDispatch } from "react-redux";
import { QlhsActions } from "../../../store/redux/quan-ly-hoc-sinh/qlhs-slice";

const ListTag = (props) => {
  const arrTags = props.arrTags;
  const dispatchFn = useDispatch();

  //Biến state lấy giá trị của input searrch
  const [searchVal, changeSearchVal] = useState("");
  //Biến sate lấy giá trị của select chọn lớp nhóm (nếu có)
  const [groupClassId, changeGroupClassId] = useState("");

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
      isTeacher={props.isTeacher}
      isStudent={props.isStudent}
    />
  ));
  let allClass = classes.container;
  if (props.disabled === "disabled") {
    allClass = `${classes.container} ${classes.dis}`;
  }

  //Callback lấy giá trị lớp nhóm
  const getLopNhomHandler = (e) => {
    changeGroupClassId(e.target.value);
  };
  //Xử lý tạo options cho select lớp để chọn nhanh học sinh
  let arrLopNhom = [];
  let arrLopNhomAddNone = [];
  if (props.arrLopNhom) {
    arrLopNhom = props.arrLopNhom;
    //Thêm vào gía trị ban đầu là none
    arrLopNhomAddNone = [
      { _id: "none", nameClass: "None", arrTags: [] },
      ...arrLopNhom,
    ];
  }
  //Tạo biến render cho options của select
  const renderOptions =
    arrLopNhomAddNone.length > 0 &&
    arrLopNhomAddNone.map((lop) => (
      <option key={lop._id} value={lop._id}>
        {lop.nameClass}
      </option>
    ));
  //Khi có được giá trị lóp nhọn -> tiến hành active học sinh trong lớp đó
  useEffect(() => {
    const classSelected = arrLopNhom.find((cv) => cv._id === groupClassId);
    if (classSelected) {
      //Trả về mảng tags thuộc lớp được chọn
      const arrTags = classSelected.arrTags;
      if (groupClassId !== "" && groupClassId !== "none") {
        //Chạy clear trước
        dispatchFn(QlhsActions.clearStuTag());
        //Chạy vòng lặp trong mảng arrTags để kích hoạt từng phần từ có trong đó
        arrTags.forEach((tag) => dispatchFn(QlhsActions.activeStuTag(tag.id)));
      }
    } else {
      dispatchFn(QlhsActions.clearStuTag());
    }
  }, [groupClassId]);
  //XỬ lý active ds học sinh đã được chọn cho quá trình edit
  useEffect(() => {
    if (props.arrDefault) {
      const arrDefault = [...props.arrDefault];
      //Chạy clear trước
      dispatchFn(QlhsActions.clearStuTag());
      //Chạy vòng lặp trong mảng arrTags để kích hoạt từng phần từ có trong đó
      arrDefault.forEach((tag) => dispatchFn(QlhsActions.activeStuTag(tag.id)));
    }
  }, []);
  //Return cuối
  return arrTagsFinal.length === 0 ? (
    <Loading />
  ) : (
    <div className={classes.overall}>
      <div className={classes.search}>
        <label>
          <FaSearch
            style={{ fontSize: ".9rem", position: "relative", top: "3px" }}
          />{" "}
        </label>
        <input type="text" id="search" onChange={searchHandler} />
        {props.isSelectClass && <label htmlFor="chonLopNhom">Chọn lớp:</label>}
        {props.isSelectClass && (
          <select
            className={classes.lopNhom}
            id="chonLopNhom"
            onChange={getLopNhomHandler}
            defaultValue="none"
          >
            {renderOptions}
          </select>
        )}
      </div>
      <div className={allClass}>{renderListTags}</div>
    </div>
  );
};

export default ListTag;
