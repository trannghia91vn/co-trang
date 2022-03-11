"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/diem-danh-ca-nhan";
exports.ids = ["pages/api/diem-danh-ca-nhan"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "(api)/./pages/api/diem-danh-ca-nhan.js":
/*!****************************************!*\
  !*** ./pages/api/diem-danh-ca-nhan.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../support/uti-request/connect-to-mongodb */ \"(api)/./support/uti-request/connect-to-mongodb.js\");\n\nconst handler = async (req, res)=>{\n    //Des các props ra\n    const { idStu , nameStu , arrTeacherTaught , dateSingleCheck , typeSingleCheck  } = req.body;\n    //Tiến hành connect đến db\n    let cluster;\n    try {\n        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.connectToMongoDb)(\"ddcn\");\n    } catch (error) {\n        res.status(500).json({\n            thongbao: \"Kế nối đến db ddcn thất bại.\"\n        });\n    } //End connect\n    //Xử lý post request\n    if (req.method === \"POST\") {\n        //Tiến hành xác thực các thông tin submit lên có hợp lệ hay không\n        if (typeSingleCheck !== \"nghi\" && (idStu.trim().length === 0 || nameStu.trim().length === 0 || arrTeacherTaught.length === 0 || dateSingleCheck.trim().length === 0) || typeSingleCheck === \"nghi\" && dateSingleCheck.trim().length === 0) {\n            res.status(422).json({\n                thongbao: \"Th\\xf4ng tin điểm danh c\\xe1 nh\\xe2n kh\\xf4ng hợp lệ.\"\n            });\n            cluster.close();\n            return;\n        }\n        //Tiến hành submit thôi\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.writeDataToMongoDb)(cluster, \"mangDiemDanhCaNhan\", req.body);\n            res.status(200).json({\n                thongbao: \"Lưu th\\xf4ng tin điềm danh l\\xean db th\\xe0nh c\\xf4ng.\"\n            });\n        } catch (error) {\n            res.status(500).json({\n                thongbao: \"Lưu th\\xf4ng tin ng\\xe0y điểm danh l\\xean db thất bại\"\n            });\n            cluster.close();\n        }\n        cluster.close();\n    } //End post request\n    //Xử lý get request\n    if (req.method === \"GET\") {\n        try {\n            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.readDataFromMongoDb)(cluster, \"mangDiemDanhCaNhan\");\n            res.status(200).json({\n                thongbao: \"Lấy data từ mảng điểm danh c\\xe1 nh\\xe2n th\\xe0nh c\\xf4ng db.\",\n                data: data\n            });\n        } catch (error) {\n            res.status(500).json({\n                thongbao: \"Lấy data từ mảng điểm danh c\\xe1 nh\\xe2n db thất bại\"\n            });\n            cluster.close();\n        }\n        cluster.close();\n    } //End get request\n    //Xử lý edit request\n    if (req.method === \"PUT\") {\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.replaceDataByIdToMongoDb)(cluster, \"mangDiemDanhCaNhan\", req.body.id, req.body.data);\n            res.status(200).json({\n                thongbao: \"Sửa th\\xf4ng tin ng\\xe0y điềm danh l\\xean db th\\xe0nh c\\xf4ng.\"\n            });\n        } catch (error) {\n            res.status(500).json({\n                thongbao: \"Sửa th\\xf4ng tin ng\\xe0y điềm danh l\\xean db lỗi.\"\n            });\n            cluster.close();\n        }\n        cluster.close();\n    } //End put request\n    //Xử lý delete requsest\n    if (req.method === \"DELETE\") {\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.deleteDataFromMongoDb)(cluster, \"mangDiemDanhCaNhan\", req.body);\n            res.status(200).json({\n                thongbao: \"X\\xf3a ng\\xe0y điểm danh th\\xe0nh c\\xf4ng.\"\n            });\n        } catch (error) {\n            res.status(500).json({\n                thongbao: \"X\\xf3a ng\\xe0y điểm danh thất bại.\"\n            });\n            cluster.close();\n        }\n        cluster.close();\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZGllbS1kYW5oLWNhLW5oYW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNcUQ7QUFFckQsS0FBSyxDQUFDSyxPQUFPLFVBQVVDLEdBQUcsRUFBRUMsR0FBRyxHQUFLLENBQUM7SUFDbkMsRUFBa0I7SUFDakIsS0FBSSxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxHQUFFQyxPQUFPLEdBQUVDLGdCQUFnQixHQUFFQyxlQUFlLEdBQUVDLGVBQWUsRUFBQyxDQUFDLEdBQzFFTixHQUFHLENBQUNPLElBQUk7SUFFVixFQUEwQjtJQUNwQixHQUFILENBQUNDLE9BQU87SUFDWCxHQUFHLENBQUMsQ0FBQztRQUNIQSxPQUFPLEdBQUcsS0FBSyxDQUFDZCx5RkFBZ0IsQ0FBQyxDQUFNO0lBQ3pDLENBQUMsQ0FBQyxLQUFLLEVBQUVlLEtBQUssRUFBRSxDQUFDO1FBQ2ZSLEdBQUcsQ0FBQ1MsTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7WUFBQ0MsUUFBUSxFQUFFLENBQThCO1FBQVksQ0FBQztJQUNuRSxDQUFWLENBQWM7SUFFZixFQUFvQjtJQUNqQixFQUFELEVBQUVaLEdBQUcsQ0FBQ2EsTUFBTSxLQUFLLENBQU0sT0FBRSxDQUFDO1FBQzFCLEVBQWlFO1FBQ2xELEVBQWIsRUFDQ1AsZUFBZSxLQUFLLENBQU0sVUFDeEJKLEtBQUssQ0FBQ1ksSUFBSSxHQUFHQyxNQUFNLEtBQUssQ0FBQyxJQUN4QlosT0FBTyxDQUFDVyxJQUFJLEdBQUdDLE1BQU0sS0FBSyxDQUFDLElBQzNCWCxnQkFBZ0IsQ0FBQ1csTUFBTSxLQUFLLENBQUMsSUFDN0JWLGVBQWUsQ0FBQ1MsSUFBSSxHQUFHQyxNQUFNLEtBQUssQ0FBQyxLQUN0Q1QsZUFBZSxLQUFLLENBQU0sU0FBSUQsZUFBZSxDQUFDUyxJQUFJLEdBQUdDLE1BQU0sS0FBSyxDQUFDLEVBQ2xFLENBQUM7WUFDRGQsR0FBRyxDQUNBUyxNQUFNLENBQUMsR0FBRyxFQUNWQyxJQUFJLENB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SixPQUFPLENBQUNRLEtBQUs7UUFDZixDQUFDO1FBQ0RSLE9BQU8sQ0FBQ1EsS0FBSztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsaUVBQWVqQixPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb290Ly4vcGFnZXMvYXBpL2RpZW0tZGFuaC1jYS1uaGFuLmpzP2QwNTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY29ubmVjdFRvTW9uZ29EYixcbiAgd3JpdGVEYXRhVG9Nb25nb0RiLFxuICByZWFkRGF0YUZyb21Nb25nb0RiLFxuICByZXBsYWNlRGF0YUJ5SWRUb01vbmdvRGIsXG4gIGRlbGV0ZURhdGFGcm9tTW9uZ29EYixcbn0gZnJvbSBcIi4uLy4uL3N1cHBvcnQvdXRpLXJlcXVlc3QvY29ubmVjdC10by1tb25nb2RiXCI7XG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgLy9EZXMgY8OhYyBwcm9wcyByYVxuICBjb25zdCB7IGlkU3R1LCBuYW1lU3R1LCBhcnJUZWFjaGVyVGF1Z2h0LCBkYXRlU2luZ2xlQ2hlY2ssIHR5cGVTaW5nbGVDaGVjayB9ID1cbiAgICByZXEuYm9keTtcblxuICAvL1Rp4bq/biBow6BuaCBjb25uZWN0IMSR4bq/biBkYlxuICBsZXQgY2x1c3RlcjtcbiAgdHJ5IHtcbiAgICBjbHVzdGVyID0gYXdhaXQgY29ubmVjdFRvTW9uZ29EYihcImRkY25cIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyB0aG9uZ2JhbzogXCJL4bq/IG7hu5FpIMSR4bq/biBkYiBkZGNuIHRo4bqldCBi4bqhaS5cIiB9KTtcbiAgfSAvL0VuZCBjb25uZWN0XG5cbiAgLy9Y4butIGzDvSBwb3N0IHJlcXVlc3RcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgLy9UaeG6v24gaMOgbmggeMOhYyB0aOG7sWMgY8OhYyB0aMO0bmcgdGluIHN1Ym1pdCBsw6puIGPDsyBo4bujcCBs4buHIGhheSBraMO0bmdcbiAgICBpZiAoXG4gICAgICAodHlwZVNpbmdsZUNoZWNrICE9PSBcIm5naGlcIiAmJlxuICAgICAgICAoaWRTdHUudHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIG5hbWVTdHUudHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIGFyclRlYWNoZXJUYXVnaHQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgZGF0ZVNpbmdsZUNoZWNrLnRyaW0oKS5sZW5ndGggPT09IDApKSB8fFxuICAgICAgKHR5cGVTaW5nbGVDaGVjayA9PT0gXCJuZ2hpXCIgJiYgZGF0ZVNpbmdsZUNoZWNrLnRyaW0oKS5sZW5ndGggPT09IDApXG4gICAgKSB7XG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cyg0MjIpXG4gICAgICAgIC5qc29uKHsgdGhvbmdiYW86IFwiVGjDtG5nIHRpbiDEkWnhu4NtIGRhbmggY8OhIG5ow6JuIGtow7RuZyBo4bujcCBs4buHLlwiIH0pO1xuICAgICAgY2x1c3Rlci5jbG9zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vVGnhur9uIGjDoG5oIHN1Ym1pdCB0aMO0aVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3cml0ZURhdGFUb01vbmdvRGIoY2x1c3RlciwgXCJtYW5nRGllbURhbmhDYU5oYW5cIiwgcmVxLmJvZHkpO1xuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHRob25nYmFvOiBcIkzGsHUgdGjDtG5nIHRpbiDEkWnhu4FtIGRhbmggbMOqbiBkYiB0aMOgbmggY8O0bmcuXCIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLmpzb24oeyB0aG9uZ2JhbzogXCJMxrB1IHRow7RuZyB0aW4gbmfDoHkgxJFp4buDbSBkYW5oIGzDqm4gZGIgdGjhuqV0IGLhuqFpXCIgfSk7XG4gICAgICBjbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICAgIGNsdXN0ZXIuY2xvc2UoKTtcbiAgfSAvL0VuZCBwb3N0IHJlcXVlc3RcblxuICAvL1jhu60gbMO9IGdldCByZXF1ZXN0XG4gIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZWFkRGF0YUZyb21Nb25nb0RiKGNsdXN0ZXIsIFwibWFuZ0RpZW1EYW5oQ2FOaGFuXCIpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICB0aG9uZ2JhbzogXCJM4bqleSBkYXRhIHThu6sgbeG6o25nIMSRaeG7g20gZGFuaCBjw6EgbmjDom4gdGjDoG5oIGPDtG5nIGRiLlwiLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLmpzb24oeyB0aG9uZ2JhbzogXCJM4bqleSBkYXRhIHThu6sgbeG6o25nIMSRaeG7g20gZGFuaCBjw6EgbmjDom4gZGIgdGjhuqV0IGLhuqFpXCIgfSk7XG4gICAgICBjbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICAgIGNsdXN0ZXIuY2xvc2UoKTtcbiAgfSAvL0VuZCBnZXQgcmVxdWVzdFxuXG4gIC8vWOG7rSBsw70gZWRpdCByZXF1ZXN0XG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBVVFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHJlcGxhY2VEYXRhQnlJZFRvTW9uZ29EYihcbiAgICAgICAgY2x1c3RlcixcbiAgICAgICAgXCJtYW5nRGllbURhbmhDYU5oYW5cIixcbiAgICAgICAgcmVxLmJvZHkuaWQsXG4gICAgICAgIHJlcS5ib2R5LmRhdGFcbiAgICAgICk7XG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgdGhvbmdiYW86IFwiU+G7rWEgdGjDtG5nIHRpbiBuZ8OgeSDEkWnhu4FtIGRhbmggbMOqbiBkYiB0aMOgbmggY8O0bmcuXCIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLmpzb24oeyB0aG9uZ2JhbzogXCJT4butYSB0aMO0bmcgdGluIG5nw6B5IMSRaeG7gW0gZGFuaCBsw6puIGRiIGzhu5dpLlwiIH0pO1xuICAgICAgY2x1c3Rlci5jbG9zZSgpO1xuICAgIH1cbiAgICBjbHVzdGVyLmNsb3NlKCk7XG4gIH0gLy9FbmQgcHV0IHJlcXVlc3RcblxuICAvL1jhu60gbMO9IGRlbGV0ZSByZXF1c2VzdFxuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJERUxFVEVcIikge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkZWxldGVEYXRhRnJvbU1vbmdvRGIoY2x1c3RlciwgXCJtYW5nRGllbURhbmhDYU5oYW5cIiwgcmVxLmJvZHkpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB0aG9uZ2JhbzogXCJYw7NhIG5nw6B5IMSRaeG7g20gZGFuaCB0aMOgbmggY8O0bmcuXCIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgdGhvbmdiYW86IFwiWMOzYSBuZ8OgeSDEkWnhu4NtIGRhbmggdGjhuqV0IGLhuqFpLlwiIH0pO1xuICAgICAgY2x1c3Rlci5jbG9zZSgpO1xuICAgIH1cbiAgICBjbHVzdGVyLmNsb3NlKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7XG4iXSwibmFtZXMiOlsiY29ubmVjdFRvTW9uZ29EYiIsIndyaXRlRGF0YVRvTW9uZ29EYiIsInJlYWREYXRhRnJvbU1vbmdvRGIiLCJyZXBsYWNlRGF0YUJ5SWRUb01vbmdvRGIiLCJkZWxldGVEYXRhRnJvbU1vbmdvRGIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiaWRTdHUiLCJuYW1lU3R1IiwiYXJyVGVhY2hlclRhdWdodCIsImRhdGVTaW5nbGVDaGVjayIsInR5cGVTaW5nbGVDaGVjayIsImJvZHkiLCJjbHVzdGVyIiwiZXJyb3IiLCJzdGF0dXMiLCJqc29uIiwidGhvbmdiYW8iLCJtZXRob2QiLCJ0cmltIiwibGVuZ3RoIiwiY2xvc2UiLCJkYXRhIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/diem-danh-ca-nhan.js\n");

