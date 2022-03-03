import classes from "./them-moi-gv.module.css";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import NotisContext from "../../../store/context/Notification/noti-context";
import Notification from "../../UI/Notification";
const FormThemMoiGiaoVien = (props) => {
  const router = useRouter();
  const notiCtx = useContext(NotisContext);
  const notiData = notiCtx.objNoti;
  console.log(notiData);
  //Biến state input
  const [sex, changeSex] = useState("male");
  //Biến ref input
  const bornRef = useRef();
  const singleWageRef = useRef();
  const groupWageRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const infoRef = useRef();

  //Func lấy giá trị giới tính
  const selectSexHandler = (e) => {
    changeSex(e.target.value);
  };

  //Callback clear input
  const clearData = () => {
    bornRef.current.value = "";
    singleWageRef.current.value = "";
    groupWageRef.current.value = "";
    nameRef.current.value = "";
    phoneRef.current.value = "";
    addressRef.current.value = "";
    infoRef.current.value = "";
  };

  //Callback chính xử lý thêm mới học sinh
  const addNewTeacherHandler = async (e) => {
    e.preventDefault();
    //Tổng hợp đối tượng học sinh để submit lên api
    const dataTeacher = {
      sex: sex,
      dateBorn: bornRef.current.value,
      singleWage: +singleWageRef.current.value,
      groupWage: +groupWageRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      info: infoRef.current.value,
    };
    //Post request lên custom api route
    fetch('/api/quan-ly-giao-vien',{
      method : 'POST',
      body : JSON.stringify(dataTeacher),
      headers : {'Content-Type':'application/json'}
    }).then(res=>console.log(res))
    //Cuối cùng thì vần clear input để tiếp tục thêm nếu cần
    clearData();
    router.replace('/quan-ly-giao-vien')
  };
  //Callback xử lý hủy thêm
  const cancelAddTeaHandler = () => {
    clearData();
    //Điều hướng về trang quản lý
    router.replace("/quan-ly-giao-vien");
  };

  return (
    <section className={classes.container}>
      <h3>Thêm mới giáo viên</h3>
      <form onSubmit={addNewTeacherHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>

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
              defaultValue="1999-02-20"
              required
            />
          </div>

          <div className={classes.control}>
            <label>Lương cá nhân *</label>
            <input
              ref={singleWageRef}
              className={classes["input-money"]}
              type="number"
              min="0"
              step="1000"
              defaultValue={0}
              required
            />
          </div>

          <div className={classes.control}>
            <label>Lương nhóm *</label>
            <input
              ref={groupWageRef}
              className={classes["input-money"]}
              type="number"
              min="0"
              step="1000"
              defaultValue={0}
              required
            />
          </div>

          <div className={classes.control}>
            <label>Tên giáo viên *</label>
            <input
              ref={nameRef}
              className={classes["input-name"]}
              type="text"
              required
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
              defaultValue="Thông tin cơ bản về giáo viên."
              rows="7"
              cols="90"
              type="text"
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button
            className='btn btn-submit'
            type="submit"
          >
            Thêm mới
          </button>
          <button
            className='btn btn-cancel'
            type="button"
            onClick={cancelAddTeaHandler}
          >
            Hủy thêm
          </button>
        </div>
      </form>
      {notiData.status !== "" && <Notification notiData={notiData} />}
    </section>
  );
};

export default FormThemMoiGiaoVien;
