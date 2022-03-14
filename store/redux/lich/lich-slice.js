import { createSlice } from "@reduxjs/toolkit";

const initLich = {
  arrLich: [
    // {
    //   idCell: `cell-${i}`,
    //   date: "",
    //   weekday: getWeekday(i),
    //   disable: false,
    //   singleClass: false,
    //   groupClass: false,
    //   bothClass: false,
    //   arrValue: [],
    // },
  ],
  arrExp: [
    { cell: 1, label: "Mon" },
    { cell: 2, label: "Tue" },
    { cell: 3, label: "Wed" },
    { cell: 4, label: "Thu" },
    { cell: 5, label: "Fri" },
    { cell: 6, label: "Sat" },
    { cell: 7, label: "Sun" },
  ],
};

//Callback để lấy tên weekday cho công tác tạo lịc
const getWeekday = (val) => {
  if (val % 7 === 1) {
    return "Mon";
  }
  if (val % 7 === 2) {
    return "Tue";
  }
  if (val % 7 === 3) {
    return "Wed";
  }
  if (val % 7 === 4) {
    return "Thu";
  }
  if (val % 7 === 5) {
    return "Fri";
  }
  if (val % 7 === 6) {
    return "Sat";
  }
  if (val % 7 === 0) {
    return "Sun";
  }
};
//Callback hỗ trợ active lớp tượng ứng
const activeTypeClass = (classObj) => {
  //Lấy về arrValue
  const arrValue = classObj.arrValue;
  const arrSingleValue = arrValue.filter((cv) => cv === "single");
  const arrGroupValue = arrValue.filter((cv) => cv === "group");
  //Kiểm tra
  if (arrSingleValue.length > 0) {
    classObj.singleClass = true;
  } else {
    classObj.singleClass = false;
  }
  if (arrGroupValue.length > 0) {
    classObj.groupClass = true;
  } else {
    classObj.groupClass = false;
  }
  if (classObj.singleClass && classObj.groupClass) {
    classObj.bothClass = true;
  } else {
    classObj.bothClass = false;
  }
};

