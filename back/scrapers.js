const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static('build'));

let results = [];

app.use('/api/escResults', async (req, res)=> {
  res.send(results);
})

function Results(year, countries) {
  this.year = year;
  this.countries = countries
}

let time = 2;

async function scrapeESC(url){

  const browser = await puppeteer.launch({
    headless: 'new',
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });

    let year = 2017;
    let totalCountries = [];

    while(year<2024){

      const page = await browser.newPage();

      await page.goto(url+`/${year}`,{waitUntil: 'domcontentloaded'});

      await page.screenshot({path: `screenshot${year}.png`});

      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

      const allCountries = await page.evaluate(() => {

        const countries = document.querySelectorAll('.v_table_main>tbody tr');

        return Array.from(countries).map((country) => {

          const name = country.querySelector('td:nth-child(2) a').innerText;

          return name;

        });

      });

      const results = new Results(year, allCountries);

      totalCountries.push(results);

      console.log(year)

      await page.close();

      await delay(time*1000);
      year++;
    }

    const totalCountriesJSON = JSON.stringify(totalCountries);

    results = totalCountriesJSON

    console.log(totalCountriesJSON);
    await browser.close();

    return totalCountriesJSON;
}

scrapeESC('https://eurovisionworld.com/eurovision');

console.log(results);

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
