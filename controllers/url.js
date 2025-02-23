const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });
  const shortId = shortid();
  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(404).json({ message: "URL not found" });
  return res.json({ totalClicks: result.visitHistory.length , analytics : result.visitHistory});
}

module.exports = { handleGenerateShortUrl ,handleGetAnalytics };
