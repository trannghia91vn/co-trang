import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initDdcn = {
  arrDiemDanhCaNhan: [
    // {
    //   _id: "t1",
    //   idStu: "ok1",
    //   nameStu: "Chí Pèo",
    //   idTeacherTaught: "tea-1",
    //   minutesTaught: 45,
    //   dateSingleCheck: "2022-03-11",
    //   typeSingleCheck: "them",
    // },
  ],
};

const DdcnSlice = createSlice({
  name: "Điểm danh cá nhân slice",
  initialState: initDdcn,
  reducers: {
    replaceArrDdcn(state, action) {
      state.arrDiemDanhCaNhan = action.payload;
    }, //Dùng fetch get và ghi đè lại để dùng nội bộ trong giao diện
  },
});

export const DdcnActions = DdcnSlice.actions;

export const fetchGetArrDiemDanhCaNhan = () => {
  return async dispatchFn => {
    dispatchFn(LoadingActions.activeLoading())
    try{
      const response = await fetch('/api/diem-danh-ca-nhan');
      dispatchFn(LoadingActions.deactiveLoading())
      const dataGot = await response.json()
      dispatchFn(DdcnActions.replaceArrDdcn(dataGot.data))
    }
    catch(error){
      dispatchFn(LoadingActions.deactiveLoading())
    }
  }
}

export default DdcnSlice.reducer;
