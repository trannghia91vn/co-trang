import classes from "./them-moi-hs.module.css";
import { useState, useRef, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const FormThemMoiHocSinh = (props) => {
  const dispatchFn = useDispatch();
  const router = useRouter();
  //Biến state input
  const [isSingle, changeIsSingle] = useState(false);
  const [isGroup, changeIsGroup] = useState(false);
  const [sex, changeSex] = useState("male");
  //Biến điều kiện để disable nút thêm mới đi
  const [disSubmit, changeDisSubmit] = useState(true);
  const [isSingleValue, changeIsSingleValue] = useState(false);
  const [isGroupValue, changeIsGroupValue] = useState(false);
  //Biến ref input
  const bornRef = useRef();
  const singleFeeRef = useRef();
  const groupFeeRef = useRef();
  const nameStuRef = useRef();
  const nameParentRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const infoRef = useRef();

  //Tạo check lấy giá trị lớp cá nhân /nhóms
  const checkSingleHandler = () => {
    changeIsSingle(!isSingle);
  };
  const checkGroupHandler = () => {
    changeIsGroup(!isGroup);
  };

  //Func lấy giá trị giới tính
  const selectSexHandler = (e) => {
    changeSex(e.target.value);
  };

  const onChangeSingleHandler = (e) => {
    if (e.target.value > 0) {
      changeIsSingleValue(true);
    } else {
      changeIsSingleValue(false);
    }
  };
  const onChangeGroupHandler = (e) => {
    if (e.target.value > 0) {
      changeIsGroupValue(true);
    } else {
      changeIsGroupValue(false);
    }
  };

  //Callback clear input
  const clearData = () => {
    changeIsSingle(false);
    changeIsGroup(false);
    bornRef.current.value = "";
    singleFeeRef.current.value = "";
    groupFeeRef.current.value = "";
    nameStuRef.current.value = "";
    nameParentRef.current.value = "";
    phoneRef.current.value = "";
    addressRef.current.value = "";
    infoRef.current.value = "";
  };

  //Callback chính xử lý thêm mới học sinh
  const addNewStuHandler = async (e) => {
    e.preventDefault();
    //Tổng hợp đối tượng học sinh để submit lên api
    const dataStudent = {
      singleClass: isSingle,
      groupClass: isGroup,
      sex: sex,
      dateBorn: bornRef.current.value,
      singleFee: +singleFeeRef.current.value,
      groupFee: +groupFeeRef.current.value,
      nameStu: nameStuRef.current.value,
      nameParent: nameParentRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      info: infoRef.current.value,
    };
    props.doAddNewStu(dataStudent);
    //Cuối cùng thì vần clear input để tiếp tục thêm nếu cần
    clearData();
    //Push vè qlhs để reload lại data, sau đo push lại form
  };
  //Callback xử lý hủy thêm
  const cancelAddStuHandler = () => {
    clearData();
    //Điều hướng về trang quản lý
    router.replace("/quan-ly-hoc-sinh");
  };

  //Xử lý side effect để xem nút bấm có dis hay không
  useEffect(() => {
    if ((isSingle && isSingleValue) || (isGroup && isGroupValue)) {
      changeDisSubmit(false);
    } else {
      changeDisSubmit(true);
    }
  }, [isSingle, isSingleValue, isGroup, isGroupValue]);

  return (
    <Fragment>
      <section className={classes.container}>
        <h3>Thêm mới học sinh</h3>
        <form onSubmit={addNewStuHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="single">Cá nhân *</label>
              <div
                onClick={checkSingleHandler}
                className={
                  !isSingle
                    ? classes["btn-check"]
                    : `${classes["btn-check"]} ${classes["btn-checked"]}`
                }
              ></div>
              <label htmlFor="group">Nhóm *</label>
              <div
                onClick={checkGroupHandler}
                className={
                  !isGroup
                    ? classes["btn-check"]
                    : `${classes["btn-check"]} ${classes["btn-checked"]}`
                }
              ></div>
              <label>Giới tính *</label>
              <select onChange={selectSexHandler} defaultValue="male" required>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>

            <div className={classes.control}>
              <label>Ngày sinh *</label>
              <input
                ref={bornRef}
                className={classes["input-date"]}
                type="date"
                defaultValue="1991-03-21"
                required
              />
            </div>

            <div className={classes.control}>
              <label>Học phí cá nhân *</label>
              <input
                onChange={onChangeSingleHandler}
                ref={singleFeeRef}
                className={classes["input-money"]}
                type="number"
                min="0"
                step="1000"
                defaultValue={0}
                required
              />
            </div>

            <div className={classes.control}>
              <label>Học phí nhóm *</label>
              <input
                onChange={onChangeGroupHandler}
                ref={groupFeeRef}
                className={classes["input-money"]}
                type="number"
                min="0"
                step="1000"
                defaultValue={0}
                required
              />
            </div>

            <div className={classes.control}>
              <label>Tên học sinh *</label>
              <input
                ref={nameStuRef}
                className={classes["input-name"]}
                type="text"
                required
              />
            </div>

            <div className={classes.control}>
              <label>Tên phụ huynh </label>
              <input
                ref={nameParentRef}
                className={classes["input-name"]}
                type="text"
              />
            </div>
            <div className={classes.control}>
              <label>Số điện thoại </label>
              <input
                ref={phoneRef}
                className={classes["input-name"]}
                type="number"
                minLength={10}
              />
            </div>
            <div className={classes.control}>
              <label>Địa chỉ </label>
              <input
                ref={addressRef}
                className={classes["input-name"]}
                type="text"
              />
            </div>
            <div className={classes.control}>
              <textarea
                ref={infoRef}
                placeholder="Thông tin cơ bản về trẻ."
                rows="7"
                cols="90"
                type="text"
              />
            </div>
          </div>

          <div className={classes.actions}>
            <button
              disabled={disSubmit ? "disabled" : ""}
              className="btn btn-submit"
              type="submit"
            >
              Thêm mới
            </button>
            <button
              className="btn btn-cancel"
              type="button"
              onClick={cancelAddStuHandler}
            >
              Hủy thêm
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default FormThemMoiHocSinh;
