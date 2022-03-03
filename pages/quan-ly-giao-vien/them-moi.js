import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import { Fragment } from 'react';
import FormThemMoiGiaoVien from "../../components/quan-ly-giao-vien/them-moi-gv/them-moi-gv";

const TrangThemMoiGiaoVien = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Quản lý giáo viên',slug:'quan-ly-giao-vien',isActive:false},
      {label : 'Thêm mới giáo viên',slug:'quan-ly-giao-vien/them-moi',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <FormThemMoiGiaoVien/>
      </Fragment>
    )
  }
  export default TrangThemMoiGiaoVien;