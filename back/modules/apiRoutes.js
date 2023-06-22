const express = require("express");
const abbreviationsRouter = express.Router();
const resultsRouter = express.Router();
let { resultsFinal, abbreviations } = require("./resultsData");

abbreviationsRouter.get("/", async (req, res) => {
  res.send(abbreviations);
});

//endpoint for a specific country of a specific year
resultsRouter.get("/:year/:country", (request, response) => {
  const resultsArray = JSON.parse(resultsFinal);
  const year = resultsArray.filter(
    (competition) => competition.year == request.params.year
  );
  const qualified = year[0].qualifiedCountries;
  const nonQualified = year[0].nonQualifiedCountries;
  const allCountries = qualified.concat(nonQualified);
  console.log(allCountries);
  const country = allCountries.filter(
    (x) => x.name.toLowerCase() == request.params.country.toLowerCase()
  );
  console.log(country);
  if (country[0].hasOwnProperty("juryPoints")) {
    country[0].qualified = true;
  } else {
    country[0].qualified = false;
  }
  country[0].year = request.params.year;
  response.send(country);
});

//endpoint of a specific year
resultsRouter.get("/:year", (request, response) => {
  const resultsArray = JSON.parse(resultsFinal);
  const year = resultsArray.filter(
    (competition) => competition.year == request.params.year
  );
  response.send(year);
});

//all results
resultsRouter.get("/", async (req, res) => {
  console.log(resultsFinal);
  res.send(resultsFinal);
});

module.exports = { abbreviationsRouter, resultsRouter };
