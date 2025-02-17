const express = require("express");
const app = express();
const port = 8001;
const connectMongoDB = require("./connect");
const urlRoute = require("./routes/url");
const path = require("path");
const URL = require("./models/url");

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

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { date: new Date() },
      },
    }
  );
  res.redirect((await URL.findOne({ shortId })).redirectUrl);
});

app.use("/", staticRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
