//Func lọc lại đối tượng điểm danh theo 3 key : id học sinh,tháng và năm bên trong arrDiemDanhCaNhan redux
export const getArrDiemDanhCaNhanByStuAndMonthYear = (
  arrDiemDanhCaNhan,
  idStu,
  month,
  year
) => {
  const result = arrDiemDanhCaNhan.filter(
    (cv) =>
      cv.idStu === idStu &&
      new Date(cv.dateSingleCheck).getMonth() === +month &&
      new Date(cv.dateSingleCheck).getFullYear() === +year
  );
  return result;
};

//Lấy tên giáo viên theo id giáo viên
export const getTeaNameById = (arrTeachers, id) => {
  const result = arrTeachers.find((cv) => cv._id === id);
  return result.name;
};

//Func sắp xếp lại mảng ngày điểm danh theo thứ tự tăng dần
export const sortDateChecked = (arr) => {
  const arrSort = arr.sort((a, b) =>
    new Date(a.dateSingleCheck).getDate() >
    new Date(b.dateSingleCheck).getDate()
      ? 1
      : -1
  );
  return arrSort;
};

//Func lọc mảng điểm danh cá nhân theo ngày tháng now
export const getArrDiemDanhCaNhanNow = (arrDiemDanhCaNhan) => {
  const now = new Date();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  const result = arrDiemDanhCaNhan.filter(
    (cv) =>
      new Date(cv.dateSingleCheck).getMonth() === nowMonth &&
      new Date(cv.dateSingleCheck).getFullYear() === nowYear
  );
  return result;
};
