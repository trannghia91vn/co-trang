import { createContext } from "react";

const NotisContext = createContext({
    objNoti : {},
    pushNoti : () => {},
    clearNoti : ()=>{},
})

export default NotisContext;