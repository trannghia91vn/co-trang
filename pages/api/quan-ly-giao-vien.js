import {
  connectToMongoDb,
  writeDataToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";
const handler = async (req, res) => {
  //Xử lý kiểm tra điều kiện của thông tin submit lên
  const { singleWage, groupWage, name } = req.body;
  if (+singleWage === 0 || +groupWage === 0 || name.trim().length === 0) {
    res.status(422).json({ thongbao: "Thông tin input không hợp lệ." });
    return;
  } //Kết thúc kiểm trả đk các giá trị submit lên
  let cluster;
  //Chạy connect đến db trước
  try {
    cluster = await connectToMongoDb("qlgv");
  } catch (error) {
    res.status(500).json({ thongbao: "Kết nối đến db qlgv thất bại." });
    cluster.close();
  }
  //Xử lý post request
  if (req.method === "POST") {
    try {
      await writeDataToMongoDb(cluster, "mangGiaoVien", req.body);
    } catch (error) {
      res.status(500).json({ thongbao: "Thêm mới giáo viên vào db thất bại." });
      cluster.close();
    }
    cluster.close();
  } //end if xử lý post
};
export default handler;
