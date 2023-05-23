import React, { useState, useEffect, PureComponent } from 'react';
import escService from './services/results';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const App = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    escService.getAll().then(results => setResults(results))

  }, [])

  const data = [
    {
      name: 'Country1',
      totalPoints: 150
    },
    {
      name: 'Country2',
      totalPoints: 98
    },
    {
      name: 'Country3',
      totalPoints: 86
    },
    {
      name: 'Country4',
      totalPoints: 99
    },
    {
      name: 'Country5',
      totalPoints: 85
    },
    {
      name: 'Country6',
      totalPoints: 65
    }
  ];
  
  
  return(

    <div>

      {results.length === 0 ? (
        <h1>fetching data...</h1>
      ) : (
        <h1>eurovision results</h1>
      )}

      {results.map((competition, index) => (
        
        <div key={index}>

          <h2>{competition.year}</h2>

          

          <ResponsiveContainer width={'100%'} height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competition.countries}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="totalPoints" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>

          <ol>

            {competition.countries.map((item,index) => (

              <li key={index}>

                {item.name} - {item.totalPoints}pts

              </li>

            ))}

          </ol>

        </div>

      ))}

    </div>

  )

}

export default App
