import LabelsContext from "./labels-context";
import { useState } from "react";

const LabelsProvider = (props) => {
  const arrNavbarLabels = [
    {
      id: 1,
      label: "QUẢN LÝ HỌC SINH",
      isActive: false,
      slug: "quan-ly-hoc-sinh",
    },
    {
      id: 2,
      label: "QUẢN LÝ GIÁO VIÊN",
      isActive: false,
      slug: "quan-ly-giao-vien",
    },
    {
      id: 3,
      label: "QUẢN LÝ LỚP NHÓM",
      isActive: false,
      slug: "quan-ly-lop-nhom",
    },
    {
      id: 4,
      label: "ĐIỂM DANH CÁ NHÂN",
      isActive: false,
      slug: "diem-danh-ca-nhan",
    },
    { id: 5, label: "ĐIỂM DANH NHÓM", isActive: false, slug: "diem-danh-nhom" },
    {
      id: 6,
      label: "HỌC PHÍ HỌC SINH",
      isActive: false,
      slug: "hoc-phi-hoc-sinh",
    },
    {
      id: 7,
      label: "LƯƠNG GIÁO VIÊN",
      isActive: false,
      slug: "luong-giao-vien",
    },
  ];

  const [arrLabels, changeArrLabels] = useState(arrNavbarLabels);
  //Func tìm obj đúng theo id
  const getObjById = (id) => {
    const objMatched = arrLabels.find((obj) => obj.id === id);
    if (objMatched) {
      return objMatched;
    } else {
      return;
    }
  };
  //Function tìm obj theo route
  const getObjByRoute = (route) => {
    const objMatched = arrLabels.find((obj) => obj.slug === route);
    if (objMatched) {
      return objMatched;
    } else {
      return;
    }
  }
  //Func kích hoạt style obj khi được kích vào
  const activeLabel = (id) => {
    arrLabels.forEach((obj) => (obj.isActive = false));
    const objMatched = arrLabels.find((obj) => obj.id === id);
    if (objMatched) {
      objMatched.isActive = true;
    }
  };

  //Tổng hợp lại đói tượng value cho context
  const valueObj = {
    arrNavbarLabels: arrLabels,
    getObjById: getObjById,
    getObjByRoute : getObjByRoute,
    activeLabel: activeLabel,
  };
  return (
    <LabelsContext.Provider value={valueObj}>
      {props.children}
    </LabelsContext.Provider>
  );
};

export default LabelsProvider;