/***/ }),

/***/ "(api)/./support/uti-request/connect-to-mongodb.js":
/*!***************************************************!*\
  !*** ./support/uti-request/connect-to-mongodb.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectToMongoDb\": () => (/* binding */ connectToMongoDb),\n/* harmony export */   \"writeDataToMongoDb\": () => (/* binding */ writeDataToMongoDb),\n/* harmony export */   \"readDataFromMongoDb\": () => (/* binding */ readDataFromMongoDb),\n/* harmony export */   \"deleteDataFromMongoDb\": () => (/* binding */ deleteDataFromMongoDb),\n/* harmony export */   \"replaceDataByIdToMongoDb\": () => (/* binding */ replaceDataByIdToMongoDb)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectToMongoDb = async (dbName)=>{\n    const cluster = await mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient.connect(`mongodb+srv://phuongtrangxinhdep:rwK6BAsRXk0Xlob6@cluster0.hf5pn.mongodb.net/${dbName}?retryWrites=true&w=majority`);\n    return cluster;\n};\nconst writeDataToMongoDb = async (cluster, collection, data)=>{\n    //Lấy về database\n    const db = cluster.db();\n    //Tiến hành ghi lên db\n    await db.collection(collection).insertOne(data);\n};\nconst readDataFromMongoDb = async (cluster, collection)=>{\n    //Lấy vè database\n    const db = cluster.db();\n    //Đọc dữ liệu và lấy về\n    const data = await db.collection(collection).find().sort({\n        _id: -1\n    }).toArray();\n    return data;\n};\nconst deleteDataFromMongoDb = async (cluster, collection, id)=>{\n    //Lấy về database\n    const db = cluster.db();\n    //Tiến hành xóa data dựa vào id\n    await db.collection(collection).deleteOne({\n        _id: (0,mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId)(id)\n    });\n};\n//Cập nhật một nội dung trên db\nconst replaceDataByIdToMongoDb = async (cluster, collection, id, objReplace)=>{\n    //Lấy về databalse\n    const db = cluster.db();\n    //Tiến hành cập nhật data ghi đè theo id\n    await db.collection(collection).replaceOne({\n        _id: (0,mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId)(id)\n    }, {\n        _id: (0,mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId)(id),\n        ...objReplace\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zdXBwb3J0L3V0aS1yZXF1ZXN0L2Nvbm5lY3QtdG8tbW9uZ29kYi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStDO0FBRXhDLEtBQUssQ0FBQ0UsZ0JBQWdCLFVBQVVDLE1BQU0sR0FBSyxDQUFDO0lBQ2pELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEtBQUssQ0FBQ0osd0RBQW1CLEVBQ3RDLDZFQUE2RSxFQUFFRyxNQUFNLENBQUMsNEJBQTRCO0lBRXJILE1BQU0sQ0FBQ0MsT0FBTztBQUNoQixDQUFDO0FBRU0sS0FBSyxDQUFDRSxrQkFBa0IsVUFBVUYsT0FBTyxFQUFFRyxVQUFVLEVBQUVDLElBQUksR0FBSyxDQUFDO0lBQ3RFLEVBQWlCO0lBQ2IsS0FBQyxDQUFDQyxFQUFFLEdBQUdMLE9BQU8sQ0FBQ0ssRUFBRTtJQUNyQixFQUFzQjtJQUNsQixLQUFDLENBQUNBLEVBQUUsQ0FBQ0YsVUFBVSxDQUFDQSxVQUFVLEVBQUVHLFNBQVMsQ0FBQ0YsSUFBSTtBQUNoRCxDQUFDO0FBRU0sS0FBSyxDQUFDRyxtQkFBbUIsVUFBVVAsT0FBTyxFQUFFRyxVQUFVLEdBQUssQ0FBQztJQUNqRSxFQUFpQjtJQUNkLEtBQUUsQ0FBQ0UsRUFBRSxHQUFHTCxPQUFPLENBQUNLLEVBQUU7SUFDckIsRUFBdUI7SUFDWCxLQUFQLENBQUNELElBQUksR0FBRyxLQUFLLENBQUNDLEVBQUUsQ0FDbEJGLFVBQVUsQ0FBQ0EsVUFBVSxFQUNyQkssSUFBSSxHQUNKQyxJQUFJLENBQUMsQ0FBQztRQUFDQyxHQUFHLEdBQUcsQ0FBQztJQUFDLENBQUMsRUFDaEJDLE9BQU87SUFDVixNQUFNLENBQUNQLElBQUk7QUFDYixDQUFDO0FBRU0sS0FBSyxDQUFDUSxxQkFBcUIsVUFBVVosT0FBTyxFQUFFRyxVQUFVLEVBQUVVLEVBQUUsR0FBSyxDQUFDO0lBQ3ZFLEVBQWlCO0lBQ2IsS0FBQyxDQUFDUixFQUFFLEdBQUdMLE9BQU8sQ0FBQ0ssRUFBRTtJQUNyQixFQUErQjtJQUN4QixLQUFGLENBQUNBLEVBQUUsQ0FBQ0YsVUFBVSxDQUFDQSxVQUFVLEVBQUVXLFNBQVMsQ0FBQyxDQUFDO1FBQUNKLEdBQUcsRUFBRWIsaURBQVEsQ0FBQ2dCLEVBQUU7SUFBRSxDQUFDO0FBQ2pFLENBQUM7QUFFRCxFQUErQjtBQUN4QixLQUFLLENBQUNFLHdCQUF3QixVQUNuQ2YsT0FBTyxFQUNQRyxVQUFVLEVBQ1ZVLEVBQUUsRUFDRkcsVUFBVSxHQUNQLENBQUM7SUFDSixFQUFrQjtJQUNkLEtBQUMsQ0FBQ1gsRUFBRSxHQUFHTCxPQUFPLENBQUNLLEVBQUU7SUFDckIsRUFBd0M7SUFDeEMsS0FBSyxDQUFDQSxFQUFFLENBQ0xGLFVBQVUsQ0FBQ0EsVUFBVSxFQUNyQmMsVUFBVSxDQUFDLENBQUM7UUFBQ1AsR0FBRyxFQUFFYixpREFBUSxDQUFDZ0IsRUFBRTtJQUFFLENBQUMsRUFBRSxDQUFDO1FBQUNILEdBQUcsRUFBRWIsaURBQVEsQ0FBQ2dCLEVBQUU7V0FBTUcsVUFBVTtJQUFDLENBQUM7QUFDM0UsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb3QvLi9zdXBwb3J0L3V0aS1yZXF1ZXN0L2Nvbm5lY3QtdG8tbW9uZ29kYi5qcz8xOTEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50LCBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0VG9Nb25nb0RiID0gYXN5bmMgKGRiTmFtZSkgPT4ge1xuICBjb25zdCBjbHVzdGVyID0gYXdhaXQgTW9uZ29DbGllbnQuY29ubmVjdChcbiAgICBgbW9uZ29kYitzcnY6Ly9waHVvbmd0cmFuZ3hpbmhkZXA6cndLNkJBc1JYazBYbG9iNkBjbHVzdGVyMC5oZjVwbi5tb25nb2RiLm5ldC8ke2RiTmFtZX0/cmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5YFxuICApO1xuICByZXR1cm4gY2x1c3Rlcjtcbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZURhdGFUb01vbmdvRGIgPSBhc3luYyAoY2x1c3RlciwgY29sbGVjdGlvbiwgZGF0YSkgPT4ge1xuICAvL0zhuqV5IHbhu4EgZGF0YWJhc2VcbiAgY29uc3QgZGIgPSBjbHVzdGVyLmRiKCk7XG4gIC8vVGnhur9uIGjDoG5oIGdoaSBsw6puIGRiXG4gIGF3YWl0IGRiLmNvbGxlY3Rpb24oY29sbGVjdGlvbikuaW5zZXJ0T25lKGRhdGEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlYWREYXRhRnJvbU1vbmdvRGIgPSBhc3luYyAoY2x1c3RlciwgY29sbGVjdGlvbikgPT4ge1xuICAvL0zhuqV5IHbDqCBkYXRhYmFzZVxuICBjb25zdCBkYiA9IGNsdXN0ZXIuZGIoKTtcbiAgLy/EkOG7jWMgZOG7ryBsaeG7h3UgdsOgIGzhuqV5IHbhu4FcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRiXG4gICAgLmNvbGxlY3Rpb24oY29sbGVjdGlvbilcbiAgICAuZmluZCgpXG4gICAgLnNvcnQoeyBfaWQ6IC0xIH0pXG4gICAgLnRvQXJyYXkoKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlRGF0YUZyb21Nb25nb0RiID0gYXN5bmMgKGNsdXN0ZXIsIGNvbGxlY3Rpb24sIGlkKSA9PiB7XG4gIC8vTOG6pXkgduG7gSBkYXRhYmFzZVxuICBjb25zdCBkYiA9IGNsdXN0ZXIuZGIoKTtcbiAgLy9UaeG6v24gaMOgbmggeMOzYSBkYXRhIGThu7FhIHbDoG8gaWRcbiAgYXdhaXQgZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKS5kZWxldGVPbmUoeyBfaWQ6IE9iamVjdElkKGlkKSB9KTtcbn07XG5cbi8vQ+G6rXAgbmjhuq10IG3hu5l0IG7hu5lpIGR1bmcgdHLDqm4gZGJcbmV4cG9ydCBjb25zdCByZXBsYWNlRGF0YUJ5SWRUb01vbmdvRGIgPSBhc3luYyAoXG4gIGNsdXN0ZXIsXG4gIGNvbGxlY3Rpb24sXG4gIGlkLFxuICBvYmpSZXBsYWNlXG4pID0+IHtcbiAgLy9M4bqleSB24buBIGRhdGFiYWxzZVxuICBjb25zdCBkYiA9IGNsdXN0ZXIuZGIoKTtcbiAgLy9UaeG6v24gaMOgbmggY+G6rXAgbmjhuq10IGRhdGEgZ2hpIMSRw6ggdGhlbyBpZFxuICBhd2FpdCBkYlxuICAgIC5jb2xsZWN0aW9uKGNvbGxlY3Rpb24pXG4gICAgLnJlcGxhY2VPbmUoeyBfaWQ6IE9iamVjdElkKGlkKSB9LCB7IF9pZDogT2JqZWN0SWQoaWQpLCAuLi5vYmpSZXBsYWNlIH0pO1xufTtcbiJdLCJuYW1lcyI6WyJNb25nb0NsaWVudCIsIk9iamVjdElkIiwiY29ubmVjdFRvTW9uZ29EYiIsImRiTmFtZSIsImNsdXN0ZXIiLCJjb25uZWN0Iiwid3JpdGVEYXRhVG9Nb25nb0RiIiwiY29sbGVjdGlvbiIsImRhdGEiLCJkYiIsImluc2VydE9uZSIsInJlYWREYXRhRnJvbU1vbmdvRGIiLCJmaW5kIiwic29ydCIsIl9pZCIsInRvQXJyYXkiLCJkZWxldGVEYXRhRnJvbU1vbmdvRGIiLCJpZCIsImRlbGV0ZU9uZSIsInJlcGxhY2VEYXRhQnlJZFRvTW9uZ29EYiIsIm9ialJlcGxhY2UiLCJyZXBsYWNlT25lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./support/uti-request/connect-to-mongodb.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/diem-danh-ca-nhan.js"));
module.exports = __webpack_exports__;

})();