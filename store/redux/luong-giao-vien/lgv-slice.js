import { createSlice } from "@reduxjs/toolkit";
import {
  getArrStudentsTaughtByIdTeaMonthYear,
  getArrDdcnHandeled,
  getInitArrLuongNhom,
} from "../../../support/luong-giao-vien/lgn-uti";

const initLuongGiaoVien = {
  //Những mảng bên dưới dùng cho thao tác nội bộ redux, tương ứng lần đầu click chọn giáo viên chỉ dùng cho giao diẹn tính lương giáo vien
  arrLuongCaNhan: [],
  arrLuongNhom: [],
  arrPhuPhi: [],
  //Nhứng mảng bên dưới dùng cho load data từ db về và thao tác ở giào diện chỉnh sửa
};

const LgvSlice = createSlice({
  name: "Lương giáo viên slice",
  initialState: initLuongGiaoVien,
  reducers: {
    ////////////// NHÓM REDUCER DÙNG CHO GIAO DIỆN TÍNH LƯƠNG GIÁO VIÊN ///////////////
    createArrLuongCaNhan(state, action) {
      //Des về props cần thiết
      const { arrDDCN, idTeacher, objMonthYear } = action.payload;
      //Xử lý bước 1 để lấy data
      const arrDdcnStep1 = getArrStudentsTaughtByIdTeaMonthYear(
        arrDDCN,
        idTeacher,
        objMonthYear
      );
      //Xử lý bước 2 để lây data cuối cùng
      const arrResult = getArrDdcnHandeled(arrDdcnStep1);
      //Ghi đè vào state đẻ tạo mảng nội bộ có thẻ tương tác
      state.arrLuongCaNhan = arrResult;
    }, //Xử lý khi một giáo viên được click thì tạo arr chứa thông tin render cho lương cá nhân
    changeStuScale(state, action) {
      //Des
      const { idStu, scale } = action.payload;
      //Tìm đối tượng học sinh
      const objStuMatched = state.arrLuongCaNhan.find(
        (cv) => cv.idStu === idStu
      );
      //Thay đổi scale
      if (objStuMatched) {
        objStuMatched.scale = scale;
      }
    }, //Thay đổi hệ số của đối tượng học sinh trong mảng lương cá nhân
    createArrLuongNhom(state, action) {
      //Des
      const { arrDiemDanhNhom, idTea, monthYear } = action.payload;
      //Chuyền hóa arrDiemDanhNhom thành arrLuongNhom ban đầu
      const arrLuongNhom = getInitArrLuongNhom(
        arrDiemDanhNhom,
        idTea,
        monthYear
      );
      //Ghi đè
      state.arrLuongNhom = arrLuongNhom;
    }, //Xử lý khi một giáo viên được lcick thì tạo arr cho xử lý lương nhóm
    addDescriptionToDate(state, action) {
      //Des
      const { idGroupDate, description } = action.payload;
      console.log(action.payload);
      //Tìm ngày theo id và chỉnh sủa mô tả của nó
      const dateMatched = state.arrLuongNhom.find(
        (cv) => cv.idGroupDate === idGroupDate
      );
      if (dateMatched) {
        dateMatched.description = description;
      }
    }, //Thêm ghi chú vào ngày lương nhóm
    delDescriptionDate(state, action) {
      //Des
      const idGroupDate = action.payload;
      //Tìm ngày theo id và chỉnh sủa mô tả của nó
      const dateMatched = state.arrLuongNhom.find(
        (cv) => cv.idGroupDate === idGroupDate
      );
      if (dateMatched) {
        dateMatched.description = "";
      }
    }, //Thêm ghi chú vào ngày lương nhóm
    addPlusWage(state, action) {
      //Đánh id cho đối tượng được bổ sung vào
      let idPlusWageDate = "";
      if (state.arrPhuPhi.length === 0) {
        idPlusWageDate = "pls-1";
      } else {
        const lastId = state.arrPhuPhi[state.arrPhuPhi.length - 1].idPlusWageDate;
        const lastIdNum = +lastId.split("-")[1];
        idPlusWageDate = `pls-${lastIdNum + 1}`;
      }
      //Thêm vào cho data submit lên
      const remakeDataSubmit = {
        idPlusWageDate,
        ...action.payload,
      };
      //Đẩy vaò
      state.arrPhuPhi.push(remakeDataSubmit);
    }, //Thêm phụ phí
    delPlusWageDate(state, action) {
      const idPlusWageDate = action.payload;
      const indexDateMatched = state.arrPhuPhi.findIndex(
        (cv) => cv.idPlusWageDate === idPlusWageDate
      );
      if (indexDateMatched !== -1) {
        state.arrPhuPhi.splice(indexDateMatched, 1);
      }
    }, //Xóa ngày phụ phí

    ////////////// NHÓM REDUCER DÙNG CHO GIAO DIỆN EDIT LƯƠNG GIÁO VIÊN ///////////////
  },
});

export const LgvActions = LgvSlice.actions;

export default LgvSlice.reducer;
