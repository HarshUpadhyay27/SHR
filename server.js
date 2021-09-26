require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))

const URL = process.env.MONGODB_URL;
mongoose
  .connect(URL, (err) => {
    if(err) throw err;
    console.log('connected to MongoDB')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});