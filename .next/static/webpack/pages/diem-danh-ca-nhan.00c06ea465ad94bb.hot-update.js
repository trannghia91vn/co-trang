"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/diem-danh-ca-nhan",{

/***/ "./pages/diem-danh-ca-nhan/index.js":
/*!******************************************!*\
  !*** ./pages/diem-danh-ca-nhan/index.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_UI_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/UI/Header */ \"./components/UI/Header.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_context_NavbarLabels_labels_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/context/NavbarLabels/labels-context */ \"./store/context/NavbarLabels/labels-context.js\");\n\n\n\n\n\nvar _this = undefined;\nvar _s = $RefreshSig$();\nvar TrangDiemDanhCaNhan = function(props) {\n    _s();\n    //Lấy về slug\n    var route = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)().route.replace(\"/\", \"\");\n    //Lấy về ctx labels navbar để load cho header\n    var LabelsCtx = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_store_context_NavbarLabels_labels_context__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    var objLabelByRoute = LabelsCtx.getObjByRoute(route);\n    var title = objLabelByRoute.label;\n    //Tạo đối tượng chứa thông tin các tag điều hướng\n    var arrOptions = [\n        {\n            label: \"Điểm danh\",\n            slug: \"diem-danh\"\n        },\n        {\n            label: \"Thống k\\xea\",\n            slug: \"thong-ke\"\n        }, \n    ];\n    //Tổng hợp lai đói tượng truyền xuống comp head dể renders\n    var dataHeader = {\n        title: title,\n        arrOptions: arrOptions\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, {}, void 0, false, {\n        fileName: \"/Users/nghiatran/Desktop/Dev_QuanLyCongTy/root/pages/diem-danh-ca-nhan/index.js\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, _this));\n};\n_s(TrangDiemDanhCaNhan, \"7MP9FYEMjyFmr5zpayCVur3qv6s=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = TrangDiemDanhCaNhan;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TrangDiemDanhCaNhan);\nvar _c;\n$RefreshReg$(_c, \"TrangDiemDanhCaNhan\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kaWVtLWRhbmgtY2Etbmhhbi9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStDO0FBQ0g7QUFDUDtBQUNzQzs7O0FBRTNFLEdBQUssQ0FBQ0ssbUJBQW1CLEdBQUcsUUFBUSxDQUFQQyxLQUFLLEVBQUssQ0FBQzs7SUFDdEMsRUFBYTtJQUNULEdBQUMsQ0FBQ0MsS0FBSyxHQUFHSixzREFBUyxHQUFHSSxLQUFLLENBQUNDLE9BQU8sQ0FBQyxDQUFHLElBQUUsQ0FBRTtJQUMvQyxFQUE2QztJQUN0QyxHQUFGLENBQUNDLFNBQVMsR0FBR1AsaURBQVUsQ0FBQ0Usa0ZBQWE7SUFDMUMsR0FBSyxDQUFDTSxlQUFlLEdBQUdELFNBQVMsQ0FBQ0UsYUFBYSxDQUFDSixLQUFLO0lBQ3JELEdBQUssQ0FBQ0ssS0FBSyxHQUFHRixlQUFlLENBQUNHLEtBQUs7SUFFbkMsRUFBaUQ7SUFDL0IsR0FBYixDQUFDQyxVQUFVLEdBQUcsQ0FBQztRQUNsQixDQUFDO1lBQUNELEtBQUssRUFBRSxDQUFXO1lBQUtFLElBQUksRUFBRSxDQUFXO1FBQUMsQ0FBQztRQUN6QyxDQUFGO1lBQUNGLEtBQUssRUFBRSxDQUFVO1lBQUtFLElBQUksRUFBRSxDQUFVO1FBQUMsQ0FBQztJQUN6QyxDQUFGO0lBRUQsRUFBMEQ7SUFDMUQsR0FBSyxDQUFDQyxVQUFVLEdBQUcsQ0FBQztRQUNsQkosS0FBSyxFQUFMQSxLQUFLO1FBQ0xFLFVBQVUsRUFBVkEsVUFBVTtJQUNaLENBQUM7SUFFRCxNQUFNLDZFQUNIYiwyQ0FBUTs7Ozs7QUFJYixDQUFDO0dBekJLSSxtQkFBbUI7O1FBRVRGLGtEQUFTOzs7S0FGbkJFLG1CQUFtQjtBQTBCekIsK0RBQWVBLG1CQUFtQixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2RpZW0tZGFuaC1jYS1uaGFuL2luZGV4LmpzP2E3YTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9VSS9IZWFkZXJcIjtcbmltcG9ydCB7IEZyYWdtZW50LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge3VzZVJvdXRlcn0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IExhYmVsc0NvbnRleHQgZnJvbSAnLi4vLi4vc3RvcmUvY29udGV4dC9OYXZiYXJMYWJlbHMvbGFiZWxzLWNvbnRleHQnO1xuXG5jb25zdCBUcmFuZ0RpZW1EYW5oQ2FOaGFuID0gKHByb3BzKSA9PiB7XG4gIC8vTOG6pXkgduG7gSBzbHVnXG4gIGNvbnN0IHJvdXRlID0gdXNlUm91dGVyKCkucm91dGUucmVwbGFjZShcIi9cIiwgXCJcIik7XG4gIC8vTOG6pXkgduG7gSBjdHggbGFiZWxzIG5hdmJhciDEkeG7gyBsb2FkIGNobyBoZWFkZXJcbiAgY29uc3QgTGFiZWxzQ3R4ID0gdXNlQ29udGV4dChMYWJlbHNDb250ZXh0KTtcbiAgY29uc3Qgb2JqTGFiZWxCeVJvdXRlID0gTGFiZWxzQ3R4LmdldE9iakJ5Um91dGUocm91dGUpO1xuICBjb25zdCB0aXRsZSA9IG9iakxhYmVsQnlSb3V0ZS5sYWJlbDtcblxuICAvL1ThuqFvIMSR4buRaSB0xrDhu6NuZyBjaOG7qWEgdGjDtG5nIHRpbiBjw6FjIHRhZyDEkWnhu4F1IGjGsOG7m25nXG4gIGNvbnN0IGFyck9wdGlvbnMgPSBbXG4gICAgeyBsYWJlbDogXCLEkGnhu4NtIGRhbmhcIiwgc2x1ZzogXCJkaWVtLWRhbmhcIiB9LFxuICAgIHsgbGFiZWw6IFwiVGjhu5FuZyBrw6pcIiwgc2x1ZzogXCJ0aG9uZy1rZVwiIH0sXG4gIF07XG5cbiAgLy9U4buVbmcgaOG7o3AgbGFpIMSRw7NpIHTGsOG7o25nIHRydXnhu4FuIHh14buRbmcgY29tcCBoZWFkIGThu4MgcmVuZGVyc1xuICBjb25zdCBkYXRhSGVhZGVyID0ge1xuICAgIHRpdGxlLFxuICAgIGFyck9wdGlvbnMsXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICB7LyogPEhlYWRlciBkYXRhSGVhZGVyPXtkYXRhSGVhZGVyfSAvPiAqL31cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFRyYW5nRGllbURhbmhDYU5oYW47Il0sIm5hbWVzIjpbIkhlYWRlciIsIkZyYWdtZW50IiwidXNlQ29udGV4dCIsInVzZVJvdXRlciIsIkxhYmVsc0NvbnRleHQiLCJUcmFuZ0RpZW1EYW5oQ2FOaGFuIiwicHJvcHMiLCJyb3V0ZSIsInJlcGxhY2UiLCJMYWJlbHNDdHgiLCJvYmpMYWJlbEJ5Um91dGUiLCJnZXRPYmpCeVJvdXRlIiwidGl0bGUiLCJsYWJlbCIsImFyck9wdGlvbnMiLCJzbHVnIiwiZGF0YUhlYWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/diem-danh-ca-nhan/index.js\n");

/***/ })

});