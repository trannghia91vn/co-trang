import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  deleteDataFromMongoDb,
  replaceDataByIdToMongoDb,
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
      res
        .status(200)
        .json({ thongbao: "Lưu thông tin lớp nhóm vào db thành công." });
    } catch (error) {
      res
        .status(500)
        .json({ thongbao: "Lưu thông tin lớp nhóm vào db thất bại." });
      cluster.close();
    }
    cluster.close();
  } // End post request

  //Xử lý get request
  if (req.method === "GET") {
    try {
      const data = await readDataFromMongoDb(cluster, "mangLopNhom");
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({ thongbao: "Get data lớp nhóm từ db thất bại." });
      cluster.close();

      cluster.close();
    }
  }

  //Xử lý del request
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangLopNhom", req.body);
      res
      .status(200)
      .json({ thongbao: "Xóa thông tin lớp nhóm vào db thành công." });
    } catch (error) {
      res.status(500).json({ thongbao: "Xóa lớp nhóm thành công." });
      cluster.close();
    }
    cluster.close();
  } //End del request

  //Xử lý sửa request
  // if (req.method === "PUT") {
  //   try {
  //     await replaceDataByIdToMongoDb(
  //       cluster,
  //       "mangLopNhom",
  //       req.body.id,
  //       req.boyd.data
  //     );
  //   } catch (error) {
  //     res.status(500).json({thongbao:'Sửa thông tin lớp nhóm thất bại.'})
  //     cluster.close()
  //   }
  //   cluster.close();
  // } //End put request
};

export default handler;
