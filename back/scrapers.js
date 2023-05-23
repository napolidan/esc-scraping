const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
require('dotenv').config();

// to erase files
const fs = require('fs');

// erasing screenshots loop
let filePath = 'screenshot';
for(let file=1956; file<2025; file++){
  filePath += file+'.png';

  fs.unlink(filePath, (err) => {
    if (err) {
      // console.error(`Failed to delete the file: ${err}`);
      return;
    }
    // console.log('File deleted successfully');
  });

  filePath = 'screenshot';
}

app.use(express.static('build'));

let results = [];

app.use('/api/escResults', async (req, res)=> {
  res.send(results);
})

function Results(year, countries) {
  this.year = year;
  this.countries = countries
}

let time = 3;

async function scrapeESC(url){

  const browser = await puppeteer.launch({
    headless: 'new',
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });

    let year = 2016;
    let totalCountries = [];
    let counter = 0;

    while(year<=2018){

      const page = await browser.newPage();
      
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

      if(counter>3){
        await delay(time*1000);
      }

        await page.goto(url+`/${year}`,{waitUntil: 'domcontentloaded'});

        // await page.screenshot({path: `screenshot${year}.png`});

        const allCountries = await page.evaluate(() => {

        const countries = document.querySelectorAll('.v_table_main>tbody tr')

        return Array.from(countries).map((country) => {

        const name = country.querySelector('td:nth-child(2) a').innerText;
        const pointsTotal = parseInt(country.querySelector('td:nth-child(4) a').innerText);
        const juryPoints = parseInt(country.querySelector('td:nth-child(5)').innerText);
        const teleVotes =  parseInt(country.querySelector('td:nth-child(6)').innerText);
       

        return {
          "name": name,
          "totalPoints": pointsTotal,
          "juryPoints":juryPoints,
          "teleVotes" : teleVotes
        }

        });
        

      });


      const results = new Results(year, allCountries);

      totalCountries.push(results);

      console.log(year)

      await page.close();

      counter++;
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
