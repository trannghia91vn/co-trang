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
      new Date(cv.dateSingleCheck).getMonth() === +month - 1 &&
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
export const getArrDiemDanhCaNhanMonthYear = (
  arrDiemDanhCaNhan,
  month,
  year
) => {
  const result = arrDiemDanhCaNhan.filter(
    (cv) =>
      new Date(cv.dateSingleCheck).getMonth() === month - 1 &&
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

//Func update lại data cho lương giáo viên khi có điểm danh mới
export const updateDataLuongCaNhan = (
  arrLuongGiaoVien,
  idTea,
  idStu,
  monthYear,
  dateSingleCheck,
  taughtTime
) => {
  //Clone mảng luong giáo vinee để tránh nảh hương
  const arrLuongThangGiaoVien = [...arrLuongGiaoVien]
  //Đầu tiên là tìm ra đối tượng lương tháng dựa trên id giáo viên và monthYear
  const dataMonthWageByTeaMonthYear = arrLuongThangGiaoVien.find(
    (cv) =>
      cv.idTea === idTea &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );
  //Tách về _id lương tháng tìm được để chạy update
  const idMonthWageMatched = dataMonthWageByTeaMonthYear._id;
  //Trả về mảng arrLuongCaNhan để tiến hành update
  const arrLuongCaNhan = [...dataMonthWageByTeaMonthYear.arrLuongCaNhan];
  //Tìm trong mảng này học sinh được điêm danh thoe : idTea,idStu,monthYear
  const dataStuMatched = arrLuongCaNhan.find(
    (cv) =>
      cv.idTea === idTea &&
      cv.idStu === idStu &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );
  //Khi tìm thấy thì trả về arr taughtData để update ngày điểm danh mới
  const arrTaughtData = dataStuMatched.taughtData;
  //Thêm mới vào mảng này
  arrTaughtData.push({
    dateSingleCheck: dateSingleCheck,
    taughtTime: taughtTime,
  });
  //Thay thế kết quả
  dataMonthWageByTeaMonthYear.arrLuongCaNhan = arrLuongCaNhan;
  //Tách props _id ra đẻ có phần data phù hơp cho submit put
  delete dataMonthWageByTeaMonthYear._id
  //Trả về obj tương thích update
  return {
    id : idMonthWageMatched,
    data : dataMonthWageByTeaMonthYear,
  }
};
