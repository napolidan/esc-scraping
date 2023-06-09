import React, { useState, useEffect, PureComponent } from 'react';
import escService from './services/results';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@picocss/pico'


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {

  const [results, setResults] = useState([]);
  const [orderByTeleVotes, setOrderByTelevotes] = useState([]);
  const [lessJury, setLessJury] = useState([]);
  const [overall, setOverall] = useState([]);

  const data = [
    {
    year: 2023,
    qualifiedCountries: [
    {
    name: "Sweden",
    totalPoints: 583,
    juryPoints: 340,
    teleVotes: 243
    },
    {
    name: "Finland",
    totalPoints: 526,
    juryPoints: 150,
    teleVotes: 376
    },
    {
    name: "Israel",
    totalPoints: 362,
    juryPoints: 177,
    teleVotes: 185
    },
    {
    name: "Italy",
    totalPoints: 350,
    juryPoints: 176,
    teleVotes: 174
    },
    {
    name: "Norway",
    totalPoints: 268,
    juryPoints: 52,
    teleVotes: 216
    },
    {
    name: "Ukraine",
    totalPoints: 243,
    juryPoints: 54,
    teleVotes: 189
    },
    {
    name: "Belgium",
    totalPoints: 182,
    juryPoints: 127,
    teleVotes: 55
    },
    {
    name: "Estonia",
    totalPoints: 168,
    juryPoints: 146,
    teleVotes: 22
    },
    {
    name: "Australia",
    totalPoints: 151,
    juryPoints: 130,
    teleVotes: 21
    },
    {
    name: "Czechia",
    totalPoints: 129,
    juryPoints: 94,
    teleVotes: 35
    },
    {
    name: "Lithuania",
    totalPoints: 127,
    juryPoints: 81,
    teleVotes: 46
    },
    {
    name: "Cyprus",
    totalPoints: 126,
    juryPoints: 68,
    teleVotes: 58
    },
    {
    name: "Croatia",
    totalPoints: 123,
    juryPoints: 11,
    teleVotes: 112
    },
    {
    name: "Armenia",
    totalPoints: 122,
    juryPoints: 69,
    teleVotes: 53
    },
    {
    name: "Austria",
    totalPoints: 120,
    juryPoints: 104,
    teleVotes: 16
    },
    {
    name: "France",
    totalPoints: 104,
    juryPoints: 54,
    teleVotes: 50
    },
    {
    name: "Spain",
    totalPoints: 100,
    juryPoints: 95,
    teleVotes: 5
    },
    {
    name: "Moldova",
    totalPoints: 96,
    juryPoints: 20,
    teleVotes: 76
    },
    {
    name: "Poland",
    totalPoints: 93,
    juryPoints: 12,
    teleVotes: 81
    },
    {
    name: "Switzerland",
    totalPoints: 92,
    juryPoints: 61,
    teleVotes: 31
    },
    {
    name: "Slovenia",
    totalPoints: 78,
    juryPoints: 33,
    teleVotes: 45
    },
    {
    name: "Albania",
    totalPoints: 76,
    juryPoints: 17,
    teleVotes: 59
    },
    {
    name: "Portugal",
    totalPoints: 59,
    juryPoints: 43,
    teleVotes: 16
    },
    {
    name: "Serbia",
    totalPoints: 30,
    juryPoints: 14,
    teleVotes: 16
    },
    {
    name: "United Kingdom",
    totalPoints: 24,
    juryPoints: 15,
    teleVotes: 9
    },
    {
    name: "Germany",
    totalPoints: 18,
    juryPoints: 3,
    teleVotes: 15
    }
    ],
    nonQualifiedCountries: [
    {
    name: "Iceland",
    totalPoints: "44"
    },
    {
    name: "Latvia",
    totalPoints: "34"
    },
    {
    name: "Georgia",
    totalPoints: "33"
    },
    {
    name: "Greece",
    totalPoints: "14"
    },
    {
    name: "Ireland",
    totalPoints: "10"
    },
    {
    name: "Netherlands",
    totalPoints: "7"
    },
    {
    name: "Denmark",
    totalPoints: "6"
    },
    {
    name: "Azerbaijan",
    totalPoints: "4"
    },
    {
    name: "Malta",
    totalPoints: "3"
    },
    {
    name: "Romania",
    totalPoints: "0"
    },
    {
    name: "San Marino",
    totalPoints: "0"
    }
    ]
    },
    {
    year: 2022,
    qualifiedCountries: [
    {
    name: "Ukraine",
    totalPoints: 631,
    juryPoints: 192,
    teleVotes: 439
    },
    {
    name: "United Kingdom",
    totalPoints: 466,
    juryPoints: 283,
    teleVotes: 183
    },
    {
    name: "Spain",
    totalPoints: 459,
    juryPoints: 231,
    teleVotes: 228
    },
    {
    name: "Sweden",
    totalPoints: 438,
    juryPoints: 258,
    teleVotes: 180
    },
    {
    name: "Serbia",
    totalPoints: 312,
    juryPoints: 87,
    teleVotes: 225
    },
    {
    name: "Italy",
    totalPoints: 268,
    juryPoints: 158,
    teleVotes: 110
    },
    {
    name: "Moldova",
    totalPoints: 253,
    juryPoints: 14,
    teleVotes: 239
    },
    {
    name: "Greece",
    totalPoints: 215,
    juryPoints: 158,
    teleVotes: 57
    },
    {
    name: "Portugal",
    totalPoints: 207,
    juryPoints: 171,
    teleVotes: 36
    },
    {
    name: "Norway",
    totalPoints: 182,
    juryPoints: 36,
    teleVotes: 146
    },
    {
    name: "Netherlands",
    totalPoints: 171,
    juryPoints: 129,
    teleVotes: 42
    },
    {
    name: "Poland",
    totalPoints: 151,
    juryPoints: 46,
    teleVotes: 105
    },
    {
    name: "Estonia",
    totalPoints: 141,
    juryPoints: 43,
    teleVotes: 98
    },
    {
    name: "Lithuania",
    totalPoints: 128,
    juryPoints: 35,
    teleVotes: 93
    },
    {
    name: "Australia",
    totalPoints: 125,
    juryPoints: 123,
    teleVotes: 2
    },
    {
    name: "Azerbaijan",
    totalPoints: 106,
    juryPoints: 103,
    teleVotes: 3
    },
    {
    name: "Switzerland",
    totalPoints: 78,
    juryPoints: 78,
    teleVotes: 0
    },
    {
    name: "Romania",
    totalPoints: 65,
    juryPoints: 12,
    teleVotes: 53
    },
    {
    name: "Belgium",
    totalPoints: 64,
    juryPoints: 59,
    teleVotes: 5
    },
    {
    name: "Armenia",
    totalPoints: 61,
    juryPoints: 40,
    teleVotes: 21
    },
    {
    name: "Finland",
    totalPoints: 38,
    juryPoints: 12,
    teleVotes: 26
    },
    {
    name: "Czechia",
    totalPoints: 38,
    juryPoints: 33,
    teleVotes: 5
    },
    {
    name: "Iceland",
    totalPoints: 20,
    juryPoints: 10,
    teleVotes: 10
    },
    {
    name: "France",
    totalPoints: 17,
    juryPoints: 9,
    teleVotes: 8
    },
    {
    name: "Germany",
    totalPoints: 6,
    juryPoints: 0,
    teleVotes: 6
    }
    ],
    nonQualifiedCountries: [
    {
    name: "Croatia",
    totalPoints: "75"
    },
    {
    name: "North Macedonia",
    totalPoints: "76"
    },
    {
    name: "Albania",
    totalPoints: "58"
    },
    {
    name: "Cyprus",
    totalPoints: "63"
    },
    {
    name: "Israel",
    totalPoints: "61"
    },
    {
    name: "Denmark",
    totalPoints: "55"
    },
    {
    name: "Latvia",
    totalPoints: "55"
    },
    {
    name: "San Marino",
    totalPoints: "50"
    },
    {
    name: "Ireland",
    totalPoints: "47"
    },
    {
    name: "Malta",
    totalPoints: "47"
    },
    {
    name: "Austria",
    totalPoints: "42"
    },
    {
    name: "Montenegro",
    totalPoints: "33"
    },
    {
    name: "Bulgaria",
    totalPoints: "29"
    },
    {
    name: "Georgia",
    totalPoints: "22"
    },
    {
    name: "Slovenia",
    totalPoints: "15"
    }
    ]
    },
    {
    year: 2021,
    qualifiedCountries: [
    {
    name: "Italy",
    totalPoints: 524,
    juryPoints: 206,
    teleVotes: 318
    },
    {
    name: "France",
    totalPoints: 499,
    juryPoints: 248,
    teleVotes: 251
    },
    {
    name: "Switzerland",
    totalPoints: 432,
    juryPoints: 267,
    teleVotes: 165
    },
    {
    name: "Iceland",
    totalPoints: 378,
    juryPoints: 198,
    teleVotes: 180
    },
    {
    name: "Ukraine",
    totalPoints: 364,
    juryPoints: 97,
    teleVotes: 267
    },
    {
    name: "Finland",
    totalPoints: 301,
    juryPoints: 83,
    teleVotes: 218
    },
    {
    name: "Malta",
    totalPoints: 255,
    juryPoints: 208,
    teleVotes: 47
    },
    {
    name: "Lithuania",
    totalPoints: 220,
    juryPoints: 55,
    teleVotes: 165
    },
    {
    name: "Russia",
    totalPoints: 204,
    juryPoints: 104,
    teleVotes: 100
    },
    {
    name: "Greece",
    totalPoints: 170,
    juryPoints: 91,
    teleVotes: 79
    },
    {
    name: "Bulgaria",
    totalPoints: 170,
    juryPoints: 140,
    teleVotes: 30
    },
    {
    name: "Portugal",
    totalPoints: 153,
    juryPoints: 126,
    teleVotes: 27
    },
    {
    name: "Moldova",
    totalPoints: 115,
    juryPoints: 53,
    teleVotes: 62
    },
    {
    name: "Sweden",
    totalPoints: 109,
    juryPoints: 46,
    teleVotes: 63
    },
    {
    name: "Serbia",
    totalPoints: 102,
    juryPoints: 20,
    teleVotes: 82
    },
    {
    name: "Cyprus",
    totalPoints: 94,
    juryPoints: 50,
    teleVotes: 44
    },
    {
    name: "Israel",
    totalPoints: 93,
    juryPoints: 73,
    teleVotes: 20
    },
    {
    name: "Norway",
    totalPoints: 75,
    juryPoints: 15,
    teleVotes: 60
    },
    {
    name: "Belgium",
    totalPoints: 74,
    juryPoints: 71,
    teleVotes: 3
    },
    {
    name: "Azerbaijan",
    totalPoints: 65,
    juryPoints: 32,
    teleVotes: 33
    },
    {
    name: "Albania",
    totalPoints: 57,
    juryPoints: 22,
    teleVotes: 35
    },
    {
    name: "San Marino",
    totalPoints: 50,
    juryPoints: 37,
    teleVotes: 13
    },
    {
    name: "Netherlands",
    totalPoints: 11,
    juryPoints: 11,
    teleVotes: 0
    },
    {
    name: "Spain",
    totalPoints: 6,
    juryPoints: 6,
    teleVotes: 0
    },
    {
    name: "Germany",
    totalPoints: 3,
    juryPoints: 3,
    teleVotes: 0
    },
    {
    name: "United Kingdom",
    totalPoints: 0,
    juryPoints: 0,
    teleVotes: 0
    }
    ],
    nonQualifiedCountries: [
    {
    name: "Croatia",
    totalPoints: "110"
    },
    {
    name: "Romania",
    totalPoints: "85"
    },
    {
    name: "Denmark",
    totalPoints: "89"
    },
    {
    name: "Austria",
    totalPoints: "66"
    },
    {
    name: "Estonia",
    totalPoints: "58"
    },
    {
    name: "Slovenia",
    totalPoints: "44"
    },
    {
    name: "Poland",
    totalPoints: "35"
    },
    {
    name: "Australia",
    totalPoints: "28"
    },
    {
    name: "North Macedonia",
    totalPoints: "23"
    },
    {
    name: "Czechia",
    totalPoints: "23"
    },
    {
    name: "Ireland",
    totalPoints: "20"
    },
    {
    name: "Georgia",
    totalPoints: "16"
    },
    {
    name: "Latvia",
    totalPoints: "14"
    }
    ]
    }
    ]

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

  if(results.length===0){
    setResults(data);
  }

  if(results.length !== 0 && orderByTeleVotes.length === 0){
    
    setResults(data);
    let sortedArray1 = data.map(function(obj) {
      obj.qualifiedCountries.sort(function(a, b) {
        return b.teleVotes - a.teleVotes;
      });
      obj.nonQualifiedCountries.sort(function(a, b) {
        return b.teleVotes - a.teleVotes;
      });
      return obj;
    });
    setOrderByTelevotes(sortedArray1);
  }

  if(orderByTeleVotes.length !== 0 && lessJury.length === 0){

    setResults(data);
    let sortedArray2 = results.map(function(obj) {
      obj.qualifiedCountries.forEach(function(country) {
        return Math.floor(country.juryPoints *= 0.5); // Decrease points by 50%
      });
      obj.qualifiedCountries.forEach(function(country) {
        return country.teleVotes *= 1; // Decrease points by 50%
      });
      obj.qualifiedCountries.forEach(function(country) {
        return country.totalPoints = country.juryPoints + country.teleVotes;
      });
      obj.nonQualifiedCountries.forEach(function(country) {
        return Math.floor(country.juryPoints *= 0.5); // Decrease points by 50%
      });
      obj.nonQualifiedCountries.forEach(function(country) {
        return country.teleVotes *= 1; // Decrease points by 50%
      });
      obj.nonQualifiedCountries.forEach(function(country) {
        return country.totalPoints = country.juryPoints + country.teleVotes;
      });
      return obj;
    });

  const [googleData, setGoogleData] = useState({});

  // AXIOS OBTENIENDO DATA
  useEffect(() => {

    escService.getAll().then(results => setData(results))

  }, [])

  // OBTENER EL DATASET PARA GRÁFICOS
  useEffect(() => {

    const mapeo = () => data.flatMap((competition) =>
    (
      competition.qualifiedCountries.map(({ name, totalPoints, juryPoints, teleVotes }) => (
        {
          x: juryPoints,
          y: teleVotes,
          country: name,
          totalPoints: totalPoints
        }
      )
      )
    )
    )

    setDataSet(prevdataSet => ({
      ...prevdataSet,
      datasets: prevdataSet.datasets.map(ds => ({
        ...ds,
        data: mapeo()
      }))
    }))

    const result = {}

    const generateGoogleData = () => data.map((competition) => 
      {
        const innerArray = 
        [
          ["country name", "total points"],
          ...competition.qualifiedCountries.map((country) => 
              [country.name, country.totalPoints.toString()]
          )
        ]
        result[competition.year] = innerArray;
      }
    );
    
    console.log("result")
    console.log(result)


    const mapa = generateGoogleData();
    console.log("mapa")
    console.log(mapa)

    setGoogleData(result)



    {console.log(overall)}

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        type: 'linear',
        position: 'bottom',
        min: 0, // Set the minimum value for the x-axis
        max: 450, // Set the maximum value for the x-axis
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        min: 0, // Set the minimum value for the y-axis
        max: 450, // Set the maximum value for the y-axis
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

  const optionsG = {
    // Material design options
    chart: {
      title: "Countries' Jury points and Televotes",
    },
    series: {
      0: { axis: "jury points" },
      1: { axis: "televotes" },
    },
    axes: {
      y: {
        "jury points": { label: "Jury Points" },
        "televotes": { label: "Televotes" },
      },
    },
  };


  return (
    <div className="container">

      {console.log("data")}
      {console.log(data)}

      {console.log("dataSet")}
      {console.log(dataSet)}

      {console.log("google dataSet")}
      {console.log(googleData)}


      {data.length === 0 ? (
        <h1>fetching data...</h1>
      ) : (
        <h1>eurovision results</h1>
      )}

      <article style={{width: '100%', minWidth: '100px'}}>
        <h1>The top 10 </h1>
        <ResponsiveContainer width={"100%"} aspect={2}>
          <BarChart
            width={1000}
            height={1000}
            data={overall
              .find(obj => obj.category === 'Qualified Countries')
              ?.countries.slice(0, 10)}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="teleVotes" stackId="a" fill="#82ca9d" />
            <Bar dataKey="juryPoints" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </article>   

      {data.map((competition, index) => (
        <article key={index}>
          <h2>{competition.year}</h2>
          <div className='grid'>
            <ol>
              {competition.qualifiedCountries.map((item, index) => (
                <li className='li-font-size' key={index}>
                  {item.name} - {item.totalPoints}pts
                </li>
              ))}
            </ol>

          </div>
          {console.log("asdfs")}
          {console.log(googleData[competition.year])}
          <Chart
              chartType="GeoChart"
              width="100%"
              height="800px"
              data={googleData[competition.year]}
              // options={optionsG}
            />
          <div>
            <Scatter
            // options={options}
            data={dataSet}
            />

          </div>
        </article>

      ))}

    </div>

  )

}

export default App
