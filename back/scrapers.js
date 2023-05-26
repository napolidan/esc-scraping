const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
require("dotenv").config();

// to erase files
const fs = require("fs");

// erasing screenshots loop
let filePath = "screenshot";
for (let file = 1956; file < 2025; file++) {
  filePath += file + ".png";

  fs.unlink(filePath, (err) => {
    if (err) {
      // console.error(`Failed to delete the file: ${err}`);
      return;
    }
    // console.log('File deleted successfully');
  });

  filePath = "screenshot";
}

app.use(express.static("build"));

let results = [];

app.get("/api/escResults/:year/:country", (request, response) => {
  const resultsArray = JSON.parse(results);
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

app.get("/api/escResults/:year", (request, response) => {
  const resultsArray = JSON.parse(results);
  const year = resultsArray.filter(
    (competition) => competition.year == request.params.year
  );
  response.send(year);
});

app.use("/api/escResults", async (req, res) => {
  res.send(results);
});

function Results(year, qualifiedCountries, nonQualifiedCountries) {
  this.year = year;
  this.qualifiedCountries = qualifiedCountries;
  this.nonQualifiedCountries = nonQualifiedCountries;
}

let time = 3;

async function scrapeESC(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });

  let year = 2023;
  let totalCountries = [];
  let counter = 0;

  while (year >= 2021) {
    const page = await browser.newPage();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (counter > 3) {
      await delay(time * 1000);
    }

    await page.goto(url + `/${year}`, { waitUntil: "domcontentloaded" });

    // await page.screenshot({path: `screenshot${year}.png`});

    const qualifiedCountries = await page.evaluate(async () => {
      const countriesFinal = document.querySelectorAll(
        ".v_table_main>tbody tr"
      );

      const promises = Array.from(countriesFinal).map(async (country) => {
        console.log(country);
        const name = country.querySelector("td:nth-child(2) a").innerText;
        const pointsTotal = parseInt(
          country.querySelector("td:nth-child(4) a").innerText
        );
        const juryPoints =
          country.querySelector("td:nth-child(6)") !== null
            ? parseInt(country.querySelector("td:nth-child(6)").innerText)
            : null;
        const teleVotes =
          country.querySelector("td:nth-child(6)") !== null
            ? parseInt(country.querySelector("td:nth-child(5)").innerText)
            : null;

        const countryRequest = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const information = await countryRequest.json();
        console.log(information);
        const flag = information[0].flags.png;

        return {
          name: name,
          flag: flag,
          totalPoints: pointsTotal,
          juryPoints: juryPoints,
          teleVotes: teleVotes,
        };
      });

      return Promise.all(promises);
    });

    const nonQualifiedCountries = await page.evaluate(() => {
      const droppedCountries = document.querySelectorAll(
        ".v_table_out>tbody tr"
      );

      const promises2 = Array.from(droppedCountries).map(async (country) => {
        console.log(country);
        const name = country.querySelector("td:nth-child(2) a").innerText;
        const pointsTotal = country.querySelector("td:nth-child(4)").innerText;
        const countryRequest = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const information = await countryRequest.json();
        console.log(information);
        const flag = information[0].flags.svg;

        return {
          name: name,
          flag: flag,
          totalPoints: pointsTotal,
        };
      });
      return Promise.all(promises2);
    });

    const results = new Results(
      year,
      qualifiedCountries,
      nonQualifiedCountries
    );

    totalCountries.push(results);

    console.log(year);

    await page.close();

    counter++;
    year--;
  }

  // await page.screenshot({path: `screenshot${year}.png`});

  const totalCountriesJSON = JSON.stringify(totalCountries);

  results = totalCountriesJSON;

  // console.log(totalCountriesJSON);
  await browser.close();

  return totalCountriesJSON;
}

scrapeESC("https://eurovisionworld.com/eurovision");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
