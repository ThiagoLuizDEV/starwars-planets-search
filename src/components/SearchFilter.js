import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/authContext';
import FilterContext from '../context/FilterContext';

function SearchFilter() {
  const { filterPlanets, ordemDosPlanets } = useContext(FilterContext);
  const { getPlanets, setPlanetFilter } = useContext(authContext);
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
  const [ordem, setOrdem] = useState({ column: 'population', number: '' });
  const handleOrder = ({ target }) => {
    setOrdem({
      ...ordem,
      [target.name]: target.value,
    });
  };

  const submitOrder = () => {
    ordemDosPlanets(ordem);
  };

  const handleChange = ({ target }) => {
    setGetColumn(target.value);
  };

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

  const remover = () => {
    setSelecteColumn([]);
    setArrayFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setPlanetFilter(getPlanets);
  };

  const removefiltro = (e) => {
    setSelecteColumn(selectColumn.filter((value) => e !== value));
    setPlanetFilter(getPlanets);
    setArrayFilter([...arrayFilter, e]);
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
        <p key={ value } data-testid="filter">
          { `${value}, ${getOperator}, ${getValue}` }
          <button
            onClick={ () => removefiltro(value) }
            type="button"
            value={ value }

          >
            x
          </button>

        </p>

      ))}

      <button
        type="button"
        onClick={ remover }
        data-testid="button-remove-filters"
      >
        Remover filtros
      </button>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleOrder }
      >
        {arrayFilter.map((name, i) => (
          <option
            key={ i }
          >
            {name}
          </option>
        ))}
      </select>
      <input
        type="radio"
        data-testid="column-sort-input-asc"
        value="ASC"
        name="number"
        onClick={ handleOrder }
      />
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        value="DESC"
        name="number"
        onClick={ handleOrder }
      />
      <button
        data-testid="column-sort-button"
        onClick={ submitOrder }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SearchFilter;
