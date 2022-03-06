import classes from "../them-moi-gv/them-moi-gv.module.css";
import { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { QlgvActions } from "../../../store/redux/quan-ly-giao-vien/qlgv-slice";

const ThongTinChiTietGiaoVien = (props) => {
  const router = useRouter();
  const dispatchFn = useDispatch();
  //Biên state cho phép sửa hay không
  const [isLockedInfo, changeIsLockedInfo] = useState(true);
  //Tách các biến từ props ra để dùng
  const {
    address,
    dateBorn,
    groupWage,
    singleWage,
    info,
    name,
    phone,
    sex: sexD,
    _id,
  } = props.dataDefault;
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

  //Callback chính xử lý sửa thông tin giáo viên
  const editTeacherHandler = async (e) => {
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
    const dataSubmit = {
      _id: _id,
      data: dataTeacher,
    };
    //Post request lên custom api route
    fetch("/api/quan-ly-giao-vien", {
      method: "PUT",
      body: JSON.stringify(dataSubmit),
      headers: { "Content-Type": "application/json" },
    }).then((res) => console.log(res));
    router.replace(`/quan-ly-giao-vien/chi-tiet/${_id}`);
  };
  //Callback xử lý hủy thêm
  const cancleEditHandler = () => {
    changeIsLockedInfo(true);
  };
  const activeEditHandler = () => {
    changeIsLockedInfo(false);
  };

  //Xử lý side effect cho thằng sex làm giá trị mặc định khi props truyền xuống
  useEffect(() => {
    if (sexD) {
      changeSex(sexD);
    }
  }, []);

  return (
    <section className={classes.container}>
      <h3>Thông tin chi tiết giáo viên</h3>
      {isLockedInfo && (
        <button className={classes["btn-sub"]} onClick={activeEditHandler}>
          Sửa thông tin
        </button>
      )}

      <form onSubmit={editTeacherHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Giới tính *</label>
            <select
              onChange={selectSexHandler}
              defaultValue={sexD ? sexD : ""}
              required
              disabled={isLockedInfo ? "disabled" : ""}
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
              defaultValue={dateBorn ? dateBorn : ""}
              required
              disabled={isLockedInfo ? "disabled" : ""}
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
              defaultValue={singleWage ? singleWage : ""}
              required
              disabled={isLockedInfo ? "disabled" : ""}
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
              defaultValue={groupWage ? groupWage : ""}
              required
              disabled={isLockedInfo ? "disabled" : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Tên giáo viên *</label>
            <input
              ref={nameRef}
              className={classes["input-name"]}
              type="text"
              required
              defaultValue={name ? name : ""}
              disabled={isLockedInfo ? "disabled" : ""}
            />
          </div>

          <div className={classes.control}>
            <label>Số điện thoại </label>
            <input
              ref={phoneRef}
              className={classes["input-name"]}
              type="number"
              minLength={10}
              defaultValue={phone ? phone : ""}
              disabled={isLockedInfo ? "disabled" : ""}
            />
          </div>
          <div className={classes.control}>
            <label>Địa chỉ </label>
            <input
              ref={addressRef}
              className={classes["input-name"]}
              type="text"
              defaultValue={address ? address : ""}
              disabled={isLockedInfo ? "disabled" : ""}
            />
          </div>
          <div className={classes.control}>
            <textarea
              ref={infoRef}
              defaultValue={info ? info : ""}
              rows="7"
              cols="90"
              type="text"
              disabled={isLockedInfo ? "disabled" : ""}
            />
          </div>
        </div>

        {!isLockedInfo && (
          <div className={classes.actions}>
            <button className="btn btn-submit" type="submit">
              Sửa
            </button>
            <button
              className="btn btn-cancel"
              type="button"
              onClick={cancleEditHandler}
            >
              Hủy sửa
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ThongTinChiTietGiaoVien;
