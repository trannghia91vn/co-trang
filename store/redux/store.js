import { configureStore } from "@reduxjs/toolkit";
import qlhsSlice from "./quan-ly-hoc-sinh/qlhs-slice";
import qlgvSlice from "./quan-ly-giao-vien/qlgv-slice";
import qllnSlice from "./quan-ly-lop-nhom/qlln-slice";
import loadingSlice from "./loading/loading-slice";
import ddcnSlice from "./diem-danh-ca-nhan/ddcn-slice";
import ddnSlice from "./diem-danh-nhom/ddn-slice";

const Store = configureStore({
  reducer: {
    qlhs: qlhsSlice,
    qlgv: qlgvSlice,
    qlln: qllnSlice,
    ddcn: ddcnSlice,
    ddn : ddnSlice,
    loading: loadingSlice,
  },
});

export default Store;
