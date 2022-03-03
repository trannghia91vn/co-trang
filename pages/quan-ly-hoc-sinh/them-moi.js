import ThanhDieuHuongNoiDung from "../../components/UI/Breadscums";
import FormThemMoiHocSinh from "../../components/quan-ly-hoc-sinh/them-moi-hs/them-moi-hs";
import { Fragment } from 'react';

const TrangThemMoiHocSinh = props => {
    //Tạo chay data mẫu cho điều hướng nối dung theo thứ tự luôn
     const contentNavi = [
      {label : 'Quản lý học sinh',slug:'quan-ly-hoc-sinh',isActive:false},
      {label : 'Thêm mới',slug:'quan-ly-hoc-sinh/them-moi',isActive:true},
     ]
    return (
      <Fragment>
        <ThanhDieuHuongNoiDung arrNavi={contentNavi}/>
        <FormThemMoiHocSinh/>
      </Fragment>
    )
  }
  export default TrangThemMoiHocSinh;