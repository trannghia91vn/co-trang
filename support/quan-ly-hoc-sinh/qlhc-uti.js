//Lọc mảng hóc sinh cá nhân từ mảng hs tổng
export const getSingleArrStuddents = (arrAllStus) => {
  const arrSinlgeStus = arrAllStus.filter((cv) => cv.singleClass);
  return arrSinlgeStus;
};
//Lọc mảng hóc sinh nhóm từ mảng hs tổng
export const getGroupArrStuddents = (arrAllStus) => {
  const arrGroupStus = arrAllStus.filter((cv) => cv.groupClass);
  return arrGroupStus;
};
//Lọc đối tượng học sinh theo id từ mảng hs tổng
export const getStuById = (arrAllStus, id) => {
  const objMatched = arrAllStus.find((cv) => cv._id === id);
  return objMatched;
};

//Lọc mảng tags học sinh được chọn
export const getArrSelectedStusTags = (arrStusTags) => {
  const arrStusSelected = arrStusTags.filter((cv) => cv.isSelected);
  return arrStusSelected;
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
  const arrNameStu = arr.map((cv) => cv.nameStu);
  const arrLastNameStu = arrNameStu.map((cv) => getLastName(cv));
  //Sort mảng này lại
  const arrLastNameSort = arrLastNameStu.sort();
  //Tạo mảng rổng chứa kết quả, tìm kiếm tên được sort trong mảng gôc và đẩy
  const arrResult = [];
  arrLastNameSort.forEach((name) => {
    const indexObjMatched = arr.findIndex((cv) => cv.nameStu.includes(name));
    if (indexObjMatched !== -1) {
      arrResult.push(arr[indexObjMatched]);
      arr.splice(indexObjMatched, 1);
    }
  });
  return arrResult;
};
