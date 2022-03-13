import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initDiemDanhNhom = {
  arrDiemDanhNhom: [
    // {
    //     _id: string,
    //     idTea: string,
    //     nameTea: string,
    //     taughtDate: string,
    //     taughtTime: number,
    //     arrLearnedStus: [],
    // }
  ],
};

const DdnSlice = createSlice({
  name: "Điểm danh nhóm slice",
  initialState: initDiemDanhNhom,
  reducers: {
    replaceArrDiemDanhNhom(state, action) {
      state.arrDiemDanhNhom = action.payload;
    }, //Ghi đè mảng redux khi fetch get về từ db
  },
});

export const DdnActions = DdnSlice.actions;

export const fetchGetArrDiemDanhNhom = () => {
  return async (dispatchFn) => {
      dispatchFn(LoadingActions.activeLoading())
      try {
        const response = await fetch('/api/diem-danh-nhom');
        dispatchFn(LoadingActions.deactiveLoading())
        const data = await response.json()
        dispatchFn(DdnActions.replaceArrDiemDanhNhom(data.data))
      }
      catch(error){
        dispatchFn(LoadingActions.deactiveLoading())
      }
  };
};

export default DdnSlice.reducer;
