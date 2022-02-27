import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangDanhSachLopNhom = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Quản lý lớp nhóm',slug:'quan-ly-lop-nhom',isActive:false},
      {label : 'Danh sách lớp nhóm',slug:'quan-ly-lop-nhom/ds-lop-nhom',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangDanhSachLopNhom;