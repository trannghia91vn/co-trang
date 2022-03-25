import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";
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
  arrLuongThangGiaoVien: [],
};

//tạo Callback hỗ trợ tìm đối tượng lương tháng theo idTea,monthYear trong arrLuongThangGiaoVien
const getMonthWageByIdTeaMonthYear = (idTea, monthYear, state) => {
  const result = state.arrLuongThangGiaoVien.find(
    (cv) =>
      cv.idTea === idTea &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );
  if (result) {
    return result;
  }
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
        const lastId =
          state.arrPhuPhi[state.arrPhuPhi.length - 1].idPlusWageDate;
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
    getDataDbAndCreateArrDb(state, action) {
      //Ghi đè tương ứng
      state.arrLuongThangGiaoVien = action.payload;
    }, //Khi lấy data từ db về thì chuyền vào đây và tạo các arr tương ứng
    changeSingleStuScale(state, action) {
      //Des
      const { idStu, scale, idTea, monthYear } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      //Tìm đối tượng học sinh
      const objStuMatched = monthWageMatched.arrLuongCaNhan.find(
        (cv) => cv.idStu === idStu
      );
      //Thay đổi scale
      if (objStuMatched) {
        objStuMatched.scale = scale;
      }
    }, //Thay đổi lại hệ số tính trong mảng lương cá nhân của mảng arrLuongThangGiaoVien
    addDesToDateExist(state, action) {
      //Des
      const { idTea, monthYear, idGroupDate, description } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      //Tìm ngày theo id và chỉnh sủa mô tả của nó
      const dateMatched = monthWageMatched.arrLuongNhom.find(
        (cv) => cv.idGroupDate === idGroupDate
      );
      if (dateMatched) {
        dateMatched.description = description;
      }
    }, //Thêm ghi chú của ngày
    delDesDateExist(state, action) {
      //Des
      const { idTea, monthYear, idGroupDate } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      //Tìm ngày theo id và chỉnh sủa mô tả của nó
      const dateMatched = monthWageMatched.arrLuongNhom.find(
        (cv) => cv.idGroupDate === idGroupDate
      );
      if (dateMatched) {
        dateMatched.description = "";
      }
    }, //Xóa ghi chú ngày
    addPlusWageExist(state, action) {
      //Des ra các thông tin cần để tìm đối tượng tháng lương
      const { idTea, monthYear } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      //Đánh id cho đối tượng được bổ sung vào
      let idPlusWageDate = "";
      if (monthWageMatched.arrPhuPhi.length === 0) {
        idPlusWageDate = "pls-1";
      } else {
        const lastId =
          monthWageMatched.arrPhuPhi[monthWageMatched.arrPhuPhi.length - 1]
            .idPlusWageDate;
        const lastIdNum = +lastId.split("-")[1];
        idPlusWageDate = `pls-${lastIdNum + 1}`;
      }
      //Thêm vào cho data submit lên
      const remakeDataSubmit = {
        idPlusWageDate,
        ...action.payload,
      };
      //Đẩy vaò
      monthWageMatched.arrPhuPhi.push(remakeDataSubmit);
    }, //Thêm mới ngày phụ phí vào magnr db
    delPlusWageExist(state, action) {
      //Des ra các thông tin cần để tìm đối tượng tháng lương
      const { idTea, monthYear, idPlusWageDate } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      const indexDateMatched = monthWageMatched.arrPhuPhi.findIndex(
        (cv) => cv.idPlusWageDate === idPlusWageDate
      );
      if (indexDateMatched !== -1) {
        monthWageMatched.arrPhuPhi.splice(indexDateMatched, 1);
      }
    }, //Xóa ngày phụ phí trong db
    replaceArrLCN(state, action) {
      //Des
      const { arrLuongCaNhanData, idTea, monthYear } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      if (monthWageMatched && monthWageMatched.arrLuongCaNhan.length === 0) {
        //Ghi đè lại mảng arrLuongCaNhan của arrLuongThangGiaoVien
        monthWageMatched.arrLuongCaNhan = arrLuongCaNhanData;
      }
    }, //Ghi đè lại để thao tác cho edit
    replaceArrLN(state, action) {
      //Des
      const { arrLuongNhomData, idTea, monthYear } = action.payload;
      //Tìm tháng lương trùng khớp
      const monthWageMatched = getMonthWageByIdTeaMonthYear(
        idTea,
        monthYear,
        state
      );
      if (monthWageMatched && monthWageMatched.arrLuongNhom.length === 0) {
        //Ghi đè lại mảng arrLuongCaNhan của arrLuongThangGiaoVien
        monthWageMatched.arrLuongNhom = arrLuongNhomData;
      }
    }, //Ghi đè lại để thao tác cho edit
  },
});

export const LgvActions = LgvSlice.actions;

//Tạo thunks get data lương giáo viên về
export const fetchGetLuongGiaoVien = () => {
  return async (dispatchFn) => {
    try {
      dispatchFn(LoadingActions.activeLoading());
      const response = await fetch("/api/luong-giao-vien");
      dispatchFn(LoadingActions.deactiveLoading());
      const data = await response.json();
      dispatchFn(LgvActions.getDataDbAndCreateArrDb(data.data));
    } catch (error) {
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default LgvSlice.reducer;
