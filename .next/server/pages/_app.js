(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 3911:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "layout_main__i6bTv"
};


/***/ }),

/***/ 1677:
/***/ ((module) => {

// Exports
module.exports = {
	"navbar": "navigation_navbar__rBctr",
	"list": "navigation_list__c1Had",
	"item": "navigation_item__8A7HS",
	"logout": "navigation_logout__14ZQA",
	"active": "navigation_active__oBPsw"
};


/***/ }),

/***/ 3919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/layout/layout.module.css
var layout_module = __webpack_require__(3911);
var layout_module_default = /*#__PURE__*/__webpack_require__.n(layout_module);
// EXTERNAL MODULE: ./components/layout/navigation.module.css
var navigation_module = __webpack_require__(1677);
var navigation_module_default = /*#__PURE__*/__webpack_require__.n(navigation_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./store/context/NavbarLabels/labels-context.js
var labels_context = __webpack_require__(5000);
;// CONCATENATED MODULE: ./components/layout/navigation.js





const Navigation = (props)=>{
    //Lấy về mảng labels từ context
    const navLabelsCtx = (0,external_react_.useContext)(labels_context/* default */.Z);
    const arrLabels = navLabelsCtx.arrNavbarLabels;
    //Callback active labels trên context
    const activeLabelHandler = (id)=>{
        navLabelsCtx.activeLabel(id);
    };
    //Tạo biến render labelss
    const renderLabels = arrLabels.map((name)=>{
        let labelClass = `${(navigation_module_default()).item}`;
        if (name.isActive === true) {
            labelClass = `${(navigation_module_default()).item} ${(navigation_module_default()).active}`;
        }
        return(/*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
            href: `/${name.slug}`,
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: labelClass,
                onClick: activeLabelHandler.bind(0, name.id),
                children: name.label
            })
        }, name.id));
    });
    return(/*#__PURE__*/ jsx_runtime_.jsx("header", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
            className: (navigation_module_default()).navbar,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (navigation_module_default()).list,
                    children: renderLabels
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                    href: "/#",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (navigation_module_default()).logout,
                        children: "Logout"
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const navigation = (Navigation);

;// CONCATENATED MODULE: ./components/layout/layout.js




const Layout = (props)=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(navigation, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (layout_module_default()).main,
                children: props.children
            })
        ]
    }));
};
/* harmony default export */ const layout = (Layout);

;// CONCATENATED MODULE: ./store/context/NavbarLabels/labels-provider.js



const LabelsProvider = (props)=>{
    const arrNavbarLabels = [
        {
            id: 1,
            label: "QUẢN L\xdd HỌC SINH",
            isActive: false,
            slug: "quan-ly-hoc-sinh"
        },
        {
            id: 2,
            label: "QUẢN L\xdd GI\xc1O VI\xcaN",
            isActive: false,
            slug: "quan-ly-giao-vien"
        },
        {
            id: 3,
            label: "QUẢN L\xdd LỚP NH\xd3M",
            isActive: false,
            slug: "quan-ly-lop-nhom"
        },
        {
            id: 4,
            label: "ĐIỂM DANH C\xc1 NH\xc2N",
            isActive: false,
            slug: "diem-danh-ca-nhan"
        },
        {
            id: 5,
            label: "ĐIỂM DANH NH\xd3M",
            isActive: false,
            slug: "diem-danh-nhom"
        },
        {
            id: 6,
            label: "HỌC PH\xcd HỌC SINH",
            isActive: false,
            slug: "hoc-phi-hoc-sinh"
        },
        {
            id: 7,
            label: "LƯƠNG GI\xc1O VI\xcaN",
            isActive: false,
            slug: "luong-giao-vien"
        }, 
    ];
    const { 0: arrLabels , 1: changeArrLabels  } = (0,external_react_.useState)(arrNavbarLabels);
    //Func tìm obj đúng theo id
    const getObjById = (id)=>{
        const objMatched = arrLabels.find((obj)=>obj.id === id
        );
        if (objMatched) {
            return objMatched;
        } else {
            return;
        }
    };
    //Function tìm obj theo route
    const getObjByRoute = (route)=>{
        const objMatched = arrLabels.find((obj)=>obj.slug === route
        );
        if (objMatched) {
            return objMatched;
        } else {
            return;
        }
    };
    //Func kích hoạt style obj khi được kích vào
    const activeLabel = (id)=>{
        arrLabels.forEach((obj)=>obj.isActive = false
        );
        const objMatched = arrLabels.find((obj)=>obj.id === id
        );
        if (objMatched) {
            objMatched.isActive = true;
        }
    };
    //Tổng hợp lại đói tượng value cho context
    const valueObj = {
        arrNavbarLabels: arrLabels,
        getObjById: getObjById,
        getObjByRoute: getObjByRoute,
        activeLabel: activeLabel
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(labels_context/* default.Provider */.Z.Provider, {
        value: valueObj,
        children: props.children
    }));
};
/* harmony default export */ const labels_provider = (LabelsProvider);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: ./store/redux/quan-ly-hoc-sinh/qlhs-slice.js
var qlhs_slice = __webpack_require__(9612);
// EXTERNAL MODULE: ./store/redux/quan-ly-giao-vien/qlgv-slice.js
var qlgv_slice = __webpack_require__(1384);
// EXTERNAL MODULE: ./store/redux/quan-ly-lop-nhom/qlln-slice.js
var qlln_slice = __webpack_require__(4970);
// EXTERNAL MODULE: ./store/redux/loading/loading-slice.js
var loading_slice = __webpack_require__(9128);
// EXTERNAL MODULE: ./store/redux/diem-danh-ca-nhan/ddcn-slice.js
var ddcn_slice = __webpack_require__(5217);
// EXTERNAL MODULE: ./store/redux/diem-danh-nhom/ddn-slice.js
var ddn_slice = __webpack_require__(3131);
// EXTERNAL MODULE: ./store/redux/lich/lich-slice.js
var lich_slice = __webpack_require__(6990);
// EXTERNAL MODULE: ./store/redux/hoc-phi-hoc-sinh/hphs-slice.js
var hphs_slice = __webpack_require__(253);
// EXTERNAL MODULE: ./store/redux/luong-giao-vien/lgv-slice.js
var lgv_slice = __webpack_require__(9174);
;// CONCATENATED MODULE: ./store/redux/store.js










