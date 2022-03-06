import {createSlice} from '@reduxjs/toolkit';

const initLopNhom = {
    arrLopNhom : [],
}

const QllnSlice = createSlice({
    name : 'Quản lý lớp nhóm slice',
    initialState : initLopNhom,
    reducers : {
        replaceArrLopNhom(state,action){

        },//Func này là get từ db về ghi đè
    }
})

export const QllnActions = QllnSlice.actions;

export default QllnSlice.reducer;