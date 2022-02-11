const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");
const app = express();

app.use(express.static(path.join(__dirname, "../frontend/build")));

// connect to MongoDB
connectDB();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.use(require("./middleware/errorHandler").errorHandler);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port: ${process.env.PORT}`.yellow.underline)
);
