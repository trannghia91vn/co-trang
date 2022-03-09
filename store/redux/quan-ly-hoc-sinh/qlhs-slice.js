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
  arrStudentTags: [
    // {
    //   id : '',
    //   name : '',
    //   isSelected : null,
    //    groupClass : ''
    // singleClass:''
    // }
  ],
};

const QlhsSlice = createSlice({
  name: "Quản lý học sinh slice",
  initialState: initQlhs,
  reducers: {
    // NHÓM FUNCITON GHI DATA
    //Chạy ghi đè lại mảng nội bộ để thao tác sau khi get về từ db
    replaceArrStudents(state, action) {
      state.arrStudents = action.payload;
    },
    //Tạo mảng tags học sinh với các props cần thiết
    createArrStuTags(state, action) {
      const arrStusTags = action.payload.map((cv) => {
        return {
          id: cv._id,
          name: cv.nameStu,
          isSelected: false,
          singleClass: cv.singleClass,
          groupClass: cv.groupClass,
        };
      });
      state.arrStudentTags = arrStusTags;
    },
    //Tạo func active / deactive tag học sinh
    activeStuTag(state, action) {
      console.log("Its run");
      const objStuMatched = state.arrStudentTags.find(
        (cv) => cv.id === action.payload
      );
      if (objStuMatched) {
        objStuMatched.isSelected = true;
      }
    },
    deActiveStuTag(state, action) {
      const objStuMatched = state.arrStudentTags.find(
        (cv) => cv.id === action.payload
      );
      objStuMatched.isSelected = false;
    },
    clearStuTag(state) {
      state.arrStudentTags.forEach((cv) => (cv.isSelected = false));
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

//Tạo thunks func để lấy data học sinh về từ db sau đó tạo mảng tags học sinh
export const getStusDataAndCreateArrTags = () => {
  return async (dispatchFn) => {
    dispatchFn(LoadingActions.activeLoading());
    try {
      const response = await fetch("/api/quan-ly-hoc-sinh");
      dispatchFn(LoadingActions.deactiveLoading());

      const data = await response.json();
      dispatchFn(QlhsActions.createArrStuTags(data.data));
    } catch (error) {
      console.log("Fetch get stu data is failed");
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default QlhsSlice.reducer;
