const express = require("express");
const app = express();
const connectDB = require("./db.js");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route.js");
const blogRouter = require("./routes/blog.route.js");

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();
const PORT = process.env.PORT;

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
