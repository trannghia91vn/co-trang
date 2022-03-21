"use strict";
(() => {
var exports = {};
exports.id = 3342;
exports.ids = [3342];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 1806:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Tiến hành kết nối đến db
    let cluster;
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("qlhs");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kết nối đến mongodb thất bại."
        });
        cluster.close();
    } //end try-catch kết nối
    //Xử lý post request
    if (req.method === "POST") {
        //Des các prosp cần kiểm tra
        const { singleClass , groupClass , singleFee , groupFee , nameStu  } = req.body;
        //Đầu tiên là tiến hành xác thực các thông tin submit
        if (!singleClass && !groupClass || +singleFee === 0 && +groupFee === 0 || singleClass && +singleFee === 0 || groupClass && +groupFee === 0 || nameStu.trim().length === 0) {
            res.status(422).json({
                thongbao: "Th\xf4ng tin cung cấp kh\xf4ng đ\xfang . Vui l\xf2ng thử lại.",
                data: req.body
            });
            return;
        }
        //Tiến hành ghi vào database
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangHocSinh", req.body);
            res.status(200).json({
                thongbao: "Lưu th\xf4ng tin học sinh mới v\xe0o mongodb th\xe0nh c\xf4ng"
            });
        } catch (error) {
            cluster.close();
            res.status(500).json({
                thongbao: "Lưu th\xf4ng tin học sinh mới v\xe0o mongodb thất bại"
            });
        } //end try-catch lưu vào db
        cluster.close();
    } //end post request
    //Xử lý get request
    if (req.method === "GET") {
        try {
            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangHocSinh");
            res.status(200).json({
                thongbao: "Get th\xf4ng tin học sinh từ db th\xe0nh c\xf4ng",
                data: data
            });
        } catch (error) {
            cluster.close();
            res.status(500).json({
                thongbao: "Get th\xf4ng tin học sinh từ db thất bại."
            });
        } //End try catch get request
        cluster.close();
    }
    //Xử lý request Delete
    if (req.method === "DELETE") {
        // console.log(JSON.parse({ _id: ObjectId("621b5e0e3d53b59411a4c5c0") }));
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangHocSinh", req.body);
            res.status(200).json({
                thongbao: "X\xf3a item th\xe0nh c\xf4ng"
            });
        } catch (error) {
            cluster.close();
            res.status(422).json({
                thongbao: "X\xf3a item lỗi"
            });
        }
        cluster.close();
    }
    //Xử lý request Put đẻ cập nhật thông tin sửa đổi cho học sinn
    if (req.method === "PUT") {
        //Trong đó req.body là chuôi id của item được cấp bởi mongodb
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .replaceDataByIdToMongoDb */ .Mb)(cluster, "mangHocSinh", req.body._id, req.body.data);
            res.status(200).json({
                thongbao: "Cập nhật học sinh th\xe0nh c\xf4ng"
            });
        } catch (error) {
            res.status(422).json({
                thongbao: "Cập nhật học sinh thất bại"
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
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(1806)));
module.exports = __webpack_exports__;

})();