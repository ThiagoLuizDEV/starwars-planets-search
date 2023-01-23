import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authContext from './authContext';

function AuthProvider({ children }) {
  const [getPlanets, setGetPlanets] = useState([]);
  const [planetFilter, setPlanetFilter] = useState([]);

  useEffect(() => {
    const getFetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanetFilter(data.results);
      setGetPlanets(data.results.filter((remove) => delete remove.residents));
    };
    getFetchApi();
  }, []);

  return (
    <authContext.Provider value={ { getPlanets, planetFilter, setPlanetFilter } }>
      { children }
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
