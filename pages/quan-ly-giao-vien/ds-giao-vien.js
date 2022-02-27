import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangDanhSachGiaoVien = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Quản lý giáo viên',slug:'quan-ly-giao-vien',isActive:false},
      {label : 'Danh sách giáo viên',slug:'quan-ly-giao-vien/ds-giao-vien',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangDanhSachGiaoVien;