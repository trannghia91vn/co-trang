import { MongoClient, ObjectId } from "mongodb";

export const connectToMongoDb = async (dbName) => {
  const cluster = await MongoClient.connect(
    `mongodb+srv://phuongtrangxinhdep:rwK6BAsRXk0Xlob6@cluster0.hf5pn.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
  return cluster;
};

export const writeDataToMongoDb = async (cluster, collection, data) => {
  //Lấy về database
  const db = cluster.db();
  //Tiến hành ghi lên db
  await db.collection(collection).insertOne(data);
};

export const readDataFromMongoDb = async (cluster, collection) => {
  //Lấy vè database
  const db = cluster.db();
  //Đọc dữ liệu và lấy về
  const data = await db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();
  return data;
};

export const deleteDataFromMongoDb = async (cluster, collection, id) => {
  //Lấy về database
  const db = cluster.db();
  //Tiến hành xóa data dựa vào id
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

//Cập nhật một nội dung trên db
export const replaceDataByIdToMongoDb = async (
  cluster,
  collection,
  id,
  objReplace
) => {
  //Lấy về databalse
  const db = cluster.db();
  //Tiến hành cập nhật data ghi đè theo id
  await db
    .collection(collection)
    .replaceOne({ _id: ObjectId(id) }, { _id: ObjectId(id), ...objReplace });
};