const Store = (0,toolkit_.configureStore)({
    reducer: {
        qlhs: qlhs_slice/* default */.ZP,
        qlgv: qlgv_slice/* default */.ZP,
        qlln: qlln_slice/* default */.ZP,
        ddcn: ddcn_slice/* default */.ZP,
        ddn: ddn_slice/* default */.ZP,
        lgv: lgv_slice/* default */.ZP,
        loading: loading_slice/* default */.Z,
        lich: lich_slice/* default */.Z,
        hphs: hphs_slice/* default */.ZP
    }
});
/* harmony default export */ const store = (Store);

;// CONCATENATED MODULE: ./pages/_app.js






function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(labels_provider, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
            store: store,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(layout, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                        ...pageProps
                    }),
                    " "
                ]
            })
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const LabelsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    arrNavbarLabels: [],
    getObjById: ()=>{},
    getObjByRoute: ()=>{},
    activeLabel: ()=>{}
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LabelsContext);


/***/ }),

/***/ 3131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wq": () => (/* binding */ fetchGetArrDiemDanhNhom),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export DdnActions */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loading_loading_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9128);


const initDiemDanhNhom = {
    arrDiemDanhNhom: []
};
const DdnSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "Điểm danh nh\xf3m slice",
    initialState: initDiemDanhNhom,
    reducers: {
        replaceArrDiemDanhNhom (state, action) {
            state.arrDiemDanhNhom = action.payload;
        }
    }
});
const DdnActions = DdnSlice.actions;
const fetchGetArrDiemDanhNhom = ()=>{
    return async (dispatchFn)=>{
        dispatchFn(_loading_loading_slice__WEBPACK_IMPORTED_MODULE_1__/* .LoadingActions.activeLoading */ .N.activeLoading());
        try {
            const response = await fetch('/api/diem-danh-nhom');
            dispatchFn(_loading_loading_slice__WEBPACK_IMPORTED_MODULE_1__/* .LoadingActions.deactiveLoading */ .N.deactiveLoading());
            const data = await response.json();
            dispatchFn(DdnActions.replaceArrDiemDanhNhom(data.data));
        } catch (error) {
            dispatchFn(_loading_loading_slice__WEBPACK_IMPORTED_MODULE_1__/* .LoadingActions.deactiveLoading */ .N.deactiveLoading());
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DdnSlice.reducer);


/***/ }),

/***/ 9128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ LoadingActions),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initLoading = {
    isLoading: false
};
const LoadingSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'Loading Slice',
    initialState: initLoading,
    reducers: {
        activeLoading (state) {
            state.isLoading = true;
        },
        deactiveLoading (state) {
            state.isLoading = false;
        }
    }
});
const LoadingActions = LoadingSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingSlice.reducer);


/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 562:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7730,1664,9612,1384,9174,4970,3985], () => (__webpack_exec__(3919)));
module.exports = __webpack_exports__;

})();