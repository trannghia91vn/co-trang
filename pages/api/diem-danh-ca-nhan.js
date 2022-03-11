import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  replaceDataByIdToMongoDb,
  deleteDataFromMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Des các props ra
  const { idStu, nameStu, arrTeacherTaught, dateSingleCheck, typeSingleCheck } =
    req.body;

  //Tiến hành connect đến db
  let cluster;
  try {
    cluster = await connectToMongoDb("ddcn");
  } catch (error) {
    res.status(500).json({ thongbao: "Kế nối đến db ddcn thất bại." });
  } //End connect

  //Xử lý post request
  if (req.method === "POST") {
    //Tiến hành xác thực các thông tin submit lên có hợp lệ hay không
    if (
      (typeSingleCheck !== "nghi" &&
        (idStu.trim().length === 0 ||
          nameStu.trim().length === 0 ||
          arrTeacherTaught.length === 0 ||
          dateSingleCheck.trim().length === 0)) ||
      (typeSingleCheck === "nghi" && dateSingleCheck.trim().length === 0)
    ) {
      res
        .status(422)
        .json({ thongbao: "Thông tin điểm danh cá nhân không hợp lệ." });
      cluster.close();
      return;
    }

    //Tiến hành submit thôi
    try {
      await writeDataToMongoDb(cluster, "mangDiemDanhCaNhan", req.body);
      res
        .status(200)
        .json({ thongbao: "Lưu thông tin điềm danh lên db thành công." });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lưu thông tin ngày điểm danh lên db thất bại" });
      cluster.close();
    }
    cluster.close();
  } //End post request

  //Xử lý get request
  if (req.method === "GET") {
    try {
      const data = await readDataFromMongoDb(cluster, "mangDiemDanhCaNhan");
      res.status(200).json({
        thongbao: "Lấy data từ mảng điểm danh cá nhân thành công db.",
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lấy data từ mảng điểm danh cá nhân db thất bại" });
      cluster.close();
    }
    cluster.close();
  } //End get request

  //Xử lý edit request
  if (req.method === "PUT") {
    try {
      await replaceDataByIdToMongoDb(
        cluster,
        "mangDiemDanhCaNhan",
        req.body.id,
        req.body.data
      );
      res
        .status(200)
        .json({ thongbao: "Sửa thông tin ngày điềm danh lên db thành công." });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Sửa thông tin ngày điềm danh lên db lỗi." });
      cluster.close();
    }
    cluster.close();
  } //End put request

  //Xử lý delete requsest
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangDiemDanhCaNhan", req.body);
      res.status(200).json({ thongbao: "Xóa ngày điểm danh thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Xóa ngày điểm danh thất bại." });
      cluster.close();
    }
    cluster.close();
  }
};

export default handler;
