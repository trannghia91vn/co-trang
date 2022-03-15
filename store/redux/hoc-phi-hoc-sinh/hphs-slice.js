import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initHphs = {
  arrHocPhiHocSinh: [
    // {
    //     _id: 'id của tháng học phí được lưu trên db',
    //     idStu: '',
    //     nameStu: '',
    //     monthYear: '',
    //     totalSingleDates: '',
    //     totalSingleFee: '',
    //     totalGroupDates: '',
    //     totalGroupFee: '',
    //     totalMonthFee: ''
    //  }
  ],
};

const HphsSlice = createSlice({
  name: "Học Phí Học Sinh Slice",
  initialState: initHphs,
  reducers: {
    replaceArrHocPhiHocSinh(state, action) {
        state.arrHocPhiHocSinh = action.payload;
    }, //Ghi đề mảng học phí khi load từ db về
  },
});

export const HphsActions = HphsSlice.actions;

//Tạo thunk get mảng học phí học sinh về lần đầu
export const fetchGetArrHocPhiHocSinh = () => {
  return async (dispatchFn) => {
    dispatchFn(LoadingActions.activeLoading());
    try {
      const response = await fetch("/api/hoc-phi-hoc-sinh");
      dispatchFn(LoadingActions.deactiveLoading());
      const data = await response.json();
      dispatchFn(HphsActions.replaceArrHocPhiHocSinh(data.data));
    } catch (error) {
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default HphsSlice.reducer;
