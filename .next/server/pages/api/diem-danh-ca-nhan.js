"use strict";
(() => {
var exports = {};
exports.id = 1430;
exports.ids = [1430];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 5042:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Des các props ra
    const { idStu , nameStu , arrTeacherTaught , dateSingleCheck , typeSingleCheck  } = req.body;
    //Tiến hành connect đến db
    let cluster;
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("ddcn");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kế nối đến db ddcn thất bại."
        });
    } //End connect
    //Xử lý post request
    if (req.method === "POST") {
        //Tiến hành xác thực các thông tin submit lên có hợp lệ hay không
        if (typeSingleCheck !== "nghi" && (idStu.trim().length === 0 || nameStu.trim().length === 0 || arrTeacherTaught.length === 0 || dateSingleCheck.trim().length === 0) || typeSingleCheck === "nghi" && dateSingleCheck.trim().length === 0) {
            res.status(422).json({
                thongbao: "Th\xf4ng tin điểm danh c\xe1 nh\xe2n kh\xf4ng hợp lệ."
            });
            cluster.close();
            return;
        }
        //Tiến hành submit thôi
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangDiemDanhCaNhan", req.body);
            res.status(200).json({
                thongbao: "Lưu th\xf4ng tin điềm danh l\xean db th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lưu th\xf4ng tin ng\xe0y điểm danh l\xean db thất bại"
            });
            cluster.close();
        }
        cluster.close();
    } //End post request
    //Xử lý get request
    if (req.method === "GET") {
        try {
            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangDiemDanhCaNhan");
            res.status(200).json({
                thongbao: "Lấy data từ mảng điểm danh c\xe1 nh\xe2n th\xe0nh c\xf4ng db.",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lấy data từ mảng điểm danh c\xe1 nh\xe2n db thất bại"
            });
            cluster.close();
        }
        cluster.close();
    } //End get request
    //Xử lý edit request
    if (req.method === "PUT") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .replaceDataByIdToMongoDb */ .Mb)(cluster, "mangDiemDanhCaNhan", req.body.id, req.body.data);
            res.status(200).json({
                thongbao: "Sửa th\xf4ng tin ng\xe0y điềm danh l\xean db th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Sửa th\xf4ng tin ng\xe0y điềm danh l\xean db lỗi."
            });
            cluster.close();
        }
        cluster.close();
    } //End put request
    //Xử lý delete requsest
    if (req.method === "DELETE") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangDiemDanhCaNhan", req.body);
            res.status(200).json({
                thongbao: "X\xf3a ng\xe0y điểm danh th\xe0nh c\xf4ng."
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "X\xf3a ng\xe0y điểm danh thất bại."
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
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(5042)));
module.exports = __webpack_exports__;

})();