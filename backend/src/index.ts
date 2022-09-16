import { createApp } from "./app";
import { db } from "./database";
// require("dotenv").config();

const app = createApp();
const PORT = 9000;
db(
  "mongodb://mongo:27017/Sample"
).then(() => {
  app.listen(PORT, async () => {
    console.log("server connected to port:", PORT);
  });
});
