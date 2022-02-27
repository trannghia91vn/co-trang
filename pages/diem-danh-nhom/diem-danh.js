import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangThemDiemDanhNhom = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Điểm danh học sinh nhóm',slug:'diem-danh-nhom',isActive:false},
      {label : 'Thêm thông tin điểm danh',slug:'diem-danh-nhom/diem-danh',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangThemDiemDanhNhom;