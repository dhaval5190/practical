const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
var cors = require("cors");
const authRouter = require("./routes/auth.route");
var corsOptions = {
  origin: "http://b020-2405-201-2024-aa5a-901a-f2b0-ab4f-6a9e.in.ngrok.io",
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
//Port and Connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();
