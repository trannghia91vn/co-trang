import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initLopNhom = {
  arrLopNhom: [],
};

const QllnSlice = createSlice({
  name: "Quản lý lớp nhóm slice",
  initialState: initLopNhom,
  reducers: {
    replaceArrLopNhom(state, action) {
      state.arrLopNhom = action.payload;
    }, //Func này là get từ db về ghi đè
  },
});

export const QllnActions = QllnSlice.actions;

//Thunks lấy data từ db và ghi đè vào redux để làm nội bộ
export const fetchGetArrLopNhom = () => {
  return async (dispatchFn) => {
    dispatchFn(LoadingActions.activeLoading());
    try {
      const response = await fetch("/api/quan-ly-lop-nhom");
      dispatchFn(LoadingActions.deactiveLoading());
      const data = await response.json();
      dispatchFn(QllnActions.replaceArrLopNhom(data.data));
    } catch (error) {
      console.log(error);
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default QllnSlice.reducer;
