import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangThongKeLuongGiaoVien = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Lương giáo vien',slug:'luong-giao-vien',isActive:false},
      {label : 'Thống kê lương giáo viên',slug:'luong-giao-vien/thong-ke-luong',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ thống kê lương giáo viên</h1>
      </Fragment>
    )
  }
  export default TrangThongKeLuongGiaoVien;