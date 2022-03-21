"use strict";
(() => {
var exports = {};
exports.id = 2970;
exports.ids = [2970];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 2684:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Đầu tiên là kết nối với db
    let cluster;
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("lgv");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kết nối đến db Lương gi\xe1o vi\xean lỗi."
        });
        cluster.close();
    }
    //////////////////////////////////////////////////
    //Xử lý Post request
    if (req.method === "POST") {
        //Des ra các input để kiểm tra
        const { idTea , monthYear  } = req.body;
        if (!idTea || !monthYear || monthYear.month.toString().trim().length === 0 || monthYear.year.toString().trim().length === 0) {
            res.status(422).json({
                thongbao: "IdTea hoặc ng\xe0y th\xe1ng post lương gi\xe1o vi\xean kh\xf4ng đ\xfang."
            });
            return;
        } //End kiẻm tra
        //Chạy post
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangLuongThangGiaoVien", req.body);
            res.status(200).json({
                thongbao: "Lưu lương th\xe1ng gi\xe1o vi\xean v\xe0o db th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lưu lương th\xe1ng gi\xe1o vi\xean v\xe0o db lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } //End post request
    //////////////////////////////////////////////////
    //Xử lý Get Request
    if (req.method === "GET") {
        try {
            const dataGot = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangLuongThangGiaoVien");
            res.status(200).json({
                thongbao: "Lấy data lương th\xe1ng gi\xe1o vi\xean th\xe0nh c\xf4ng.",
                data: dataGot
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lấy data lương th\xe1ng gi\xe1o vi\xean lỗi."
            });
            cluster.close();
        }
        cluster.close();
    }
    //////////////////////////////////////////////////
    //Xử lý Put request
    if (req.method === "PUT") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .replaceDataByIdToMongoDb */ .Mb)(cluster, "mangLuongThangGiaoVien", req.body.id, req.body.data);
            res.status(200).json({
                thongbao: "Sửa data lương th\xe1ng gi\xe1o vi\xean th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Sửa data lương th\xe1ng gi\xe1o vi\xean lỗi."
            });
            cluster.close();
        }
        cluster.close();
    }
    //////////////////////////////////////////////////
    //Xử lý xóa request
    if (req.method === "DELETE") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangLuongThangGiaoVien", req.body);
            res.status(200).json({
                thongbao: "X\xf3a data lương th\xe1ng gi\xe1o vi\xean th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(200).json({
                thongbao: "X\xf3a data lương th\xe1ng gi\xe1o vi\xean lỗi."
            });
            cluster.close();
        }
        cluster.close();
    }
//////////////////////////////////////////////////
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(2684)));
module.exports = __webpack_exports__;

})();