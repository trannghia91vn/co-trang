import classes from "./detail-info.module.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const ThongTinChiTiet = (props) => {
  const router = useRouter();
  const dispatchFn = useDispatch();

  console.log(props.stuData);
  //Tạo biến state cho phép edit các trường thông tin hay không
  const [isDisableInput, changeIsDisInput] = useState(true);

  //Biến state input
  const [isSingle, changeIsSingle] = useState(false);
  const [isGroup, changeIsGroup] = useState(false);
  const [sex, changeSex] = useState("male");
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
  //Func khi bi off click hai ô chọn lớp
  const offClickHandler = () => {
    console.log("không thể chọn");
  };
  //Hàm thay đổi chế độ sửa thông tin
  const activeEditHandler = () => {
    changeIsDisInput(false);
  };
  const deActiveEditHandler = () => {
    changeIsDisInput(true);
  };

  //Callback xử lý hủy thêm
  const cancelAddStuHandler = () => {
    deActiveEditHandler();
  };
  //Calback chính cập nhật thông tin
  const editStudentHandler = (e) => {
    e.preventDefault();
    changeIsDisInput(true);
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
    const dataSubmit = {
      _id: props.stuData._id,
      data: dataStudent,
    };
    //Chạy fetch put
    fetch("/api/quan-ly-hoc-sinh", {
      method: "PUT",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    });
    //Reload lại trang đẻ có thông tin cập nhật
    // router.replace('/quan-ly-hoc-sinh')
    router.replace(`/quan-ly-hoc-sinh/chi-tiet/${props.stuData._id}`);
  };
  //Xử lý side effect giá trị mặc định cho 3 thằng này trước
  useEffect(() => {
    if (props.stuData && props.stuData.singleClass) {
      changeIsSingle(props.stuData.singleClass);
    }
    if (props.stuData && props.stuData.groupClass) {
      changeIsGroup(props.stuData.groupClass);
    }
    if (props.stuData && props.stuData.sex) {
      changeSex(props.stuData.sex);
    }
  }, []);
  //Lây từ prop về các thông tin sau để render
  return (
    <section className={classes.container}>
      <h3>Thông tin học sinh</h3>
      {isDisableInput && (
        <button className={classes["btn-sub"]} onClick={activeEditHandler}>
          Sửa thông tin
        </button>
      )}

      <form onSubmit={editStudentHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="single">Cá nhân *</label>
            <div
              onClick={!isDisableInput ? checkSingleHandler : offClickHandler}
              className={
                !isSingle
                  ? classes["btn-check"]
                  : `${classes["btn-check"]} ${classes["btn-checked"]}`
              }
            ></div>
            <label htmlFor="group">Nhóm *</label>
            <div
              onClick={!isDisableInput ? checkGroupHandler : offClickHandler}
              className={
                !isGroup
                  ? classes["btn-check"]
                  : `${classes["btn-check"]} ${classes["btn-checked"]}`
              }
            ></div>
            <label>Giới tính *</label>
            <select
              onChange={selectSexHandler}
              defaultValue={sex}
              required
              disabled={isDisableInput ? "disabled" : ""}
            >
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
              defaultValue={
                props.stuData && props.stuData.dateBorn ? props.stuData.dateBorn : ""
              }
              required
              disabled={isDisableInput ? "disabled" : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Học phí cá nhân *</label>
            <input
              ref={singleFeeRef}
              className={classes["input-money"]}
              type="number"
              min="0"
              step="1000"
              defaultValue={
                props.stuData && props.stuData.singleFee ? props.stuData.singleFee : ""
              }
              required
              disabled={isDisableInput ? "disabled" : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Học phí nhóm *</label>
            <input
              ref={groupFeeRef}
              className={classes["input-money"]}
              type="number"
              min="0"
              step="1000"
              defaultValue={
                props.stuData && props.stuData.groupFee ? props.stuData.groupFee : ""
              }
              required
              disabled={isDisableInput ? "disabled" : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Tên học sinh *</label>
            <input
              ref={nameStuRef}
              className={classes["input-name"]}
              type="text"
              required
              disabled={isDisableInput ? "disabled" : ""}
              defaultValue={props.stuData && props.stuData.nameStu ? props.stuData.nameStu : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Tên phụ huynh </label>
            <input
              ref={nameParentRef}
              className={classes["input-name"]}
              type="text"
              disabled={isDisableInput ? "disabled" : ""}
              defaultValue={
                props.stuData && props.stuData.nameParent ? props.stuData.nameParent : ""
              }
            />
          </div>
          <div className={classes.control}>
            <label>Số điện thoại </label>
            <input
              ref={phoneRef}
              className={classes["input-name"]}
              type="number"
              minLength={10}
              disabled={isDisableInput ? "disabled" : ""}
              defaultValue={props.stuData && props.stuData.phone ? props.stuData.phone : ""}
            />
          </div>
          <div className={classes.control}>
            <label>Địa chỉ </label>
            <input
              ref={addressRef}
              className={classes["input-name"]}
              type="text"
              disabled={isDisableInput ? "disabled" : ""}
              defaultValue={props.stuData && props.stuData.address ? props.stuData.address : ""}
            />
          </div>
          <div className={classes.control}>
            <textarea
              ref={infoRef}
              defaultValue={props.stuData && props.stuData.info ? props.stuData.info : ""}
              rows="7"
              cols="90"
              type="text"
              disabled={isDisableInput ? "disabled" : ""}
            />
          </div>
        </div>
        {!isDisableInput && (
          <div className={classes.actions}>
            <button className="btn btn-submit" type="submit">
              Sửa
            </button>
            <button
              className="btn btn-cancel"
              type="button"
              onClick={cancelAddStuHandler}
            >
              Hủy
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ThongTinChiTiet;
