//////////////// NHÓM FUNC CHO TÍNH LƯƠNG CÁ NHÂN /////////////////////
//Func chuyển mảng điểm danh cá nhân về data đẻ render cho tính lương giáo vien
export const getArrStudentsTaughtByIdTeaMonthYear = (
  arrDDCN,
  idTeacher,
  objMonthYear
) => {
  //Des thằng objMonthYear ra cho dễ làm
  const { month, year } = objMonthYear;
  //Đầu tiên là lọc theo năm tháng trước, giáo viên bị lồng mảng phức tạp nên lọc sau, thêm điều kiện phải là loại ngày them
  const arrDDCNMonthYear = arrDDCN.filter(
    (cv) =>
      new Date(cv.dateSingleCheck).getMonth() + 1 === month &&
      new Date(cv.dateSingleCheck).getFullYear() === year &&
      cv.typeSingleCheck === "them"
  );
  //Lọc theo id giáo viên có dạy:
  let arrResult = [];
  arrDDCNMonthYear.forEach((cv) => {
    //Lấy về mảng arrTeacherTaught cuả từng phần từ đẻ xử lý
    const arrTeacherTaught = cv.arrTeacherTaught;
    //Chạy lặp trong mảng này nếu thỏa đk trùng id thì lấy cv về
    arrTeacherTaught.forEach((item) => {
      if (item.idTea === idTeacher) {
        //TỔng hợp lại thông tin cần thiết đẩy vào mảng arrResult
        const data = {
          monthYear: objMonthYear,
          idTea: idTeacher,
          idStu: cv.idStu,
          nameStu: cv.nameStu,
          dateSingleCheck: cv.dateSingleCheck,
          taughtTime: item.taughtTime,
          scale: 1,
        };
        arrResult.push(data);
      }
    });
  });
  //Trả về
  return arrResult;
};

//FUnc chuyển mảng xử lý ở trên về mảng tổng hợp để có thể render ra đúng inf cần
export const getArrDdcnHandeled = (arr) => {
  //Đầu tiên là lọc ra mảng các id hoc sinh riêng biệt
  //Lấy về mảng idStu (có lặp)
  const arrIdStu = arr.map((cv) => cv.idStu);
  //Xóa các giá trị idStu trùng lặp trong mảng
  const arrUniqueIdStu = [...new Set(arrIdStu)];
  //Tọa mảng trống chứa kết quả
  const arrResults = [];
  //Chạy vòng lặp xử lý cho từng idStu
  arrUniqueIdStu.forEach((id) => {
    //Lọc về từ mảng chính các stu có idStu trong lượt lặp
    const arrFilterByIdStu = arr.filter((cv) => cv.idStu === id);
    //Tạo mảng trống chứa các cặp dataa : date - taughtTime
    const arrContainer = [];
    //Đẩy data từ mảng lọc này về mảng chứa tren
    arrFilterByIdStu.forEach((cv) => {
      arrContainer.push({
        dateSingleCheck: cv.dateSingleCheck,
        taughtTime: cv.taughtTime,
      });
    });
    //Đẩy về mảng kết quả cuối cùng
    arrResults.push({
      isTea: arr[0].idTea,
      monthYear: arr[0].monthYear,
      idStu: arrFilterByIdStu[0].idStu,
      nameStu: arrFilterByIdStu[0].nameStu,
      scale: arrFilterByIdStu[0].scale,
      taughtData: arrContainer,
    });
  });
  //Trả về kết quả xử lý
  return arrResults;
};

//Funcs lấy lương cá nhân giáo viên
export const getSingleGroupWageTeacher = (arrTeachers, idTea) => {
  let luongCaNhan = 0;
  let luongNhom = 0;
  const objMatched = arrTeachers.find((cv) => cv._id === idTea);
  if (objMatched) {
    luongCaNhan = objMatched.singleWage;
    luongNhom = objMatched.groupWage;
  }
  return { singleWage: luongCaNhan, groupWage: luongNhom };
};

//Func tính tổng giờ, thành tiền của học sinh
export const getCalcMoneyEachStu = (arrTaughtData, singleWage, scale) => {
  let totalMinutes = 0;
  let totalHour = 0;
  let totalWage = 0;
  if (scale > 1) {
    //Lọc lại mảng time
    const arrTime = arrTaughtData.map((cv) => cv.taughtTime);
    //Tính tổng time phút
    totalMinutes = arrTime.reduce((cv, total) => cv + total);
    //TÍnh ra giờ theo hệ số
    const calcHour = totalMinutes / scale;
    //Làm tròn
    totalHour = +calcHour.toFixed(2);
    //Tính ra tiền
    totalWage = Math.round(calcHour * singleWage);
  }
  //Trả về két quả
  return {
    totalMinutes,
    totalHour,
    totalWage,
  };
};

