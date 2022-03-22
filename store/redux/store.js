import { configureStore } from "@reduxjs/toolkit";
import qlhsSlice from "./quan-ly-hoc-sinh/qlhs-slice";
import qlgvSlice from "./quan-ly-giao-vien/qlgv-slice";
import qllnSlice from "./quan-ly-lop-nhom/qlln-slice";
import loadingSlice from "./loading/loading-slice";
import ddcnSlice from "./diem-danh-ca-nhan/ddcn-slice";
import ddnSlice from "./diem-danh-nhom/ddn-slice";
import lichSlice from "./lich/lich-slice";
import hphsSlice from "./hoc-phi-hoc-sinh/hphs-slice";
import lgvSlice from "./luong-giao-vien/lgv-slice";
import loginSlice from "./login/login-slice";

const Store = configureStore({
  reducer: {
    qlhs: qlhsSlice,
    qlgv: qlgvSlice,
    qlln: qllnSlice,
    ddcn: ddcnSlice,
    ddn: ddnSlice,
    lgv: lgvSlice,
    loading: loadingSlice,
    lich: lichSlice,
    hphs: hphsSlice,
    login : loginSlice,
  },
});

export default Store;
