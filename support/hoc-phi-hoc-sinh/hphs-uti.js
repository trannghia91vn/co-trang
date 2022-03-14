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
    console.log(arrValueSingle)
    countSingle = arrValueSingle.length;
    const arrValueGroup = arrValue.filter((cv) => cv === "group");
    console.log(arrValueGroup)
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
