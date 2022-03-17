import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  deleteDataFromMongoDb,
  replaceDataByIdToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Đầu tiên là kết nối với db
  let cluster;
  try {
    cluster = await connectToMongoDb("lgv");
  } catch (error) {
    res.status(500).json({ thongbao: "Kết nối đến db Lương giáo viên lỗi." });
    cluster.close();
  }
  //////////////////////////////////////////////////
  //Xử lý Post request
  if (req.method === "POST") {
    //Des ra các input để kiểm tra
    const { idTea, monthYear } = req.body;
    if (
      !idTea ||
      !monthYear ||
      monthYear.month.toString().trim().length === 0 ||
      monthYear.year.toString().trim().length === 0
    ) {
      res.status(422).json({
        thongbao: "IdTea hoặc ngày tháng post lương giáo viên không đúng.",
      });
      return;
    } //End kiẻm tra
    //Chạy post
    try {
      await writeDataToMongoDb(cluster, "mangLuongThangGiaoVien", req.body);
      res
        .status(200)
        .json({ thongbao: "Lưu lương tháng giáo viên vào db thành công." });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lưu lương tháng giáo viên vào db lỗi." });
      cluster.close();
    }
    cluster.close();
  } //End post request
  //////////////////////////////////////////////////
  //Xử lý Get Request
  if (req.method === "GET") {
    try {
      const dataGot = await readDataFromMongoDb(
        cluster,
        "mangLuongThangGiaoVien"
      );
      res.status(200).json({
        thongbao: "Lấy data lương tháng giáo viên thành công.",
        data: dataGot,
      });
    } catch (error) {
      res.status(500).json({ thongbao: "Lấy data lương tháng giáo viên lỗi." });
      cluster.close();
    }
    cluster.close();
  }
  //////////////////////////////////////////////////
  //Xử lý Put request
  if (req.method === "PUT") {
    try {
      await replaceDataByIdToMongoDb(
        cluster,
        "mangLuongThangGiaoVien",
        req.body.id,
        req.body.data
      );
      res.status(200).json({
        thongbao: "Sửa data lương tháng giáo viên thành công.",
      });
    } catch (error) {
      res.status(500).json({
        thongbao: "Sửa data lương tháng giáo viên lỗi.",
      });
      cluster.close();
    }
    cluster.close();
  }
  //////////////////////////////////////////////////
  //Xử lý xóa request
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangLuongThangGiaoVien", req.body);
      res.status(200).json({
        thongbao: "Xóa data lương tháng giáo viên thành công.",
      });
    } catch (error) {
      res.status(200).json({
        thongbao: "Xóa data lương tháng giáo viên lỗi.",
      });
      cluster.close();
    }
    cluster.close();
  }
  //////////////////////////////////////////////////
};

export default handler;
