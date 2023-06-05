import React, { useState, useEffect, PureComponent } from "react";
import escService from "./services/results";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "@picocss/pico";
import Chart from 'react-google-charts'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const App = () => {
  const [data, setData] = useState([]);

  const [total, setTotal] = useState(0);
  const [totalYears, setTotalYears] = useState(0);
  const [totalJury, setTotalJury] = useState(0);
  const [totalTele, setTotalTele] = useState(0);


  const [dataSet, setDataSet] = useState(
    {
      datasets: [
        {
          label: 'A dataset',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ]
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

    const result = {};

    const generateGoogleData = () => data.map((competition) => {
      const innerArray =
        [
          ["country name", "total points"],
          ...competition.qualifiedCountries.map((country) =>
            [country.name, country.totalPoints]
          )
        ]
      result[competition.year] = innerArray;
    }
    );

    const mapa = generateGoogleData();

    setGoogleData(result);
    let totalSum = 0;
    let totalYears = 0;
    let totalJury = 0;
    let totalTele = 0;

    const generateTotal = () => data.forEach((competition) => {
      competition.qualifiedCountries.forEach((country) => {
        totalSum += country.totalPoints
        totalJury += country.juryPoints
        totalTele += country.teleVotes
      })
      totalYears++;
      }
    );

    generateTotal();
    
    setTotal(totalSum);
    setTotalYears(totalYears);
    setTotalJury(totalJury);
    setTotalTele(totalTele);
    

  }, [data.length !== 0]);


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

  var optionsG = {
    region: '150', // Africa
    colorAxis: { colors: ['#ffb1c2', '#ff6384'] },
    backgroundColor: '#141e26',
    datalessRegionColor: '#2c353c',
    defaultColor: '#f5f5f5',
  };


  return (
    <div className="container">

      {/* {console.log("data")}
      {console.log(data)}

      {console.log("dataSet")}
      {console.log(dataSet)}

      {console.log("google dataSet")}
      {console.log(googleData)} */}


      {data.length === 0 ? (
        <h1>fetching data...</h1>
      ) : (
        <h1>eurovision results</h1>
      )}

      <article>

        <h3>A total of {total} points during {totalYears} years</h3>

        <h4>{totalJury} jury points in total</h4>
        <h4>{totalTele} televote points in total</h4>

      </article>

      {data.map((competition, index) => (
        <article key={index}>
          <h2>{competition.year}</h2>
          <div className="grid">
            <ol>
              {competition.qualifiedCountries.map((item, index) => (
                <li className="li-font-size" key={index}>
                  {item.name} - {item.totalPoints}pts - {item.juryPoints}pts - {item.teleVotes}pts
                </li>
              ))}
            </ol>

          </div>
          {/* {console.log(googleData[competition.year])} */}
          <div style={{ width: '50%', display: "inline-block" }}>
            <Chart
              style={{ display: "inline-block" }}
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                    const region = googleData[competition.year][selection[0].row + 1];
                    console.log("Selected : " + region);
                  },
                },
              ]}
              chartType="GeoChart"
              width="100%"
              data={googleData[competition.year]}
              options={optionsG}
            />
          </div>

          <div style={{ width: '50%', display: "inline-block" }}>
            <Scatter
              // options={options}
              data={dataSet}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default App;
