import { createSlice } from "@reduxjs/toolkit";
import { LoadingActions } from "../loading/loading-slice";

const initTeacher = {
  arrTeachers: [],
  arrTeacherTags: [],
};

const QlgvSlice = createSlice({
  name: "Quản lý giáo viên slice",
  initialState: initTeacher,
  reducers: {
    replaceArrTeachers(state, action) {
      state.arrTeachers = action.payload;
    },
    createArrTeacherTags(state) {
      const arrTeachers = [...state.arrTeachers];
      if (arrTeachers.length > 0) {
        state.arrTeacherTags = arrTeachers.map((cv) => {
          return {
            id: cv._id,
            name: cv.name,
            isSelected: false,
          };
        });
      } else {
        return;
      }
    },
    //Func kích hoạt và hủy kích hoạt teacher tags
    activeTeaTag(state, action) {
      const tagMatched = state.arrTeacherTags.find(
        (tag) => tag.id === action.payload
      );
      if (tagMatched) {
        tagMatched.isSelected = true;
      }
    },
    deactiveTeaTag(state, action) {
      const tagMatched = state.arrTeacherTags.find(
        (tag) => tag.id === action.payload
      );
      if (tagMatched) {
        tagMatched.isSelected = false;
      }
    },
    clearAllTag(state) {
      state.arrTeacherTags.forEach((tag) => (tag.isSelected = false));
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
      //Ghi đề arrTeachers và tạo arr Tags cho redux
      dispatchFn(QlgvActions.replaceArrTeachers(data.data));
      dispatchFn(QlgvActions.createArrTeacherTags())
    } catch (error) {
      console.log("Get thông tin giáo viên lỗi.");
      dispatchFn(LoadingActions.deactiveLoading());
    }
  };
};

export default QlgvSlice.reducer;
