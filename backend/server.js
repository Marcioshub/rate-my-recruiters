const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");
const app = express();

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

app.listen(process.env.PORT, () =>
  console.log(`Running on port: ${process.env.PORT}`.yellow.underline)
);
