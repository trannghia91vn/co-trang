import {
  connectToMongoDb,
  writeDataToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Tách ra từ body các props
  const { nameClass, arrTags } = req.body;
  //Tiến hành kết nối với mongoDb
  let cluster;
  try {
    cluster = await connectToMongoDb("qlln");
  } catch (error) {
    res.status(500).json({ thongbao: "Kết nối đến cluster qlln thất bại" });
  }

  //Xử lý POST
  if (req.method === "POST") {
    //Kiểm tra điều kiện
    if (nameClass.trim().length === 0 || arrTags.length === 0) {
      res
        .status(422)
        .json({ thongbao: "Tên lớp hoặc danh sách học sinh không hợp lệ." });
      return;
    }
    //Tiến hành lưu vào db
    try {
      await writeDataToMongoDb(cluster, "mangLopNhom", req.body);
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lưu thông tin lớp nhóm vào db thất bại." });
      cluster.close();
    }
    cluster.close();
  } // End post request


};

export default handler;
