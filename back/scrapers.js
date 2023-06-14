const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());

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
        const flag = information[0].flags.svg;
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
        const name = country.querySelector("td:nth-child(2) a").innerText;
        const pointsTotal = country.querySelector("td:nth-child(4)").innerText;
        const countryRequest = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const information = await countryRequest.json();
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

    await page.evaluate(async () => {
      console.log("hola");
      const buttonSelector = '[data-button="tele"]';
      const buttonElement = document.querySelector(buttonSelector);
      console.log(buttonElement.innerText);

      await buttonElement.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const scores = await page.evaluate(() => {
      const scores = document.querySelectorAll(".scoreboard_table>tbody tr");
      const arrayScores = Array.from(scores);
      let points = [];

      for (let i = 0; i < arrayScores.length; i++) {
        const teleVotes = {
          name: "",
          [parseInt(1)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(2)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(3)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(4)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(5)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(6)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(7)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(8)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(10)]: {
            amount: 0,
            countries: [],
          },
          [parseInt(12)]: {
            amount: 0,
            countries: [],
          },
        };

        for (let j = 4; j < arrayScores[i].children.length; j++) {
          const number = parseInt(
            arrayScores[i].querySelector(`td:nth-child(${j + 1})`).innerText
          );
          console.log(number);
          if (!isNaN(number) && teleVotes.hasOwnProperty(number)) {
            teleVotes[number].amount = teleVotes[number].amount + 1;
            const givenCountries = Array.from(
              document.querySelectorAll(".scoreboard_table>thead tr td")
            );
            teleVotes[number].countries.push(
              givenCountries[j - 3].getAttribute("data-from")
            );
          }
        }
        const countryName =
          arrayScores[i].querySelector(`td:nth-child(3)`).innerText;
        teleVotes.name = countryName;
        delete teleVotes.NaN;
        points.push(teleVotes);
      }
      return points;
    });

    results.teleVotesRecieved = scores;
    for (const country of results.qualifiedCountries) {
      country.teleVotesReceived = [];
      for (const key in results.teleVotesRecieved) {
        const votes = results.teleVotesRecieved[key];
        if (votes.name === country.name) {
          for (const amount in votes) {
            if (amount !== "name" && votes[amount].amount !== 0) {
              country.teleVotesReceived.push({
                amount: parseInt(amount),
                countries: votes[amount].countries,
              });
            }
          }
          break;
        }
      }
    }

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
