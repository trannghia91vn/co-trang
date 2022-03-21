import {
  connectToMongoDb,
  writeDataToMongoDb,
  readDataFromMongoDb,
  deleteDataFromMongoDb,
  replaceDataByIdToMongoDb,
} from "../../support/uti-request/connect-to-mongodb";

const handler = async (req, res) => {
  //Tiến hành kết nối đến db
  let cluster;
  try {
    cluster = await connectToMongoDb("qlhs");
  } catch (error) {
    res.status(500).json({
      thongbao: "Kết nối đến mongodb thất bại.",
    });
    cluster.close();
  } //end try-catch kết nối

  //Xử lý post request
  if (req.method === "POST") {
    //Des các prosp cần kiểm tra
    const { singleClass, groupClass, singleFee, groupFee, nameStu } = req.body;

    //Đầu tiên là tiến hành xác thực các thông tin submit
    if (
      (!singleClass && !groupClass) ||
      (+singleFee === 0 && +groupFee === 0) ||
      (singleClass && +singleFee === 0) ||
      (groupClass && +groupFee === 0) ||
      nameStu.trim().length === 0
    ) {
      res.status(422).json({
        thongbao: "Thông tin cung cấp không đúng . Vui lòng thử lại.",
        data: req.body,
      });
      return;
    }
    //Tiến hành ghi vào database
    try {
      await writeDataToMongoDb(cluster, "mangHocSinh", req.body);
      res.status(200).json({
        thongbao: "Lưu thông tin học sinh mới vào mongodb thành công",
      });
    } catch (error) {
      cluster.close();
      res.status(500).json({
        thongbao: "Lưu thông tin học sinh mới vào mongodb thất bại",
      });
    } //end try-catch lưu vào db
    cluster.close();
  } //end post request
  //Xử lý get request
  if (req.method === "GET") {
    try {
      const data = await readDataFromMongoDb(cluster, "mangHocSinh");
      res.status(200).json({
        thongbao: "Get thông tin học sinh từ db thành công",
        data: data,
      });
    } catch (error) {
      cluster.close();
      res.status(500).json({
        thongbao: "Get thông tin học sinh từ db thất bại.",
      });
    } //End try catch get request
    cluster.close();
  }

  //Xử lý request Delete
  if (req.method === "DELETE") {
    // console.log(JSON.parse({ _id: ObjectId("621b5e0e3d53b59411a4c5c0") }));
    try {
      await deleteDataFromMongoDb(cluster, "mangHocSinh", req.body);
      res.status(200).json({ thongbao: "Xóa item thành công" });
    } catch (error) {
      cluster.close();
      res.status(422).json({ thongbao: "Xóa item lỗi" });
    }
    cluster.close();
  }

  //Xử lý request Put đẻ cập nhật thông tin sửa đổi cho học sinn
  if (req.method === "PUT") {
    //Trong đó req.body là chuôi id của item được cấp bởi mongodb
    try {
      await replaceDataByIdToMongoDb(
        cluster,
        "mangHocSinh",
        req.body._id,
        req.body.data
      );
      res.status(200).json({ thongbao: "Cập nhật học sinh thành công" });
    } catch (error) {
      res.status(422).json({ thongbao: "Cập nhật học sinh thất bại" });
      cluster.close();
    }
    cluster.close();
  }
};

export default handler;
