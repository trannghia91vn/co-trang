import { createContext } from "react";

const LabelsContext = createContext({
    arrNavbarLabels : [],
    getObjById : () => {},
    getObjByRoute : ()=>{},
    activeLabel : () => {},
})

export default LabelsContext;