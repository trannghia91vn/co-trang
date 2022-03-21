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
      new Date(cv.dateSingleCheck).getMonth() === +month-1 &&
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

//Func lọc mảng điểm danh cá nhân theo ngày tháng now
export const getArrDiemDanhCaNhanMonthYear = (arrDiemDanhCaNhan,month,year) => {
  const result = arrDiemDanhCaNhan.filter(
    (cv) =>
      new Date(cv.dateSingleCheck).getMonth() === month-1 &&
      new Date(cv.dateSingleCheck).getFullYear() === year
  );
  return result;
};

//Callback lấy Phần tên : ví dụ : Trần Nghĩa ->> lấy Nghĩa : phục vụ cho func bên dưới
const getLastName = (name) => {
  const arrNameSplit = name.trim().split(" ");
  const lastName = arrNameSplit[arrNameSplit.length - 1];
  return lastName;
};
//Lọc lại mảng theo thứ tự tên abc
export const sortArrByName = (arr) => {
  //CHú ý : khi tái sủ dụng cái này thì thay props nameStu tương ứng bên dưới là đượcÏ
  //map về mảng lastname
  const arrNameStu = arr.map((cv) => cv.name);
  const arrLastNameStu = arrNameStu.map((cv) => getLastName(cv));
  //Sort mảng này lại
  const arrLastNameSort = arrLastNameStu.sort();
  //Tạo mảng rổng chứa kết quả, tìm kiếm tên được sort trong mảng gôc và đẩy
  const arrResult = [];
  arrLastNameSort.forEach((name) => {
    const indexObjMatched = arr.findIndex((cv) => cv.name.includes(name));
    if (indexObjMatched !== -1) {
      arrResult.push(arr[indexObjMatched]);
      arr.splice(indexObjMatched, 1);
    }
  });
  return arrResult;
};

