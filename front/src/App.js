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
  );
};

export default App;
