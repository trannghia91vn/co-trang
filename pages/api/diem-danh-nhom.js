import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  replaceDataByIdToMongoDb,
  deleteDataFromMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Des ra ba thông số cần thiết để kiểm tra đầu vào
  const { taughtDate, taughtTime, arrLearnedStus } = req.body;
  //Kết nối với db
  let cluster;
  try {
    cluster = await connectToMongoDb("ddn");
  } catch (error) {
    res
      .status(500)
      .json({ thongbao: "Kết nối đến db của điểm danh nhóm thất bại." });
  }
  //Xử lý post request
  if (req.method === "POST") {
    //Kiểm tra thông tin submit lên
    if (
      taughtDate.trim().length === 0 ||
      taughtTime === 0 ||
      arrLearnedStus.length === 0
    ) {
      res.status(422).json({
        thongbao:
          "Thông tin ngày , giờ dạy , danh sách học sinh nhóm không hợp lệ.",
      });
      return;
    } //End kiểm tra
    //Xử lý post
    try {
      await writeDataToMongoDb(cluster, "mangDiemDanhNhom", req.body);
      res
        .status(200)
        .json({ thongbao: "Lưu ngày điểm danh lên db thành công" });
    } catch (error) {
      res.status(500).json({ thongbao: "Lưu ngày điểm danh lên db thất bại." });
      cluster.close();
    }
    cluster.close();
  } //End post request

  //Xử lý get request
  if (req.method === "GET") {
    try {
      const data = await readDataFromMongoDb(cluster, "mangDiemDanhNhom");
      res
        .status(200)
        .json({ thongbao: "Get mảng điểm danh nhóm thành công", data: data });
    } catch (error) {
      res.status(500).json({ thongbao: "Get mảng điểm dánh nhóm lỗi." });
      cluster.close();
    }
    cluster.close();
  } //End get request

  //Xử lý put request
  if (req.method === "PUT") {
    try {
      await replaceDataByIdToMongoDb(
        cluster,
        "mangDiemDanhNhom",
        req.body.id,
        req.body.data
      );
      res.status(200).json({ thongbao: "Sửa ngày điêm danh nhóm thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Sửa ngày điêm danh nhóm thất bại." });
      cluster.close();
    }
    cluster.close();
  }

  //Xử lý del request
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangDiemDanhNhom", req.body);
      res.status(200).json({ thongbao: "Xóa ngày điêm danh nhóm thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Xóa ngày điêm danh nhóm thất bại." });
      cluster.close();
    }
    cluster.close();
  }
};

export default handler;
