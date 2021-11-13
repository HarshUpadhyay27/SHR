require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Socket } = require("socket.io");
const SocketServer = require('./SocketServer')

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  SocketServer(socket)
});

app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
