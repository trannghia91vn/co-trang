const handler = async (req, res) => {
  if (req.method === "POST") {
    //Des các prop ra kiểm tra trước
    const { email, password, token } = req.body;
    if (
      !email ||
      !password ||
      !token ||
      !email.includes("@") ||
      email.length === 0 ||
      password.length === 0
    ) {
      res
        .status(422)
        .json({ thongbao: "Thông tin đăng nhập thiếu hoặc không hợp lệ." });
      return;
    }
    //Xác định điều kiện đê trả vè token
    if (
      email === "phuongtrang.tranhuynh@gmail.com" &&
      password.toString() === "213120trasua"
    ) {
      res.status(200).json({ token: "Nghi@Tr@ngSushi2022" });
    } else {
      res.status(500).json({ thongbao: "Đăng nhập thất bại." });
      return;
    }
  }
};

export default handler;