//Hàm làm tròn kết quả tiền lên hàng ngàn
export const getRoundUpThoundsand = (valString) => {
  //Tách input ra
  const arrSplit = valString.split(".");
  //Chia trường hợp ra đẻ làm tròn
  //Trường hợp 100.000
  if (arrSplit.length === 2 && +arrSplit[1] > 0) {
    const result = `${+arrSplit[0] + 1}.000`;
    return result;
  } else if (arrSplit.length === 2 && +arrSplit[1] === 0) {
    return `${arrSplit[0]}.000`;
  }
  //Truòng hợp 100.000.000
  if (arrSplit.length === 3 && (+arrSplit[1] > 0 || +arrSplit[2] > 0)) {
    const result = `${+arrSplit[0] + 1}.000.000`;
    return result;
  } else if (
    arrSplit.length === 3 &&
    +arrSplit[1] === 0 &&
    +arrSplit[2] === 0
  ) {
    const result = `${arrSplit[0]}.000.000`;
    return result;
  }
};
//////////////// NHÓM FUNC CHO TÍNH LƯƠNG NHÓM/////////////////////
//Từ arrDiemDanhNhom , idTea và ngày tháng --> lọc lại mảng data arrLuongNhom phù hợp đẻ push redux dùng để render
export const getInitArrLuongNhom = (arrDiemDanhNhom, idTea, monthYear) => {
  //Từ arrDiemDanhNhom, lọc ra mảng có idTea và MOnthYear phù hợp
  const arrDDNFilterIdteaMonthYear = arrDiemDanhNhom.filter(
    (cv) =>
      cv.idTea === idTea &&
      new Date(cv.taughtDate).getMonth() + 1 === +monthYear.month &&
      new Date(cv.taughtDate).getFullYear() === +monthYear.year
  );
  //Từ mảng lọc này ta tạo một mảng mới tương ứng với các data cần thiét cho lương nhóm
  let arrResult = [];
  arrDDNFilterIdteaMonthYear.forEach((cv) =>
    arrResult.push({
      idGroupDate: cv._id,
      idTea: cv.idTea,
      monthYear: monthYear,
      taughtDate: cv.taughtDate,
      taughtTime: cv.taughtTime,
      description: "",
    })
  );
  return arrResult;
};
//Từ arrLuongNhom ,lọc lại arr có idTeacher và month year phù hợp
export const filterArrLuongNhomByIdTeaMonthYear = (
  arrLuongNhom,
  idTea,
  monthYearObj
) => {
  const result = arrLuongNhom.filter(
    (cv) =>
      cv.idTea === idTea &&
      +monthYearObj.month === +cv.monthYear.month &&
      +monthYearObj.year === +cv.monthYear.year
  );
  return result;
};

//Từ arrLuongThangGiaoVien lấy các thông tin cần thiét từ đối tượng tìm thấy thông qua idTea,monthYEar
export const getMonthWageData = (arrLuongThangGiaoVien, idTea, monthYear) => {
  //Tiếp đến ta sẽ tìm đối tượng lương tháng theo idTea,monthYear phù phơk
  const objMonthWage = arrLuongThangGiaoVien.find(
    (cv) =>
      cv.idTea === idTea &&
      +cv.monthYear.month === +monthYear.month &&
      +cv.monthYear.year === +monthYear.year
  );

  //Tạo các biến mảng chứa data cá nhân, nhóm ,phụ phi để lấy ra từ đối tượng trên --> truyền xuống render kết quả
  let arrLuongCaNhanData = [];
  let arrLuongNhomData = [];
  let arrPhuPhiData = [];
  let singleWageData = 0;
  let groupWageData = 0;
  let idMonthWage = "";
  if (objMonthWage) {
    arrLuongCaNhanData = objMonthWage.arrLuongCaNhan;
    arrLuongNhomData = objMonthWage.arrLuongNhom;
    arrPhuPhiData = objMonthWage.arrPhuPhi;
    singleWageData = objMonthWage.singleWage;
    groupWageData = objMonthWage.groupWage;
    idMonthWage = objMonthWage._id;
  }
  return {
    arrLuongCaNhanData,
    arrLuongNhomData,
    arrPhuPhiData,
    singleWageData,
    groupWageData,
    idMonthWage,
  };
};
