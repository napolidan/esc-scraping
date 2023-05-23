import React, { useState, useEffect } from 'react';
import escService from './services/results';

const App = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    escService.getAll().then(results => setResults(results))

  }, [])

  
  
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

          <ol>

            {competition.countries.map((item, index) => (

              <li key={index}>{item}</li>

            ))}

          </ol>

        </div>

      ))}

    </div>

  )

}

export default App
