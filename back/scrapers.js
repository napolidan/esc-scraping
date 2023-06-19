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
//copy front to back
app.use(express.static("build"));

//final result array that will be sent to the api
let results = [];

//endpoint for a specific country of a specific year
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

//endpoint of a specific year
app.get("/api/escResults/:year", (request, response) => {
  const resultsArray = JSON.parse(results);
  const year = resultsArray.filter(
    (competition) => competition.year == request.params.year
  );
  response.send(year);
});

//all results
app.use("/api/escResults", async (req, res) => {
  res.send(results);
});

//the result object
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
  //array where the information of the results is stored
  let totalCountries = [];
  let counter = 0;

  //year can be modified based on needs, loop the info year by year
  while (year >= 2021) {
    const page = await browser.newPage();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (counter > 3) {
      await delay(time * 1000);
    }

    await page.goto(url + `/${year}`, { waitUntil: "domcontentloaded" });

    // await page.screenshot({path: `screenshot${year}.png`});

    //scrap first countries qualified to final
    const qualifiedCountries = await page.evaluate(async () => {
      const countriesFinal = document.querySelectorAll(
        ".v_table_main>tbody tr"
      );

      //map each country found - name, points, flag
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

        //return a json object of the mapping
        return {
          name: name,
          flag: flag,
          totalPoints: pointsTotal,
          juryPointsTotal: juryPoints,
          teleVotesTotal: teleVotes,
        };
      });

      return Promise.all(promises);
    });

    //do the same thing for nonqualified countries as done for qualified countries
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
        //return json of mapping (doesnt include seperately televotes and jurypoints)
        return {
          name: name,
          flag: flag,
          totalPoints: pointsTotal,
        };
      });
      return Promise.all(promises2);
    });

    //create a result json that include the current year of the loop and arrays of the qualified/noncualified countries
    const results = new Results(
      year,
      qualifiedCountries,
      nonQualifiedCountries
    );

    //find specific data of the televotes received
    await page.evaluate(async () => {
      const buttonSelector = '[data-button="tele"]';
      const buttonElement = document.querySelector(buttonSelector);

      //click the televotes button to see the specific data of televotes
      await buttonElement.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    //find specific televotes
    const scores = await page.evaluate(() => {
      const scores = document.querySelectorAll(".scoreboard_table>tbody tr");
      const arrayScores = Array.from(scores);
      let points = [];

      for (let i = 0; i < arrayScores.length; i++) {
        //create a json that includes every point
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
        // find every point with scrapping
        for (let j = 4; j < arrayScores[i].children.length; j++) {
          const number = parseInt(
            arrayScores[i].querySelector(`td:nth-child(${j + 1})`).innerText
          );
          //increase the amount of the found number in the televotes json
          if (!isNaN(number) && teleVotes.hasOwnProperty(number)) {
            teleVotes[number].amount = teleVotes[number].amount + 1;
            //find the countries that have given the point
            const givenCountries = Array.from(
              document.querySelectorAll(".scoreboard_table>thead tr td")
            );
            //add the abbrevation of the country to the country array of the object
            teleVotes[number].countries.push(
              givenCountries[j - 3].getAttribute("data-from")
            );
          }
        }
        //add the country who received the points
        const countryName =
          arrayScores[i].querySelector(`td:nth-child(3)`).innerText;
        teleVotes.name = countryName;
        delete teleVotes.NaN;
        points.push(teleVotes);
      }
      return points;
    });

    //modify the final json so, that each country will have the televotesReceived as their property in the json
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

    //do the same thing to jury votes that was did to televotes
    await page.evaluate(async () => {
      const buttonSelector = '[data-button="jury"]';
      const buttonElement = document.querySelector(buttonSelector);
      console.log(buttonElement.innerText);

      await buttonElement.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const juryScores = await page.evaluate(() => {
      const scores = document.querySelectorAll(".scoreboard_table>tbody tr");
      const arrayScores = Array.from(scores);
      let points = [];

      for (let i = 0; i < arrayScores.length; i++) {
        const juryPoints = {
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
          if (!isNaN(number) && juryPoints.hasOwnProperty(number)) {
            juryPoints[number].amount = juryPoints[number].amount + 1;
            const givenCountries = Array.from(
              document.querySelectorAll(".scoreboard_table>thead tr td")
            );
            juryPoints[number].countries.push(
              givenCountries[j - 3].getAttribute("data-from")
            );
          }
        }
        const countryName =
          arrayScores[i].querySelector(`td:nth-child(3)`).innerText;
        juryPoints.name = countryName;
        delete juryPoints.NaN;
        points.push(juryPoints);
      }
      return points;
    });

    results.juryPointsRecieved = juryScores;
    for (const country of results.qualifiedCountries) {
      country.juryPointsRecieved = [];
      for (const key in results.juryPointsRecieved) {
        const points = results.juryPointsRecieved[key];
        if (points.name === country.name) {
          for (const amount in points) {
            if (amount !== "name" && points[amount].amount !== 0) {
              country.juryPointsRecieved.push({
                amount: parseInt(amount),
                countries: points[amount].countries,
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

  const totalCountriesJSON = JSON.stringify(totalCountries);
  //update results object that will be send to the api
  results = totalCountriesJSON;
  await browser.close();
  return totalCountriesJSON;
}

scrapeESC("https://eurovisionworld.com/eurovision");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
