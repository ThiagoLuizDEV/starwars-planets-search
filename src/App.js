import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [getPlanets, setGetPlanets] = useState([]);

  useEffect(() => {
    const getFetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setGetPlanets(data.results.filter((remove) => delete remove.residents));
    };
    getFetchApi();
  }, []);

  return (
    <div>
      <Table getPlanets={ getPlanets } />
    </div>
  );
}

export default App;
