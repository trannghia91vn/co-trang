export const filterArrDdnIdteaMonthYear = (
  arrDiemDanhNhom,
  idTea,
  objMonthYear
) => {
  const result = arrDiemDanhNhom.filter(
    (cv) =>
      cv.idTea === idTea &&
      new Date(cv.taughtDate).getMonth() === +objMonthYear.month - 1 &&
      new Date(cv.taughtDate).getFullYear() === +objMonthYear.year
  );
  return result;
};

//Func sắp xếp lạo mảng ngày đièm danh nhóm theo ngày tăng dần
export const sortArrByDateIncrease = (arrDiemDanhNhom) => {
  const result = arrDiemDanhNhom.sort((a, b) =>
    new Date(a.taughtDate).getDate() > new Date(b.taughtDate).getDate() ? 1 : -1
  );
  return result;
};
