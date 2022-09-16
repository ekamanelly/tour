const mongoose = require("mongoose");
export const db = async (db2:any) => {
  mongoose.connect(db2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var connection = mongoose.connection;
  await connection.on("connected", function () {
    console.log("db connected db2");
  });
};
