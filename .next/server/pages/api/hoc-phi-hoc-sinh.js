"use strict";
(() => {
var exports = {};
exports.id = 9497;
exports.ids = [9497];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 2266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Đầu tiên là tiến hành kết nối với db
    let cluster;
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("hphs");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kết nối đến db học ph\xed học sinh lỗi."
        });
    } //End connect
    ////////////////////////////////////////////////////////////////////////////
    //Xử lý post request
    if (req.method === "POST") {
        //Des các prop cần để xác thực thong tin submit lên
        const { idStu , monthYear , totalSingleDates , totalGroupDates  } = req.body;
        //Kiểm tra
        if (!idStu || idStu.trim().length === 0 || !monthYear || monthYear.month === "" || monthYear === "" || totalSingleDates === 0 && totalGroupDates === 0) {
            res.status(422).json({
                thongbao: "Th\xf4ng tin submit th\xeam học ph\xed th\xe1ng kh\xf4ng hợp lệ."
            });
            return;
        } //End kiểm tra
        //Tiến hành lưu vào db
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangHocPhiThangHocSinh", req.body);
            res.status(200).json({
                thongbao: "Lưu th\xf4ng tin học ph\xed th\xe1ng hs th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lưu th\xf4ng tin học ph\xed th\xe1ng hs lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } //End post request
    ////////////////////////////////////////////////////////////////////////////
    //Xử lý get request
    if (req.method === "GET") {
        try {
            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangHocPhiThangHocSinh");
            res.status(200).json({
                thongbao: "Lấy data học ph\xed th\xe1ng học sinh từ db th\xe0nh c\xf4ng.",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lấy data học ph\xed th\xe1ng học sinh lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } //end get request
    ////////////////////////////////////////////////////////////////////////////
    //Xử lý del request
    if (req.method === "DELETE") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangHocPhiThangHocSinh", req.body);
            res.status(200).json({
                thongbao: "X\xf3a học ph\xed th\xe1ng học sinh th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "X\xf3a học ph\xed th\xe1ng học sinh lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } // end del request
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(2266)));
module.exports = __webpack_exports__;

})();