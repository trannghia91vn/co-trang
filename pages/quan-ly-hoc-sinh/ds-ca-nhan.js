import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';

const TrangDanhSachCaNhan = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Quản lý học sinh',slug:'quan-ly-hoc-sinh',isActive:false},
      {label : 'Danh sách học sinh cá nhân',slug:'quan-ly-hoc-sinh/ds-ca-nhan',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <h1>Trang chủ quản lý thêm mới học sinh</h1>
      </Fragment>
    )
  }
  export default TrangDanhSachCaNhan;