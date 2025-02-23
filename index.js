const express = require("express");
const app = express();
const port = 8001;
const connectMongoDB = require("./connect");
const urlRoute = require("./routes/url");
const path = require("path");
const URL = require("./models/url");

const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

connectMongoDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);
app.use("/analytics/:shortId" , urlRoute)
app.use("/url/:shortId" , urlRoute)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
