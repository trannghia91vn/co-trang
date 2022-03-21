"use strict";
(() => {
var exports = {};
exports.id = 1508;
exports.ids = [1508];
exports.modules = {

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 6848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8630);

const handler = async (req, res)=>{
    //Xử lý kiểm tra điều kiện của thông tin submit lên
    const { singleWage , groupWage , name  } = req.body;
    if (+singleWage === 0 && +groupWage === 0) {
        res.status(422).json({
            thongbao: "Th\xf4ng tin input kh\xf4ng hợp lệ."
        });
        return;
    } //Kết thúc kiểm trả đk các giá trị submit lên
    let cluster;
    //Chạy connect đến db trước
    try {
        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .connectToMongoDb */ .bV)("qlgv");
    } catch (error) {
        res.status(500).json({
            thongbao: "Kết nối đến db qlgv thất bại."
        });
        cluster.close();
    }
    //Xử lý post request
    if (req.method === "POST") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .writeDataToMongoDb */ .iU)(cluster, "mangGiaoVien", req.body);
        } catch (error) {
            res.status(500).json({
                thongbao: "Th\xeam mới gi\xe1o vi\xean v\xe0o db thất bại."
            });
            cluster.close();
        }
        cluster.close();
    } //end if xử lý post
    //Xử lý get request
    if (req.method === "GET") {
        try {
            const dataGot = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .readDataFromMongoDb */ .Dt)(cluster, "mangGiaoVien");
            res.status(200).json({
                thongbao: "Lấy về data gi\xe1o vi\xean th\xe0nh c\xf4ng.",
                data: dataGot
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "Lấy về data gi\xe1o vi\xean thất bại"
            });
            cluster.close();
        }
        cluster.close();
    } //End if xử lý get
    //Xử lý del request
    if (req.method === "DELETE") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .deleteDataFromMongoDb */ .CA)(cluster, "mangGiaoVien", req.body);
            res.status(200).json({
                thongbao: "X\xf3a gi\xe1o vi\xean th\xe0nh c\xf4ng"
            });
        } catch (error) {
            res.status(500).json({
                thongbao: "X\xf3a gi\xe1o vi\xean thất bại."
            });
            cluster.close();
        }
        cluster.close();
    } // end delete request
    //Xử lý put request update thông tin giáo viên
    if (req.method === "PUT") {
        try {
            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__/* .replaceDataByIdToMongoDb */ .Mb)(cluster, "mangGiaoVien", req.body._id, req.body.data);
        } catch (error) {
            res.status(500).json({
                thongbao: 'Sửa th\xf4ng tin gi\xe1o vi\xean thất bại.'
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
var __webpack_exports__ = __webpack_require__.X(0, [387], () => (__webpack_exec__(6848)));
module.exports = __webpack_exports__;

})();