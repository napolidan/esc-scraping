import React, { useState, useEffect } from 'react';
import escService from './services/results';

const App = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    escService.getAll().then(results => setResults(results))

  }, [])

  return(

    <div>

      {results.map((competition, index) => (
        
        <div key={index}>

          <h1>{competition.year}</h1>

          <ul>

            {competition.countries.map((item, index) => (

              <li key={index}>{item}</li>

            ))}

          </ul>

        </div>

      ))}

    </div>

  )

}

export default App
