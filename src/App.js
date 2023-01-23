import React from 'react';
import './App.css';
import Table from './components/Table';
import AuthProvider from './context/AuthProvider';

function App() {
  // const [getPlanets, setGetPlanets] = useState([]);

  // useEffect(() => {
  //   const getFetchApi = async () => {
  //     const response = await fetch('https://swapi.dev/api/planets');
  //     const data = await response.json();
  //     setGetPlanets(data.results.filter((remove) => delete remove.residents));
  //   };
  //   getFetchApi();
  // }, []);

  return (
    <div>
      <AuthProvider>
        <Table />
      </AuthProvider>
    </div>
  );
}

export default App;
