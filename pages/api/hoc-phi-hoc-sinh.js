import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  deleteDataFromMongoDb,
  replaceDataByIdToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Đầu tiên là tiến hành kết nối với db
  let cluster;
  try {
    cluster = await connectToMongoDb("hphs");
  } catch (error) {
    res.status(500).json({ thongbao: "Kết nối đến db học phí học sinh lỗi." });
  } //End connect
  ////////////////////////////////////////////////////////////////////////////
  //Xử lý post request
  if (req.method === "POST") {
    //Des các prop cần để xác thực thong tin submit lên
    const { idStu, monthYear, totalSingleDates, totalGroupDates } = req.body;
    //Kiểm tra
    if (
      !idStu ||
      idStu.trim().length === 0 ||
      !monthYear ||
      monthYear.month === "" ||
      monthYear === "" ||
      (totalSingleDates === 0 && totalGroupDates === 0)
    ) {
      res.status(422).json({
        thongbao: "Thông tin submit thêm học phí tháng không hợp lệ.",
      });
      return;
    } //End kiểm tra
    //Tiến hành lưu vào db
    try {
      await writeDataToMongoDb(cluster, "mangHocPhiThangHocSinh", req.body);
      res
        .status(200)
        .json({ thongbao: "Lưu thông tin học phí tháng hs thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Lưu thông tin học phí tháng hs lỗi." });
      cluster.close();
    }
    cluster.close();
  } //End post request
  ////////////////////////////////////////////////////////////////////////////
  //Xử lý get request
  if (req.method === "GET") {
    try {
      const data = await readDataFromMongoDb(cluster, "mangHocPhiThangHocSinh");
      res.status(200).json({
        thongbao: "Lấy data học phí tháng học sinh từ db thành công.",
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lấy data học phí tháng học sinh lỗi." });
      cluster.close();
    }
    cluster.close();
  } //end get request
  ////////////////////////////////////////////////////////////////////////////
  //Xử lý del request
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangHocPhiThangHocSinh", req.body);
      res
        .status(200)
        .json({ thongbao: "Xóa học phí tháng học sinh thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Xóa học phí tháng học sinh lỗi." });
      cluster.close();
    }
    cluster.close();
  } // end del request
};

export default handler;
