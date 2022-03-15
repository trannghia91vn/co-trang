//Func lấy ngày đầu và ngày cuối của tháng từ đối tượng tháng năm
export const getFirstLastDateOfMonth = (objMonthYear) => {
  let formatDate = `${objMonthYear.year}-${objMonthYear.month}-01`;
  if (objMonthYear.month.toString().length === 1) {
    formatDate = `${objMonthYear.year}-0${objMonthYear.month}-01`;
  }
  const date = new Date(formatDate);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstWeekday = firstDay.toLocaleString("en-US", { weekday: "short" });
  const lastDayNum = lastDay.getDate();
  return { firstWeekday, lastDayNum };
};

//Func lọc lại một cột thứ có được điểm danh hay không
export const getColumnWeekdayData = (arrLich, weekdayshort) => {
  //Lọc lại mảng ngày theo weekday cung cấp
  const arrWeekday = arrLich.filter((date) => date.weekday === weekdayshort);
  //Lây về phần tử đầu tiên --> lấy mảng arrValue của nó --> đếm lạo điểm danh trong đó
  const arrValue = arrWeekday[1].arrValue;
  //Tiến hành đếm
  let countSingle = 0;
  let countGroup = 0;
  let countTotal = 0;
  if (arrValue.length > 0) {
    const arrValueSingle = arrValue.filter((cv) => cv === "single");
    countSingle = arrValueSingle.length;
    const arrValueGroup = arrValue.filter((cv) => cv === "group");
    countGroup = arrValueGroup.length;
    countTotal = countGroup + countSingle;
  }
  if (countSingle !== 0 || countGroup !== 0) {
    return {
      weekday: weekdayshort,
      countSingle,
      countGroup,
      countTotal,
    };
  }
};

//Func xử lý đếm ngày học cá nhân và nhóm trong lịch
export const countSingleGroupDates = (arrLich) => {
  //Đầu tiên là lọc lại mảng cell không bị dis
  const arrLichWithoutDis = arrLich.filter((cell) => cell.disable === false);
  //Tiếp đến là lọc lại mảng cell mà cell đó có arrValue không rỗng
  const arrLichWithArrValue = arrLichWithoutDis.filter(
    (cell) => cell.arrValue.length > 0
  );
  //Map về mảng chứa các mảng arrValue
  const arrOfArrValues = arrLichWithArrValue.map((cv) => cv.arrValue);
  //Đẩy các giá trị của từng cell vào mảng chứa
  let arrResult = [];
  arrOfArrValues.forEach((arr) => arr.forEach((val) => arrResult.push(val)));
  //Lọc lại mảng sing và mảng group để đếm
  const arrSingleVal = arrResult.filter((cv) => cv === "single");
  const arrGroupVal = arrResult.filter((cv) => cv === "group");
  //Trả lại két quả
  return {
    totalSingle: arrSingleVal.length,
    totalGroup: arrGroupVal.length,
  };
};

//Func xử lý tính tiền cá nhân, tiền nhớm ,tiền tổng
export const calcMoneyMonthStu = (
  arrStudents,
  idStu,
  totalSingle,
  totalGroup,
  arrDiemDanhCaNhanThangTruoc,
) => {
  //Xử lý data tháng trước
  let totalPreMonthOffDates = 0;
  let totalPreMonthReplaceDates = 0;
  let totalPreMonthPlusDates = 0;
  if (arrDiemDanhCaNhanThangTruoc.length > 0) {
    const arrOffDates = arrDiemDanhCaNhanThangTruoc.filter(date=>date.typeSingleCheck === 'nghi')
    const arrReplaceDates = arrDiemDanhCaNhanThangTruoc.filter(date=>date.typeSingleCheck === 'bu')
    const arrPlusDates = arrDiemDanhCaNhanThangTruoc.filter(date=>date.typeSingleCheck === 'tang')
    totalPreMonthOffDates = arrOffDates.length;
    totalPreMonthReplaceDates = arrReplaceDates.length;
    totalPreMonthPlusDates = arrPlusDates.length;
  }

  //Tìm học sinh trong mảng học sinh và lấy props tiền lương cá nhânn và tháng
  const stuMatched = arrStudents.find((stu) => stu._id === idStu);
  let totalMoneySingle = 0;
  let totalMoneyGroup = 0;
  let totalMoneyMonth = 0;
  let totalPreMonthMoneyOff = 0;
  let totalPreMonthMoneyPlus = 0;
  let totalPreMonthMoneyReplace = 0;
  if (stuMatched) {
    const singleFee = stuMatched.singleFee;
    const groupFee = stuMatched.groupFee;
    totalMoneySingle = singleFee * totalSingle;
    totalMoneyGroup = groupFee * totalGroup;
    totalPreMonthMoneyOff = singleFee * totalPreMonthOffDates;
    totalPreMonthMoneyPlus = singleFee * totalPreMonthPlusDates;
    totalPreMonthMoneyReplace = singleFee * totalPreMonthReplaceDates;
    totalMoneyMonth = totalMoneyGroup + totalMoneySingle-totalPreMonthMoneyOff+totalPreMonthMoneyPlus+totalPreMonthMoneyReplace;
  }
  return {
    totalMoneySingle,
    totalMoneyGroup,
    totalPreMonthMoneyOff,
    totalPreMonthMoneyPlus,
    totalPreMonthMoneyReplace,
    totalMoneyMonth,
    totalPreMonthOffDates,
    totalPreMonthReplaceDates,
    totalPreMonthPlusDates
  };
};

//Func định dạng lai tiền cho dễ nhìn
export const formatMoney = val => {
  let result = val.toString();
  let input = val.toString().length
  // 1.000.000.000
  if (input > 3 && input <7) {
    result = `${result.substring(0,result.length-3)}.${result.substr(result.length-3,3)}`
  }
  if (input > 6 && input <10) {
    result = `${result.substring(0,result.length-6)}.${result.substr(result.length-6,3)}.${result.substr(result.length-3,3)}`
  }
  return result;
}
