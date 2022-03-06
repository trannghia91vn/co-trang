export const getObjTeacherDataById = (arrTeachers,id) => {
    const objTeacher = arrTeachers.find(tea=>tea._id === id)
    return objTeacher;
}