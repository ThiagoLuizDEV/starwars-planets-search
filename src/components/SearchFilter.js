import React, { useContext, useState } from 'react';
import FilterContext from '../context/FilterContext';

function SearchFilter() {
  const { filterPlanets } = useContext(FilterContext);
  const [getColumn, setGetColumn] = useState('population');
  const [getOperator, setGetOperator] = useState('maior que');
  const [getValue, setGetValue] = useState(0);

  const handleClick = () => {
    filterPlanets(getColumn, getOperator, getValue);
  };
  return (
    <div>

      <select
        name="column"
        data-testid="column-filter"
        onChange={ ({ target }) => setGetColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setGetOperator(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="numeric_value"
        data-testid="value-filter"
        placeholder="Filter by numeric value"
        value={ getValue }
        onChange={ ({ target }) => setGetValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filter

      </button>
    </div>
  );
}

export default SearchFilter;
