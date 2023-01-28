import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import authContext from './authContext';

function FilterProvider({ children }) {
  const { planetFilter, setPlanetFilter, getPlanets } = useContext(authContext);

  const planetFiltered = ({ target }) => {
    const { value } = target;
    const filtered = getPlanets.filter((planet) => planet.name.includes(value));
    setPlanetFilter(filtered);
  };

  const filterPlanets = (select, compare, number) => {
    let planetFilteres = [...planetFilter];
    if (compare === 'maior que') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) > number);
    }
    if (compare === 'menor que') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) < number);
    }
    if (compare === 'igual a') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) === Number(number));
    }
    setPlanetFilter(planetFilteres);
  };

  const ordemDosPlanets = ({ column, number }) => {
    const unknown = planetFilter.filter((p) => p[column].includes('unknown'));

    if (number === 'ASC') {
      const order = planetFilter
        .filter((p) => !p[column].includes('unknown'))
        .sort((a, b) => a[column] - b[column]);
      order.push(...unknown);
      return setPlanetFilter(order);
    }
    if (number === 'DESC') {
      const order = planetFilter
        .filter((p) => !p[column].includes('unknown'))
        .sort((a, b) => b[column] - a[column]);
      order.push(...unknown);
      return setPlanetFilter(order);
    }
  };

  return (
    <FilterContext.Provider
      value={ {
        filterPlanets,
        planetFiltered,
        ordemDosPlanets,
      } }
    >
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
