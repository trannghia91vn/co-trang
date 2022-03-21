"use strict";
(() => {
var exports = {};
exports.id = 8172;
exports.ids = [8172];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 6937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Des ra ba thông số cần thiết để kiểm tra đầu vào
    const { taughtDate , taughtTime , arrLearnedStus  } = req.body;
    //Kết nối với db
    let cluster;
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("ddn");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kết nối đến db của điểm danh nh\xf3m thất bại."
        });
    }
    //Xử lý post request
    if (req.method === "POST") {
        //Kiểm tra thông tin submit lên
        if (taughtDate.trim().length === 0 || taughtTime === 0 || arrLearnedStus.length === 0) {
            res.status(422).json({
                thongbao: "Th\xf4ng tin ng\xe0y , giờ dạy , danh s\xe1ch học sinh nh\xf3m kh\xf4ng hợp lệ."
            });
            return;
        } //End kiểm tra
        //Xử lý post
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangDiemDanhNhom", req.body);
            res.status(200).json({
                thongbao: "Lưu ng\xe0y điểm danh l\xean db th\xe0nh c\xf4ng"
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lưu ng\xe0y điểm danh l\xean db thất bại."
            });
            cluster.close();
        }
        cluster.close();
    } //End post request
    //Xử lý get request
    if (req.method === "GET") {
        try {
            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangDiemDanhNhom");
            res.status(200).json({
                thongbao: "Get mảng điểm danh nh\xf3m th\xe0nh c\xf4ng",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Get mảng điểm d\xe1nh nh\xf3m lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } //End get request
    //Xử lý put request
    if (req.method === "PUT") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .replaceDataByIdToMongoDb */ .Mb)(cluster, "mangDiemDanhNhom", req.body.id, req.body.data);
            res.status(200).json({
                thongbao: "Sửa ng\xe0y đi\xeam danh nh\xf3m th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Sửa ng\xe0y đi\xeam danh nh\xf3m thất bại."
            });
            cluster.close();
        }
        cluster.close();
    }
    //Xử lý del request
    if (req.method === "DELETE") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangDiemDanhNhom", req.body);
            res.status(200).json({
                thongbao: "X\xf3a ng\xe0y đi\xeam danh nh\xf3m th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "X\xf3a ng\xe0y đi\xeam danh nh\xf3m thất bại."
            });
            cluster.close();
        }
        cluster.close();
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(6937)));
module.exports = __webpack_exports__;

})();