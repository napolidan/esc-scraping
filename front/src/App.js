import React, { useState, useEffect, PureComponent } from "react";
import escService from "./services/results";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "@picocss/pico";


import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const App = () => {
  const [results, setResults] = useState([]);
  const [orderByTeleVotes, setOrderByTelevotes] = useState([]);
  const [lessJury, setLessJury] = useState([]);
  const [overall, setOverall] = useState([]);

  const [dataSet, setDataSet] = useState({
    datasets: [
      {
      label: 'A dataset',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ]
  });
  
  useEffect(() => {
    const generateData = () => results.map((competition) => {
      const newData = competition.qualifiedCountries.map((item)=> ({
        x: item.juryPoints,
        y: item.teleVotes,
        label: item.name,
      }));

      setDataSet(prevDataset => ({
        ...prevDataset,
        datasets: prevDataset.datasets.map(ds => ({
          ...ds,
          data: newData
        }))
      }));

    });

    generateData();
  }, []);

  const data = [
    {
      year: 2023,
      qualifiedCountries: [
        {
          name: "Sweden",
          totalPoints: 583,
          juryPoints: 340,
          teleVotes: 243,
        },
        {
          name: "Finland",
          totalPoints: 526,
          juryPoints: 150,
          teleVotes: 376,
        },
        {
          name: "Israel",
          totalPoints: 362,
          juryPoints: 177,
          teleVotes: 185,
        },
        {
          name: "Italy",
          totalPoints: 350,
          juryPoints: 176,
          teleVotes: 174,
        },
        {
          name: "Norway",
          totalPoints: 268,
          juryPoints: 52,
          teleVotes: 216,
        },
        {
          name: "Ukraine",
          totalPoints: 243,
          juryPoints: 54,
          teleVotes: 189,
        },
        {
          name: "Belgium",
          totalPoints: 182,
          juryPoints: 127,
          teleVotes: 55,
        },
        {
          name: "Estonia",
          totalPoints: 168,
          juryPoints: 146,
          teleVotes: 22,
        },
        {
          name: "Australia",
          totalPoints: 151,
          juryPoints: 130,
          teleVotes: 21,
        },
        {
          name: "Czechia",
          totalPoints: 129,
          juryPoints: 94,
          teleVotes: 35,
        },
        {
          name: "Lithuania",
          totalPoints: 127,
          juryPoints: 81,
          teleVotes: 46,
        },
        {
          name: "Cyprus",
          totalPoints: 126,
          juryPoints: 68,
          teleVotes: 58,
        },
        {
          name: "Croatia",
          totalPoints: 123,
          juryPoints: 11,
          teleVotes: 112,
        },
        {
          name: "Armenia",
          totalPoints: 122,
          juryPoints: 69,
          teleVotes: 53,
        },
        {
          name: "Austria",
          totalPoints: 120,
          juryPoints: 104,
          teleVotes: 16,
        },
        {
          name: "France",
          totalPoints: 104,
          juryPoints: 54,
          teleVotes: 50,
        },
        {
          name: "Spain",
          totalPoints: 100,
          juryPoints: 95,
          teleVotes: 5,
        },
        {
          name: "Moldova",
          totalPoints: 96,
          juryPoints: 20,
          teleVotes: 76,
        },
        {
          name: "Poland",
          totalPoints: 93,
          juryPoints: 12,
          teleVotes: 81,
        },
        {
          name: "Switzerland",
          totalPoints: 92,
          juryPoints: 61,
          teleVotes: 31,
        },
        {
          name: "Slovenia",
          totalPoints: 78,
          juryPoints: 33,
          teleVotes: 45,
        },
        {
          name: "Albania",
          totalPoints: 76,
          juryPoints: 17,
          teleVotes: 59,
        },
        {
          name: "Portugal",
          totalPoints: 59,
          juryPoints: 43,
          teleVotes: 16,
        },
        {
          name: "Serbia",
          totalPoints: 30,
          juryPoints: 14,
          teleVotes: 16,
        },
        {
          name: "United Kingdom",
          totalPoints: 24,
          juryPoints: 15,
          teleVotes: 9,
        },
        {
          name: "Germany",
          totalPoints: 18,
          juryPoints: 3,
          teleVotes: 15,
        },
      ],
      nonQualifiedCountries: [
        {
          name: "Iceland",
          totalPoints: "44",
        },
        {
          name: "Latvia",
          totalPoints: "34",
        },
        {
          name: "Georgia",
          totalPoints: "33",
        },
        {
          name: "Greece",
          totalPoints: "14",
        },
        {
          name: "Ireland",
          totalPoints: "10",
        },
        {
          name: "Netherlands",
          totalPoints: "7",
        },
        {
          name: "Denmark",
          totalPoints: "6",
        },
        {
          name: "Azerbaijan",
          totalPoints: "4",
        },
        {
          name: "Malta",
          totalPoints: "3",
        },
        {
          name: "Romania",
          totalPoints: "0",
        },
        {
          name: "San Marino",
          totalPoints: "0",
        },
      ],
    },
    {
      year: 2022,
      qualifiedCountries: [
        {
          name: "Ukraine",
          totalPoints: 631,
          juryPoints: 192,
          teleVotes: 439,
        },
        {
          name: "United Kingdom",
          totalPoints: 466,
          juryPoints: 283,
          teleVotes: 183,
        },
        {
          name: "Spain",
          totalPoints: 459,
          juryPoints: 231,
          teleVotes: 228,
        },
        {
          name: "Sweden",
          totalPoints: 438,
          juryPoints: 258,
          teleVotes: 180,
        },
        {
          name: "Serbia",
          totalPoints: 312,
          juryPoints: 87,
          teleVotes: 225,
        },
        {
          name: "Italy",
          totalPoints: 268,
          juryPoints: 158,
          teleVotes: 110,
        },
        {
          name: "Moldova",
          totalPoints: 253,
          juryPoints: 14,
          teleVotes: 239,
        },
        {
          name: "Greece",
          totalPoints: 215,
          juryPoints: 158,
          teleVotes: 57,
        },
        {
          name: "Portugal",
          totalPoints: 207,
          juryPoints: 171,
          teleVotes: 36,
        },
        {
          name: "Norway",
          totalPoints: 182,
          juryPoints: 36,
          teleVotes: 146,
        },
        {
          name: "Netherlands",
          totalPoints: 171,
          juryPoints: 129,
          teleVotes: 42,
        },
        {
          name: "Poland",
          totalPoints: 151,
          juryPoints: 46,
          teleVotes: 105,
        },
        {
          name: "Estonia",
          totalPoints: 141,
          juryPoints: 43,
          teleVotes: 98,
        },
        {
          name: "Lithuania",
          totalPoints: 128,
          juryPoints: 35,
          teleVotes: 93,
        },
        {
          name: "Australia",
          totalPoints: 125,
          juryPoints: 123,
          teleVotes: 2,
        },
        {
          name: "Azerbaijan",
          totalPoints: 106,
          juryPoints: 103,
          teleVotes: 3,
        },
        {
          name: "Switzerland",
          totalPoints: 78,
          juryPoints: 78,
          teleVotes: 0,
        },
        {
          name: "Romania",
          totalPoints: 65,
          juryPoints: 12,
          teleVotes: 53,
        },
        {
          name: "Belgium",
          totalPoints: 64,
          juryPoints: 59,
          teleVotes: 5,
        },
        {
          name: "Armenia",
          totalPoints: 61,
          juryPoints: 40,
          teleVotes: 21,
        },
        {
          name: "Finland",
          totalPoints: 38,
          juryPoints: 12,
          teleVotes: 26,
        },
        {
          name: "Czechia",
          totalPoints: 38,
          juryPoints: 33,
          teleVotes: 5,
        },
        {
          name: "Iceland",
          totalPoints: 20,
          juryPoints: 10,
          teleVotes: 10,
        },
        {
          name: "France",
          totalPoints: 17,
          juryPoints: 9,
          teleVotes: 8,
        },
        {
          name: "Germany",
          totalPoints: 6,
          juryPoints: 0,
          teleVotes: 6,
        },
      ],
      nonQualifiedCountries: [
        {
          name: "Croatia",
          totalPoints: "75",
        },
        {
          name: "North Macedonia",
          totalPoints: "76",
        },
        {
          name: "Albania",
          totalPoints: "58",
        },
        {
          name: "Cyprus",
          totalPoints: "63",
        },
        {
          name: "Israel",
          totalPoints: "61",
        },
        {
          name: "Denmark",
          totalPoints: "55",
        },
        {
          name: "Latvia",
          totalPoints: "55",
        },
        {
          name: "San Marino",
          totalPoints: "50",
        },
        {
          name: "Ireland",
          totalPoints: "47",
        },
        {
          name: "Malta",
          totalPoints: "47",
        },
        {
          name: "Austria",
          totalPoints: "42",
        },
        {
          name: "Montenegro",
          totalPoints: "33",
        },
        {
          name: "Bulgaria",
          totalPoints: "29",
        },
        {
          name: "Georgia",
          totalPoints: "22",
        },
        {
          name: "Slovenia",
          totalPoints: "15",
        },
      ],
    },
    {
      year: 2021,
      qualifiedCountries: [
        {
          name: "Italy",
          totalPoints: 524,
          juryPoints: 206,
          teleVotes: 318,
        },
        {
          name: "France",
          totalPoints: 499,
          juryPoints: 248,
          teleVotes: 251,
        },
        {
          name: "Switzerland",
          totalPoints: 432,
          juryPoints: 267,
          teleVotes: 165,
        },
        {
          name: "Iceland",
          totalPoints: 378,
          juryPoints: 198,
          teleVotes: 180,
        },
        {
          name: "Ukraine",
          totalPoints: 364,
          juryPoints: 97,
          teleVotes: 267,
        },
        {
          name: "Finland",
          totalPoints: 301,
          juryPoints: 83,
          teleVotes: 218,
        },
        {
          name: "Malta",
          totalPoints: 255,
          juryPoints: 208,
          teleVotes: 47,
        },
        {
          name: "Lithuania",
          totalPoints: 220,
          juryPoints: 55,
          teleVotes: 165,
        },
        {
          name: "Russia",
          totalPoints: 204,
          juryPoints: 104,
          teleVotes: 100,
        },
        {
          name: "Greece",
          totalPoints: 170,
          juryPoints: 91,
          teleVotes: 79,
        },
        {
          name: "Bulgaria",
          totalPoints: 170,
          juryPoints: 140,
          teleVotes: 30,
        },
        {
          name: "Portugal",
          totalPoints: 153,
          juryPoints: 126,
          teleVotes: 27,
        },
        {
          name: "Moldova",
          totalPoints: 115,
          juryPoints: 53,
          teleVotes: 62,
        },
        {
          name: "Sweden",
          totalPoints: 109,
          juryPoints: 46,
          teleVotes: 63,
        },
        {
          name: "Serbia",
          totalPoints: 102,
          juryPoints: 20,
          teleVotes: 82,
        },
        {
          name: "Cyprus",
          totalPoints: 94,
          juryPoints: 50,
          teleVotes: 44,
        },
        {
          name: "Israel",
          totalPoints: 93,
          juryPoints: 73,
          teleVotes: 20,
        },
        {
          name: "Norway",
          totalPoints: 75,
          juryPoints: 15,
          teleVotes: 60,
        },
        {
          name: "Belgium",
          totalPoints: 74,
          juryPoints: 71,
          teleVotes: 3,
        },
        {
          name: "Azerbaijan",
          totalPoints: 65,
          juryPoints: 32,
          teleVotes: 33,
        },
        {
          name: "Albania",
          totalPoints: 57,
          juryPoints: 22,
          teleVotes: 35,
        },
        {
          name: "San Marino",
          totalPoints: 50,
          juryPoints: 37,
          teleVotes: 13,
        },
        {
          name: "Netherlands",
          totalPoints: 11,
          juryPoints: 11,
          teleVotes: 0,
        },
        {
          name: "Spain",
          totalPoints: 6,
          juryPoints: 6,
          teleVotes: 0,
        },
        {
          name: "Germany",
          totalPoints: 3,
          juryPoints: 3,
          teleVotes: 0,
        },
        {
          name: "United Kingdom",
          totalPoints: 0,
          juryPoints: 0,
          teleVotes: 0,
        },
      ],
      nonQualifiedCountries: [
        {
          name: "Croatia",
          totalPoints: "110",
        },
        {
          name: "Romania",
          totalPoints: "85",
        },
        {
          name: "Denmark",
          totalPoints: "89",
        },
        {
          name: "Austria",
          totalPoints: "66",
        },
        {
          name: "Estonia",
          totalPoints: "58",
        },
        {
          name: "Slovenia",
          totalPoints: "44",
        },
        {
          name: "Poland",
          totalPoints: "35",
        },
        {
          name: "Australia",
          totalPoints: "28",
        },
        {
          name: "North Macedonia",
          totalPoints: "23",
        },
        {
          name: "Czechia",
          totalPoints: "23",
        },
        {
          name: "Ireland",
          totalPoints: "20",
        },
        {
          name: "Georgia",
          totalPoints: "16",
        },
        {
          name: "Latvia",
          totalPoints: "14",
        },
      ],
    },
  ];

  // useEffect(() => {

  //   escService.getAll().then(results => setResults(results))

  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await escService.getAll().then(results);
  //       setResults(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (results.length === 0) {
    setResults(data);
  }

  if (results.length !== 0 && orderByTeleVotes.length === 0) {
    setResults(data);
    let sortedArray1 = data.map(function (obj) {
      obj.qualifiedCountries.sort(function (a, b) {
        return b.teleVotes - a.teleVotes;
      });
      obj.nonQualifiedCountries.sort(function (a, b) {
        return b.teleVotes - a.teleVotes;
      });
      return obj;
    });
    setOrderByTelevotes(sortedArray1);
  }

  if (results.length !== 0 && lessJury.length === 0) {
    setResults(data);
    let sortedArray2 = results.map(function (obj) {
      obj.qualifiedCountries.forEach(function (country) {
        return Math.floor((country.juryPoints *= 0.5)); // Decrease points by 50%
      });
      obj.qualifiedCountries.forEach(function (country) {
        return (country.teleVotes *= 1); // Decrease points by 50%
      });
      obj.qualifiedCountries.forEach(function (country) {
        return (country.totalPoints = country.juryPoints + country.teleVotes);
      });
      obj.nonQualifiedCountries.forEach(function (country) {
        return Math.floor((country.juryPoints *= 0.5)); // Decrease points by 50%
      });
      obj.nonQualifiedCountries.forEach(function (country) {
        return (country.teleVotes *= 1); // Decrease points by 50%
      });
      obj.nonQualifiedCountries.forEach(function (country) {
        return (country.totalPoints = country.juryPoints + country.teleVotes);
      });
      return obj;
    });

    sortedArray2 = results.map(function (obj) {
      obj.qualifiedCountries.sort(function (a, b) {
        return b.totalPoints - a.totalPoints;
      });
      obj.nonQualifiedCountries.sort(function (a, b) {
        return b.totalPoints - a.totalPoints;
      });
      return obj;
    });
    setLessJury(sortedArray2);
  }

  if (results.length !== 0 && overall.length === 0) {
    setResults(data);
    // Reduce the jsonArray to create a new array with sorted JSON objects for qualified and non-qualified countries
    let sortedArray3 = results.reduce(
      function (acc, obj) {
        var qualifiedCountriesArray = obj.qualifiedCountries.map(function (
          country
        ) {
          return {
            name: country.name,
            controversy: country.teleVotes - country.juryPoints,
            totalPoints: country.totalPoints,
            juryPoints: country.juryPoints,
            teleVotes: country.teleVotes,
            year: obj.year,
          };
        });

        var nonQualifiedCountriesArray = obj.nonQualifiedCountries.map(
          function (country) {
            return {
              name: country.name,
              controversy: country.teleVotes - country.juryPoints,
              totalPoints: country.totalPoints,
              juryPoints: country.juryPoints,
              teleVotes: country.teleVotes,
              year: obj.year,
            };
          }
        );

        acc[0].countries = acc[0].countries.concat(qualifiedCountriesArray);
        acc[1].countries = acc[1].countries.concat(nonQualifiedCountriesArray);

        return acc;
      },
      [
        { category: "Qualified Countries", countries: [] },
        { category: "Non-Qualified Countries", countries: [] },
      ]
    );

    // Sort the inner JSON objects by points in descending order
    sortedArray3.forEach(function (category) {
      category.countries.sort(function (a, b) {
        return b.totalPoints - a.totalPoints; // Sort in descending order
      });
    });

    setOverall(sortedArray3);
  }


  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        type: 'linear',
        position: 'bottom',
        min: 0, // Set the minimum value for the x-axis
        max: 400, // Set the maximum value for the x-axis
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        min: 0, // Set the minimum value for the y-axis
        max: 400, // Set the maximum value for the y-axis
      },
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          const point = dataSet.data[tooltipItem.index];
          return point.label;
        },
      },
    },
  };

  

  return (
    <div className="container">

      {results.length === 0 ? (
        <h1>fetching data...</h1>
      ) : (
        <h1>eurovision results</h1>
      )}

      {data.map((competition, index) => (
        <article key={index}>
          <h2>{competition.year}</h2>
          <div className="grid">
            <ol>
              {competition.qualifiedCountries.map((item, index) => (
                <li className="li-font-size" key={index}>
                  {item.name} - {item.totalPoints}pts
                </li>
              ))}
            </ol>

            <div>
              <Scatter options={options} data={dataSet} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default App;
