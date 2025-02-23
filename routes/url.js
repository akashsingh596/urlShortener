const express = require("express");

const router = express.Router();

const {
  handleGenerateShortUrl,
  handleGetAnalytics,
  handleGetURL
} = require("../controllers/url");

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleGetURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
