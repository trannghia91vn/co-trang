import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangThongKeDiemDanhNhom = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Điểm danh học sinh nhóm',slug:'diem-danh-nhom',isActive:false},
      {label : 'Thống kê ngày học hs nhóm',slug:'diem-danh-nhom/thong-ke',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangThongKeDiemDanhNhom;