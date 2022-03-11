import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangThongKeDiemDanhCaNhan = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Điểm danh học sinh cá nhân',slug:'diem-danh-ca-nhan',isActive:false},
      {label : 'Thống kê ngày học hs cá nhân',slug:'diem-danh-ca-nhan/thong-ke',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang rỗng - không cần dùng đến trang này.</h1>
      </Fragment>
    )
  }
  export default TrangThongKeDiemDanhCaNhan;