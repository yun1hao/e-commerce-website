const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectString =
  "mongodb+srv://chuwaProject:Niyunhao00000@cluster0.xayb32r.mongodb.net/?retryWrites=true&w=majority";

const connectToMongodb = () => {
  mongoose.connect(connectString);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb");
  });
};

module.exports = connectToMongodb;
