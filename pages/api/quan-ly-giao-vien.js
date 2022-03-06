import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  deleteDataFromMongoDb,
  replaceDataByIdToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";
const handler = async (req, res) => {
  //Xử lý kiểm tra điều kiện của thông tin submit lên
  const { singleWage, groupWage, name } = req.body;
  if (+singleWage === 0 && +groupWage === 0) {
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

  //Xử lý get request
  if (req.method === "GET") {
    try {
      const dataGot = await readDataFromMongoDb(cluster, "mangGiaoVien");
      res.status(200).json({
        thongbao: "Lấy về data giáo viên thành công.",
        data: dataGot,
      });
    } catch (error) {
      res.status(500).json({
        thongbao: "Lấy về data giáo viên thất bại",
      });
      cluster.close();
    }
    cluster.close();
  } //End if xử lý get

  //Xử lý del request
  if (req.method === "DELETE") {
    try {
      await deleteDataFromMongoDb(cluster, "mangGiaoVien", req.body);
      res.status(200).json({
        thongbao: "Xóa giáo viên thành công",
      });
    } catch (error) {
      res.status(500).json({
        thongbao: "Xóa giáo viên thất bại.",
      });
      cluster.close();
    }
    cluster.close();
  } // end delete request

  //Xử lý put request update thông tin giáo viên
  if (req.method === "PUT") {
    try {
      await replaceDataByIdToMongoDb(
        cluster,
        "mangGiaoVien",
        req.body._id,
        req.body.data
      );
    } catch (error) {
      res.status(500).json({thongbao:'Sửa thông tin giáo viên thất bại.'})
      cluster.close()
    }
    cluster.close()
  }
};
export default handler;
