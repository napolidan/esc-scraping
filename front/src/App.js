import React, { useState, useEffect, PureComponent } from 'react';
import escService from './services/results';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {

  const [results, setResults] = useState([]);
  const [orderByTeleVotes, setOrderByTelevotes] = useState([]);

  // useEffect(() => {

  //   escService.getAll().then(results => setResults(results))

  // }, [])

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await escService.getAll().then(results);
        // const jsonData = await response.json();
        await setResults(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  
  return(

    <div>

      {results.length === 0 ? (
        <h1>fetching data...</h1>
      ) : (
        <h1>eurovision results</h1>
      )}

      {results.map((competition, index) => (
        
        <div key={index} className="m-4">

          <h2>{competition.year}</h2>

          <div className='d-flex align-items-center'>

            <ol>

              {competition.qualifiedCountries.map((item, index) => (

                <li key={index}>

                  {item.name} - {item.totalPoints}pts

                </li>

              ))}

            </ol>

            <div className='w-100 d-flex align-items-center'>

              <ResponsiveContainer width={"40%"} aspect={1}>
                <BarChart
                  width={500}
                  height={300}
                  data={competition.qualifiedCountries}
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
                  {console.log('testing')}
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="juryPoints" stackId="a" fill="#8884d8" />
                  <Bar dataKey="teleVotes" stackId="a" fill="#82ca9d" />
                </BarChart>
                
              </ResponsiveContainer>
                            
            </div>

          </div>

        </div>

      ))}

    </div>

  )

}

export default App
