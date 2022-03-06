import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initQlhs = {
  arrStudents: [
    //   {address: ""
    // dateBorn: "1991-03-29"
    // groupClass: false
    // groupFee: 2000
    // info: "Thông tin cơ bản về trẻ."
    // nameParent: ""
    // nameStu: "Test 2"
    // phone: ""
    // sex: "male"
    // singleClass: true
    // singleFee: 1000
    // _id: "621ed48e7d158c6fbbca1167"}
  ],
};

const QlhsSlice = createSlice({
  name: "Quản lý học sinh slice",
  initialState: initQlhs,
  reducers: {
    // NHÓM FUNCITON GHI DATA
    //Chạy ghi đè lại mảng nội bộ để thao tác
    replaceArrStudents(state, action) {
      state.arrStudents = action.payload;
    },
    // NHÓM FUNCITON LẤY DATA
  },
});

export const QlhsActions = QlhsSlice.actions;

//Tạo thunks func để get data từ db và ghi đè vào redux
export const fetchGetStudentData = () => {
  return async (dispatchFn) => {
    dispatchFn(LoadingActions.activeLoading());
    try {
      const response = await fetch("/api/quan-ly-hoc-sinh");
      dispatchFn(LoadingActions.deactiveLoading());

      const data = await response.json();
      dispatchFn(QlhsActions.replaceArrStudents(data.data));
    } catch (error) {
      console.log("Fetch get stu data is failed");
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default QlhsSlice.reducer;
