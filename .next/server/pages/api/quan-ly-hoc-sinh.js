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
exports.id = "pages/api/quan-ly-hoc-sinh";
exports.ids = ["pages/api/quan-ly-hoc-sinh"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "(api)/./pages/api/quan-ly-hoc-sinh.js":
/*!***************************************!*\
  !*** ./pages/api/quan-ly-hoc-sinh.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../support/uti-request/connect-to-mongodb */ \"(api)/./support/uti-request/connect-to-mongodb.js\");\n\nconst handler = async (req, res)=>{\n    //Tiến hành kết nối đến db\n    let cluster;\n    try {\n        cluster = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.connectToMongoDb)(\"qlhs\");\n    } catch (error) {\n        res.status(500).json({\n            thongbao: \"Kết nối đến mongodb thất bại.\"\n        });\n        cluster.close();\n    } //end try-catch kết nối\n    //Xử lý post request\n    if (req.method === \"POST\") {\n        //Des các prosp cần kiểm tra\n        const { singleClass , groupClass , singleFee , groupFee , nameStu  } = req.body;\n        //Đầu tiên là tiến hành xác thực các thông tin submit\n        if (!singleClass && !groupClass || +singleFee === 0 && +groupFee === 0 || singleClass && +singleFee === 0 || groupClass && +groupFee === 0 || nameStu.trim().length === 0) {\n            res.status(422).json({\n                thongbao: \"Th\\xf4ng tin cung cấp kh\\xf4ng đ\\xfang . Vui l\\xf2ng thử lại.\",\n                data: req.body\n            });\n            return;\n        }\n        //Tiến hành ghi vào database\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.writeDataToMongoDb)(cluster, \"mangHocSinh\", req.body);\n            res.status(200).json({\n                thongbao: \"Lưu th\\xf4ng tin học sinh mới v\\xe0o mongodb th\\xe0nh c\\xf4ng\"\n            });\n        } catch (error) {\n            cluster.close();\n            res.status(500).json({\n                thongbao: \"Lưu th\\xf4ng tin học sinh mới v\\xe0o mongodb thất bại\"\n            });\n        } //end try-catch lưu vào db\n        cluster.close();\n    } //end post request\n    //Xử lý get request\n    if (req.method === \"GET\") {\n        try {\n            const data = await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.readDataFromMongoDb)(cluster, \"mangHocSinh\");\n            res.status(200).json({\n                thongbao: \"Get th\\xf4ng tin học sinh từ db th\\xe0nh c\\xf4ng\",\n                data: data\n            });\n        } catch (error) {\n            cluster.close();\n            res.status(500).json({\n                thongbao: \"Get th\\xf4ng tin học sinh từ db thất bại.\"\n            });\n        } //End try catch get request\n        cluster.close();\n    }\n    //Xử lý request Delete\n    if (req.method === \"DELETE\") {\n        // console.log(JSON.parse({ _id: ObjectId(\"621b5e0e3d53b59411a4c5c0\") }));\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.deleteDataFromMongoDb)(cluster, \"mangHocSinh\", req.body);\n            res.status(200).json({\n                thongbao: \"X\\xf3a item th\\xe0nh c\\xf4ng\"\n            });\n        } catch (error) {\n            cluster.close();\n            res.status(422).json({\n                thongbao: \"X\\xf3a item lỗi\"\n            });\n        }\n        cluster.close();\n    }\n    //Xử lý request Put đẻ cập nhật thông tin sửa đổi cho học sinn\n    if (req.method === \"PUT\") {\n        //Trong đó req.body là chuôi id của item được cấp bởi mongodb\n        try {\n            await (0,_support_uti_request_connect_to_mongodb__WEBPACK_IMPORTED_MODULE_0__.replaceDataByIdToMongoDb)(cluster, \"mangHocSinh\", req.body._id, req.body.data);\n            res.status(200).json({\n                thongbao: \"Cập nhật học sinh th\\xe0nh c\\xf4ng\"\n            });\n        } catch (error) {\n            res.status(422).json({\n                thongbao: \"Cập nhật học sinh thất bại\"\n            });\n            cluster.close();\n        }\n        cluster.close();\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcXVhbi1seS1ob2Mtc2luaC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQU1xRDtBQUVyRCxLQUFLLENBQUNLLE9BQU8sVUFBVUMsR0FBRyxFQUFFQyxHQUFHLEdBQUssQ0FBQztJQUNuQyxFQUEwQjtJQUNoQixHQUFQLENBQUNDLE9BQU87SUFDWCxHQUFHLENBQUMsQ0FBQztRQUNIQSxPQUFPLEdBQUcsS0FBSyxDQUFDUix5RkFBZ0IsQ0FBQyxDQUFNO0lBQ3pDLENBQUMsQ0FBQyxLQUFLLEVBQUVTLEtBQUssRUFBRSxDQUFDO1FBQ2ZGLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7WUFDcEJDLFFBQVEsRUFBRSxDQUErQjtRQUNoQyxDQUFWO1FBQ0RKLE9BQU8sQ0FBQ0ssS0FBSztJQUNmLENBQUMsQ0FBd0IsRUFBSTtJQUV6QixFQUFnQjtJQUNqQixFQUFELEVBQUVQLEdBQUcsQ0FBQ1EsTUFBTSxLQUFLLENBQU0sT0FBRSxDQUFDO1FBQzFCLEVBQTRCO1FBQ3ZCLE1BQUMsQ0FBQyxDQUFDQyxXQUFXLEdBQUVDLFVBQVUsR0FBRUMsU0FBUyxHQUFFQyxRQUFRLEdBQUVDLE9BQU8sRUFBQyxDQUFDLEdBQUdiLEdBQUcsQ0FBQ2MsSUFBSTtRQUUxRSxFQUFxRDtRQUN4QyxFQUFYLEdBQ0VMLFdBQVcsS0FBS0MsVUFBVSxLQUMxQkMsU0FBUyxLQUFLLENBQUMsS0FBS0MsUUFBUSxLQUFLLENBQUMsSUFDbkNILFdBQVcsS0FBS0UsU0FBUyxLQUFLLENBQUMsSUFDL0JELFVBQVUsS0FBS0UsUUFBUSxLQUFLLENBQUMsSUFDOUJDLE9BQU8sQ0FBQ0UsSUFBSSxHQUFHQyxNQUFNLEtBQUssQ0FBQyxFQUMzQixDQUFDO1lBQ0RmLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCQyxRQUFRLEVBQUUsQ0FBbUQ7Z0JBQ2xEVyxJQUFQLEVBQUVqQixHQUFHLENBQUNjLElBQUk7WUFDaEIsQ0FBQztZQUNELE1BQU07UUFDUixDQUFDO1FBQ0QsRUFBNEI7UUFDeEIsR0FBRCxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUNuQiwyRkFBa0IsQ0FBQ08sT0FBTyxFQUFFLENBQWEsY0FBRUYsR0FBRyxDQUFDYyxJQUFJO1lBQ3pEYixHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO2dCQUNwQkMsUUFBUSxFQUFFLENBQW1EO1lBQ3RELENBQVI7UUFDSCxDQUFDLENBQUMsS0FBSyxFQUFFSCxLQUFLLEVBQUUsQ0FBQztZQUNmRCxPQUFPLENBQUNLLEtBQUs7WUFDYk4sR0FBRyxDQUFDRyxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLENBQUMsQ0FBQztnQkFDcEJDLFFBQVEsRUFBRSxDQUFpRDtZQUNsRCxDQUFWO1FBQ0gsQ0FBQyxDQUEyQixFQUFFO1FBQzVCSixPQUFLLENBQUNLLEtBQUs7SUFDZixDQUFDLENBQW1CO0lBQ3BCLEVBQW1CO0lBQ2hCLEVBQUQsRUFBRVAsR0FBRyxDQUFDUSxNQUFNLEtBQUssQ0FBSyxNQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUNTLElBQUksR0FBRyxLQUFLLENBQUNyQiw0RkFBbUIsQ0FBQ00sT0FBTyxFQUFFLENBQWE7WUFDN0RELEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCQyxRQUFRLEVBQUUsQ0FBeUM7Z0JBQzVDVyxJQUFILEVBQUVBLElBQUk7WUFDWixDQUFDO1FBQ0gsQ0FBQyxDQUFDLEtBQUssRUFBRWQsS0FBSyxFQUFFLENBQUM7WUFDZkQsT0FBTyxDQUFDSyxLQUFLO1lBQ2JOLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCQyxRQUFRLEVBQUUsQ0FBd0M7WUFDM0MsQ0FBUjtRQUNILENBQUMsQ0FBNEI7UUFDN0JKLE9BQU8sQ0FBQ0ssS0FBSztJQUNmLENBQUM7SUFFRCxFQUFzQjtJQUNuQixFQUFELEVBQUVQLEdBQUcsQ0FBQ1EsTUFBTSxLQUFLLENBQVEsU0FBRSxDQUFDO1FBQzVCLEVBQTBFO1FBQzFFLEdBQUcsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDWCw4RkFBcUIsQ0FBQ0ssT0FBTyxFQUFFLENBQWEsY0FBRUYsR0FBRyxDQUFDYyxJQUFJO1lBQzVEYixHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO2dCQUFDQyxRQUFRLEVBQUUsQ0FBcUI7WUFBSSxDQUFDO1FBQzFELENBQUYsQ0FBQyxLQUFLLEVBQUVILEtBQUssRUFBRSxDQUFDO1lBQ2ZELE9BQU8sQ0FBQ0ssS0FBSztZQUNiTixHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO2dCQUFDQyxRQUFRLEVBQUUsQ0FBYztZQUFJLENBQUM7UUFDbkQsQ0FBRjtRQUNESixPQUFPLENBQUNLLEtBQUs7SUFDZixDQUFDO0lBRUQsRUFBOEQ7SUFDNUMsRUFBaEIsRUFBRVAsR0FBRyxDQUFDUSxNQUFNLEtBQUssQ0FBSyxNQUFFLENBQUM7UUFDekIsRUFBNkQ7UUFDL0MsR0FBWCxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUNWLGlHQUF3QixDQUM1QkksT0FBTyxFQUNQLENBQWEsY0FDYkYsR0FBRyxDQUFDYyxJQUFJLENBQUNJLEdBQUcsRUFDWmxCLEdBQUcsQ0FBQ2MsSUFBSSxDQUFDRyxJQUFJO1lBRWZoQixHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO2dCQUFDQyxRQUFRLEVBQUUsQ0FBOEI7WUFBUyxDQUFDO1FBQ25FLENBQVAsQ0FBQyxLQUFLLEVBQUVILEtBQUssRUFBRSxDQUFDO1lBQ2ZGLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7Z0JBQUNDLFFBQVEsRUFBRSxDQUE0QjtZQUFDLENBQUM7WUFDL0RKLE9BQU8sQ0FBQ0ssS0FBSztRQUNmLENBQUM7UUFDREwsT0FBTyxDQUFDSyxLQUFLO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZVIsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9vdC8uL3BhZ2VzL2FwaS9xdWFuLWx5LWhvYy1zaW5oLmpzPzkxZjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY29ubmVjdFRvTW9uZ29EYixcbiAgd3JpdGVEYXRhVG9Nb25nb0RiLFxuICByZWFkRGF0YUZyb21Nb25nb0RiLFxuICBkZWxldGVEYXRhRnJvbU1vbmdvRGIsXG4gIHJlcGxhY2VEYXRhQnlJZFRvTW9uZ29EYixcbn0gZnJvbSBcIi4uLy4uL3N1cHBvcnQvdXRpLXJlcXVlc3QvY29ubmVjdC10by1tb25nb2RiXCI7XG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgLy9UaeG6v24gaMOgbmgga+G6v3QgbuG7kWkgxJHhur9uIGRiXG4gIGxldCBjbHVzdGVyO1xuICB0cnkge1xuICAgIGNsdXN0ZXIgPSBhd2FpdCBjb25uZWN0VG9Nb25nb0RiKFwicWxoc1wiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICB0aG9uZ2JhbzogXCJL4bq/dCBu4buRaSDEkeG6v24gbW9uZ29kYiB0aOG6pXQgYuG6oWkuXCIsXG4gICAgfSk7XG4gICAgY2x1c3Rlci5jbG9zZSgpO1xuICB9IC8vZW5kIHRyeS1jYXRjaCBr4bq/dCBu4buRaVxuXG4gIC8vWOG7rSBsw70gcG9zdCByZXF1ZXN0XG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIC8vRGVzIGPDoWMgcHJvc3AgY+G6p24ga2nhu4NtIHRyYVxuICAgIGNvbnN0IHsgc2luZ2xlQ2xhc3MsIGdyb3VwQ2xhc3MsIHNpbmdsZUZlZSwgZ3JvdXBGZWUsIG5hbWVTdHUgfSA9IHJlcS5ib2R5O1xuXG4gICAgLy/EkOG6p3UgdGnDqm4gbMOgIHRp4bq/biBow6BuaCB4w6FjIHRo4buxYyBjw6FjIHRow7RuZyB0aW4gc3VibWl0XG4gICAgaWYgKFxuICAgICAgKCFzaW5nbGVDbGFzcyAmJiAhZ3JvdXBDbGFzcykgfHxcbiAgICAgICgrc2luZ2xlRmVlID09PSAwICYmICtncm91cEZlZSA9PT0gMCkgfHxcbiAgICAgIChzaW5nbGVDbGFzcyAmJiArc2luZ2xlRmVlID09PSAwKSB8fFxuICAgICAgKGdyb3VwQ2xhc3MgJiYgK2dyb3VwRmVlID09PSAwKSB8fFxuICAgICAgbmFtZVN0dS50cmltKCkubGVuZ3RoID09PSAwXG4gICAgKSB7XG4gICAgICByZXMuc3RhdHVzKDQyMikuanNvbih7XG4gICAgICAgIHRob25nYmFvOiBcIlRow7RuZyB0aW4gY3VuZyBj4bqlcCBraMO0bmcgxJHDum5nIC4gVnVpIGzDsm5nIHRo4butIGzhuqFpLlwiLFxuICAgICAgICBkYXRhOiByZXEuYm9keSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL1Rp4bq/biBow6BuaCBnaGkgdsOgbyBkYXRhYmFzZVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB3cml0ZURhdGFUb01vbmdvRGIoY2x1c3RlciwgXCJtYW5nSG9jU2luaFwiLCByZXEuYm9keSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHRob25nYmFvOiBcIkzGsHUgdGjDtG5nIHRpbiBo4buNYyBzaW5oIG3hu5tpIHbDoG8gbW9uZ29kYiB0aMOgbmggY8O0bmdcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjbHVzdGVyLmNsb3NlKCk7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgIHRob25nYmFvOiBcIkzGsHUgdGjDtG5nIHRpbiBo4buNYyBzaW5oIG3hu5tpIHbDoG8gbW9uZ29kYiB0aOG6pXQgYuG6oWlcIixcbiAgICAgIH0pO1xuICAgIH0gLy9lbmQgdHJ5LWNhdGNoIGzGsHUgdsOgbyBkYlxuICAgIGNsdXN0ZXIuY2xvc2UoKTtcbiAgfSAvL2VuZCBwb3N0IHJlcXVlc3RcbiAgLy9Y4butIGzDvSBnZXQgcmVxdWVzdFxuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZERhdGFGcm9tTW9uZ29EYihjbHVzdGVyLCBcIm1hbmdIb2NTaW5oXCIpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICB0aG9uZ2JhbzogXCJHZXQgdGjDtG5nIHRpbiBo4buNYyBzaW5oIHThu6sgZGIgdGjDoG5oIGPDtG5nXCIsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2x1c3Rlci5jbG9zZSgpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICB0aG9uZ2JhbzogXCJHZXQgdGjDtG5nIHRpbiBo4buNYyBzaW5oIHThu6sgZGIgdGjhuqV0IGLhuqFpLlwiLFxuICAgICAgfSk7XG4gICAgfSAvL0VuZCB0cnkgY2F0Y2ggZ2V0IHJlcXVlc3RcbiAgICBjbHVzdGVyLmNsb3NlKCk7XG4gIH1cblxuICAvL1jhu60gbMO9IHJlcXVlc3QgRGVsZXRlXG4gIGlmIChyZXEubWV0aG9kID09PSBcIkRFTEVURVwiKSB7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZSh7IF9pZDogT2JqZWN0SWQoXCI2MjFiNWUwZTNkNTNiNTk0MTFhNGM1YzBcIikgfSkpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkZWxldGVEYXRhRnJvbU1vbmdvRGIoY2x1c3RlciwgXCJtYW5nSG9jU2luaFwiLCByZXEuYm9keSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHRob25nYmFvOiBcIljDs2EgaXRlbSB0aMOgbmggY8O0bmdcIiB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2x1c3Rlci5jbG9zZSgpO1xuICAgICAgcmVzLnN0YXR1cyg0MjIpLmpzb24oeyB0aG9uZ2JhbzogXCJYw7NhIGl0ZW0gbOG7l2lcIiB9KTtcbiAgICB9XG4gICAgY2x1c3Rlci5jbG9zZSgpO1xuICB9XG5cbiAgLy9Y4butIGzDvSByZXF1ZXN0IFB1dCDEkeG6uyBj4bqtcCBuaOG6rXQgdGjDtG5nIHRpbiBz4butYSDEkeG7lWkgY2hvIGjhu41jIHNpbm5cbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUFVUXCIpIHtcbiAgICAvL1Ryb25nIMSRw7MgcmVxLmJvZHkgbMOgIGNodcO0aSBpZCBj4bunYSBpdGVtIMSRxrDhu6NjIGPhuqVwIGLhu59pIG1vbmdvZGJcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcmVwbGFjZURhdGFCeUlkVG9Nb25nb0RiKFxuICAgICAgICBjbHVzdGVyLFxuICAgICAgICBcIm1hbmdIb2NTaW5oXCIsXG4gICAgICAgIHJlcS5ib2R5Ll9pZCxcbiAgICAgICAgcmVxLmJvZHkuZGF0YVxuICAgICAgKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgdGhvbmdiYW86IFwiQ+G6rXAgbmjhuq10IGjhu41jIHNpbmggdGjDoG5oIGPDtG5nXCIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDIyKS5qc29uKHsgdGhvbmdiYW86IFwiQ+G6rXAgbmjhuq10IGjhu41jIHNpbmggdGjhuqV0IGLhuqFpXCIgfSk7XG4gICAgICBjbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICAgIGNsdXN0ZXIuY2xvc2UoKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjtcbiJdLCJuYW1lcyI6WyJjb25uZWN0VG9Nb25nb0RiIiwid3JpdGVEYXRhVG9Nb25nb0RiIiwicmVhZERhdGFGcm9tTW9uZ29EYiIsImRlbGV0ZURhdGFGcm9tTW9uZ29EYiIsInJlcGxhY2VEYXRhQnlJZFRvTW9uZ29EYiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJjbHVzdGVyIiwiZXJyb3IiLCJzdGF0dXMiLCJqc29uIiwidGhvbmdiYW8iLCJjbG9zZSIsIm1ldGhvZCIsInNpbmdsZUNsYXNzIiwiZ3JvdXBDbGFzcyIsInNpbmdsZUZlZSIsImdyb3VwRmVlIiwibmFtZVN0dSIsImJvZHkiLCJ0cmltIiwibGVuZ3RoIiwiZGF0YSIsIl9pZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/quan-ly-hoc-sinh.js\n");

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
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/quan-ly-hoc-sinh.js"));
module.exports = __webpack_exports__;

})();