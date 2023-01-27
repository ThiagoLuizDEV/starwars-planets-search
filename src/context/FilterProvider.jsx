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
    let planetFilteres = [];
    if (compare === 'maior que') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) > number);
    } else if (compare === 'menor que') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) < number);
    } else if (compare === 'igual a') {
      planetFilteres = planetFilter
        .filter((planet) => Number(planet[select]) === Number(number));
    }
    console.log({ planetFilter, select, compare, number });
    setPlanetFilter(planetFilteres);
  };

  return (
    <FilterContext.Provider
      value={ {
        filterPlanets,
        planetFiltered,
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
