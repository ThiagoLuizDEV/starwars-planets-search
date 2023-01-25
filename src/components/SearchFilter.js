import React, { useContext, useEffect, useState } from 'react';

import FilterContext from '../context/FilterContext';

function SearchFilter() {
  const { filterPlanets } = useContext(FilterContext);
  const [getColumn, setGetColumn] = useState('population');
  const [getOperator, setGetOperator] = useState('maior que');
  const [getValue, setGetValue] = useState(0);
  const [selectColumn, setSelecteColumn] = useState([]);
  const [arrayFilter, setArrayFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleChange = ({ target }) => {
    setGetColumn(target.value);
  };

  //   const test = planetFiltered.filter((test1) => {
  //     if (selectColumn.length > 0) {
  //       return selectColumn.includes(test1.value);
  //     }
  //     return true;
  //   });

  const filtros = () => {
    if (selectColumn.includes()) {
      setSelecteColumn(selectColumn.filter((op) => op !== getColumn));
      return;
    }
    setSelecteColumn([...selectColumn, getColumn]);
  };

  const removeFilter = () => {
    const filterValue = arrayFilter.filter((array) => (
      array !== getColumn
    ));
    setArrayFilter(filterValue);
  };

  const handleClick = () => {
    filterPlanets(getColumn, getOperator, getValue);
    filtros();
    removeFilter();
  };

  useEffect(() => {
    setGetColumn(arrayFilter[0]);
  }, [arrayFilter]);

  return (
    <div>

      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >

        { arrayFilter.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        )) }

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
        Filtrar

      </button>
      {selectColumn.map((value) => (
        <div key={ value }>{ value }</div>
      ))}
    </div>
  );
}

export default SearchFilter;
