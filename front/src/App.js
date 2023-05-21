import React, { useState, useEffect } from 'react';
import escService from './services/results';

const App = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    escService.getAll().then(results => setResults(results))

  }, [])

  return(console.log(results));

}

export default App
