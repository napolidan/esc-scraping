import React, { useState, useEffect, PureComponent } from "react";
import { getAll } from "./services/results";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./pico-custom.scss";
import "@picocss/pico";
import Chart from "react-google-charts";
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

  const [averagePos, setAveragePos] = useState({});

  const [dataSet, setDataSet] = useState({
    datasets: [
      {
        label: "A dataset",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });

  const [googleData, setGoogleData] = useState({});

  useEffect(() => {
    async function fetchDataWrapper() {
      try {
        const data = await getAll();
        // Use the data
        setData(data);
      } catch (error) {
        // Handle the error
        console.log("Error:", error);
      }
    }

    fetchDataWrapper();
  }, []);

  // AXIOS OBTENIENDO DATA
  // useEffect(() => {
  //   try {
  //     escService.getAll().then((results) => setData(results));
  //     // Use the data
  //   } catch (error) {
  //     // Handle the error
  //     console.log("Error:", error);
  //   }
  // }, []);

  // OBTENER EL DATASET PARA GRÁFICOS
  useEffect(() => {
    const mapeo = () =>
      data.flatMap((competition) =>
        competition.qualifiedCountries.map(
          ({ name, totalPoints, juryPoints, teleVotes }) => ({
            x: juryPoints,
            y: teleVotes,
            country: name,
            totalPoints: totalPoints,
          })
        )
      );

    setDataSet((prevdataSet) => ({
      ...prevdataSet,
      datasets: prevdataSet.datasets.map((ds) => ({
        ...ds,
        data: mapeo(),
      })),
    }));

    const result = {};

    const generateGoogleData = () =>
      data.map((competition) => {
        const innerArray = [
          ["country name", "total points"],
          ...competition.qualifiedCountries.map((country) => [
            country.name,
            country.totalPoints,
          ]),
        ];
        result[competition.year] = innerArray;
      });

    generateGoogleData();
    setGoogleData(result);
    let totalSum = 0;
    let totalYears = 0;
    let totalJury = 0;
    let totalTele = 0;

    const generateTotal = () =>
      data.forEach((competition) => {
        competition.qualifiedCountries.forEach((country) => {
          totalSum += country.totalPoints;
          totalJury += country.juryPoints;
          totalTele += country.teleVotes;
        });
        totalYears++;
      });

    generateTotal();

    setTotal(totalSum);
    setTotalYears(totalYears);
    setTotalJury(totalJury);
    setTotalTele(totalTele);

    let countryPositions = {};
    let countryOccurrences = {};
    let averagePositions = {};

    const calculateAverage = () => {
      data.forEach((competition) =>
        competition.qualifiedCountries.forEach((country, index) => {
          let countryName = country.name;
          let countryPosition = index;

          if (countryName in countryPositions) {
            countryPositions[countryName] += countryPosition;
            countryOccurrences[countryName]++;
          } else {
            countryPositions[countryName] = countryPosition;
            countryOccurrences[countryName] = 1;
          }
        })
      );

      for (let countryName in countryPositions) {
        let totalPosition = countryPositions[countryName];
        let ocurrenceCount = countryOccurrences[countryName];
        let average = totalPosition / ocurrenceCount;
        average = parseFloat(average.toFixed(2));
        averagePositions[countryName] = average;
      }
      // console.log(averagePositions);
      return averagePositions;
    };

    setAveragePos(calculateAverage);
  }, [data.length !== 0]);
  console.log(averagePos);

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        type: "linear",
        position: "bottom",
        min: 0, // Set the minimum value for the x-axis
        max: 450, // Set the maximum value for the x-axis
      },
      y: {
        beginAtZero: true,
        type: "linear",
        position: "left",
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
    region: "150", // Africa
    colorAxis: { colors: ["#ffb1c2", "#ff6384"] },
    backgroundColor: "#141e26",
    datalessRegionColor: "#2c353c",
    defaultColor: "#f5f5f5",
  };

  function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAccordionClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <details className={`accordion ${isOpen ? "open" : ""}`}>
        <summary onClick={handleAccordionClick}>{title}</summary>
        {isOpen && (
          <div className="accordion-content">
            <p>{content}</p>
          </div>
        )}
      </details>
    );
  }

  return (
    <main>
      {/* {console.log("data")}
      {console.log(data)}

      {console.log("dataSet")}
      {console.log(dataSet)}

      {console.log("google dataSet")}
      {console.log(googleData)} */}

      {data.length === 0 ? (
        <div>
          <div className="grid">
            <div></div>
            <article>
              <header>
                <hgroup>
                  <b>Server still off...</b>
                </hgroup>
              </header>
              <progress></progress>
            </article>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="app-container">
          <nav>
            <ul>
              <li>
                <img src={require("./eurovision_logo.png")} />
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#" role="button">
                  Button
                </a>
              </li>
            </ul>
          </nav>

          <main>
            <article>
              <header>
                <h1>Average position</h1>
                <small>Per country</small>
              </header>

              <ul>
                {Object.entries(averagePos).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value} place
                  </li>
                ))}
              </ul>
            </article>
          </main>

          <main className="content" data-pico="content">
            <article>
              <header>
                <hgroup>
                  <h1>Overall results</h1>
                  <small>Per year</small>
                </hgroup>
              </header>
              {data.map((competition, index) => (
                <details key={index}>
                  <summary>{competition.year}</summary>

                  <ol>
                    {competition.qualifiedCountries.map((item, index) => (
                      <li className="li-font-size" key={index}>
                        {item.name} - {item.totalPoints}pts - {item.juryPoints}
                        pts - {item.teleVotes}pts
                      </li>
                    ))}
                  </ol>
                  {/* {console.log(googleData[competition.year])} */}
                  <footer>
                    <div>
                      <div style={{ width: "50%", display: "inline-block" }}>
                        <Chart
                          style={{ display: "inline-block" }}
                          chartEvents={[
                            {
                              eventName: "select",
                              callback: ({ chartWrapper }) => {
                                const chart = chartWrapper.getChart();
                                const selection = chart.getSelection();
                                if (selection.length === 0) return;
                                const region =
                                  googleData[competition.year][
                                    selection[0].row + 1
                                  ];
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

                      <div style={{ width: "50%", display: "inline-block" }}>
                        <Scatter
                          // options={options}
                          data={dataSet}
                        />
                      </div>
                    </div>
                  </footer>
                </details>
              ))}
            </article>
          </main>
        </div>
      )}
    </main>
  );
};

export default App;
