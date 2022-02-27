import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangTinhPhiThangMoiHocSinh = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Học phí học sinh',slug:'hoc-phi-hoc-sinh',isActive:false},
      {label : 'Tính phí tháng mới',slug:'hoc-phi-hoc-sinh/tinh-phi-thang-moi',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangTinhPhiThangMoiHocSinh;