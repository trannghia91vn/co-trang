import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initTeacher = {
  arrTeachers: [],
};

const QlgvSlice = createSlice({
  name: "Quản lý giáo viên slice",
  initialState: initTeacher,
  reducers: {
    replaceArrTeachers(state, action) {
      state.arrTeachers = action.payload;
    },
  },
});

export const QlgvActions = QlgvSlice.actions;

//Tạo thunks func để fetch get data của qlgv
export const fetchGetArrTeacher = () => {
  return async (dispatchFn) => {
    dispatchFn(LoadingActions.activeLoading());
    try {
      const response = await fetch("/api/quan-ly-giao-vien");
      dispatchFn(LoadingActions.deactiveLoading());
      const data = await response.json();
      dispatchFn(QlgvActions.replaceArrTeachers(data.data));
    } catch (error) {
      console.log("Get thông tin giáo viên lỗi.");
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default QlgvSlice.reducer;
