const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const { eraseScreenshots } = require("./modules/fileUtils");
const {
  abbreviationsRouter,
  resultsRouter,
} = require("./modules/apiRoutes");



app.use(cors());
app.use(express.static("build"));

// Erase screenshots
eraseScreenshots();

// API Routes
app.use("/api/escResults/abbreviations", abbreviationsRouter);
app.use("/api/escResults", resultsRouter);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