const LichSlice = createSlice({
  name: "Lịch Slice",
  initialState: initLich,
  reducers: {
    createInitCalendar(state) {
      if (state.arrLich.length === 0) {
        for (let i = 1; i < 43; i++) {
          state.arrLich.push({
            idCell: `cell-${i}`,
            date: "",
            weekday: getWeekday(i),
            disable: false,
            singleClass: false,
            groupClass: false,
            bothClass: false,
            arrValue: [],
          });
        }
      } else {
        return;
      }
    }, //Khởi tạo 42 ô lich
    createFinalCalendar(state, action) {
      if (state.arrLich.length > 0) {
        //Des data submit lên
        const { firstWeekday, lastDayNum, monthYear } = action.payload;
        //Đầu tiên là chạy disabled hết các ô
        state.arrLich.forEach((cv) => (cv.disable = true));
        //Dựa vào tên của ngày 1 trong tháng, xác định thứ --> rồi trả về stt cell
        const firstCellNum = state.arrExp.find(
          (cv) => cv.label === firstWeekday
        ).cell;
        const lastCellNum = firstCellNum + lastDayNum;
        //Chạy vòng lặp thứ 1 để kích hoạt ngày
        for (let i = firstCellNum; i < lastCellNum; i++) {
          //Xác định thằng này trong mảng
          const curDayInArr = state.arrLich[i - 1];
          curDayInArr.disable = false;
        }
        //Lọc lại mảng disable false ~ mảng ngày thực trong tháng
        const arrTrueDates = state.arrLich.filter(
          (date) => date.disable === false
        );
        //Chạy vòng lặp thứ 2 để đánh số cho ngày
        for (let i = 1; i < lastDayNum + 1; i++) {
          arrTrueDates[i - 1].date = i;
        }
      }
    }, // Đánh số cho lich với tháng tương ứng
    addDataToMultiDates(state, action) {
      //Des data cần từ submit lên
      const { arrSelectedDates, typeClass } = action.payload;
      //Kiểm tra
      if (arrSelectedDates.length === 0 || typeClass.trim().length === 0) {
        return;
      }
      //Map về mảng labels tương ứng
      const arrSelectedLabels = arrSelectedDates.map((cv) => cv.val);
      //Chạy vòng lặp xử lý thêm data
      arrSelectedLabels.forEach((label) => {
        //Lọc lại mảng những ngày trùng weekday với label và không bị dis
        const arrWeekday = state.arrLich.filter(
          (date) => date.weekday === label && date.disable === false
        );
        //Đẩy lớp vào cái đã
        arrWeekday.forEach((date) => {
          const arrValueExits = [...date.arrValue];
          arrValueExits.push(typeClass);
          date.arrValue = arrValueExits;
        });
        //Tiến hành kích hoạt và thêm data vào những ngày này
        arrWeekday.forEach((date) => {
          // //Xử lý biến stye cho ngày
          // if (typeClass === "single") {
          //   date.singleClass = true;
          // }
          // if (typeClass === "group") {
          //   date.groupClass = true;
          // }
          // if (date.singleClass && date.groupClass) {
          //   date.bothClass = true;
          // }
          activeTypeClass(date);
        });
      });
    }, //Thêm data vào nhiều ngày
    delDataMultiDates(state, action) {
      if (action.payload.length === 0) {
        return;
      }
      //Lấy về mảng label
      const arrSelectedLabels = action.payload.map((cv) => cv.val);
      //Chạy lặp cho từng label để tiến hành xóa dât của những ngày có cùng label
      arrSelectedLabels.forEach((label) => {
        //Lọc lại mảng ngày có weekday trùng với label
        const arrWeekday = state.arrLich.filter(
          (date) => date.weekday === label && date.disable === false
        );
        //Clear data cho mảng lọc này
        arrWeekday.forEach((date) => {
          date.singleClass = false;
          date.groupClass = false;
          date.bothClass = false;
          date.arrValue = [];
        });
      });
    }, //Xóa đata nhiều ngày được chọn
    clearAllDatesDate(state) {
      state.arrLich.forEach((date) => {
        date.singleClass = false;
        date.groupClass = false;
        date.bothClass = false;
        date.arrValue = [];
      });
    },
    addSingleDate(state, action) {
      //Des data cần
      const { idCell, typeClass } = action.payload;
      if (typeClass === "none") {
        return;
      }
      //Tìm kiếm cell dựa trên id đẻ eit
      const dateMatched = state.arrLich.find((date) => date.idCell === idCell);
      if (dateMatched) {
        dateMatched.arrValue.push(typeClass);
        //Chạy kích hoạt loại
        activeTypeClass(dateMatched);
      }
    }, //Thêm thông tin cho ngày được chọn
    minusSingleDate(state, action) {
      //Des data cần
      const { idCell, typeClass } = action.payload;
      if (typeClass === "none") {
        return;
      }
      //Tìm kiếm cell dựa trên id đẻ eit
      const dateMatched = state.arrLich.find((date) => date.idCell === idCell);
      if (dateMatched) {
        //Tìm kiếm xem typeClass đã tồn tại chưa, nếu có mới trừ không thì return
        const indexTypeClassExist = dateMatched.arrValue.findIndex(
          (cv) => cv === typeClass
        );
        if (indexTypeClassExist !== -1) {
          dateMatched.arrValue.splice(indexTypeClassExist, 1);
          //Chạy kích hoạt loại
          activeTypeClass(dateMatched);
        } else {
          return;
        }
      }
    }, //Bớt thông tin cho ngày được chọn
    clearSingleDate(state, action) {
      const idCell = action.payload;
      //Tìm kiếm ô tương ứng
      const dateMatched = state.arrLich.find((date) => date.idCell === idCell);
      if (dateMatched) {
        dateMatched.singleClass = false;
        dateMatched.groupClass = false;
        dateMatched.bothClass = false;
        dateMatched.arrValue = [];
      }
    }, //Xóa thông tin cho ngày được chọn
  },
});

export const LichActions = LichSlice.actions;

export default LichSlice.reducer;
