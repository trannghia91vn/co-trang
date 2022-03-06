//Lọc mảng hóc sinh cá nhân từ mảng hs tổng
export const getSingleArrStuddents = arrAllStus => {
    const arrSinlgeStus = arrAllStus.filter(cv=>cv.singleClass)
    return arrSinlgeStus;
}
//Lọc mảng hóc sinh nhóm từ mảng hs tổng
export const getGroupArrStuddents = arrAllStus => {
    const arrGroupStus = arrAllStus.filter(cv=>cv.groupClass)
    return arrGroupStus;
}
//Lọc đối tượng học sinh theo id từ mảng hs tổng
export const getStuById = (arrAllStus,id) => {
    const objMatched = arrAllStus.find(cv=>cv._id === id);
    return objMatched;
}

//Lọc mảng tags học sinh được chọn 
export const getArrSelectedStusTags = arrStusTags => {
    const arrStusSelected = arrStusTags.filter(cv=>cv.isSelected)
    return arrStusSelected;
}