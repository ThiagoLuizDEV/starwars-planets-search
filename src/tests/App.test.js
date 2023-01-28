import React from 'react';
import { render, screen } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('mostra a tabela', async () => {
    await act(() => render(<App />))

    const table = screen.getAllByRole('row');
    expect(table.length).toBe(11);
  });

  it('mostra os fitros', async () => {
    await act(() => render(<App />))

    const name = screen.getByTestId('name-filter');
    expect(name).toBeInTheDocument();

    const column = screen.getByTestId('column-filter');
    expect(column).toBeInTheDocument();

    const operator = screen.getByTestId('comparison-filter');
    expect(operator).toBeInTheDocument();

    const number = screen.getByTestId('value-filter');
    expect(number).toBeInTheDocument();


  });

  it('Verifica os filters', async () => {
    await act(() => render(<App />))

    const name = screen.getByTestId('name-filter');

    userEvent.type(name, 'Ta')

    const planet = screen.getByRole('cell', {name: 'Tatooine'});
    expect(planet).toBeInTheDocument();
  });

  it('remove filtragens', async () => {
    await act(() => render(<App />))

    const column = screen.getByTestId('column-filter');
    const operator = screen.getByTestId('comparison-filter');
    const number = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.type(number, '4900');
    userEvent.click(filterBtn);

    const filterInfo = screen.getByTestId('filter');
    const deleteBtn = screen.getByRole('button', {name: 'x'})
    const planet = screen.getByRole('cell', {name: 'Endor'});
    
    expect(filterInfo).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(planet).toBeInTheDocument();
    
    userEvent.click(deleteBtn);
    
    expect(filterInfo).not.toBeInTheDocument();
    
    userEvent.clear(number);
    
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(operator, 'maior que');
    userEvent.type(number, '25');
    userEvent.click(filterBtn);
    
    userEvent.click(deleteBtn);
    userEvent.clear(number);
  });
  test('inputs de ordem e botao de ordenar', async () => {
    await act(() => render(<App />))
    const ASC = screen.getByTestId('column-sort-input-asc')
    const ordenar = screen.getByRole('button', {name: 'Ordenar'})
    
    userEvent.click(ASC);
    userEvent.click(ordenar);
    
    
    const DESC = screen.getByTestId('column-sort-input-desc')
    userEvent.click(DESC);
    userEvent.click(ordenar);
  })
  test('testa o botao que apaga tudo', async () => {
    await act(() => render(<App />))

    const column = screen.getByTestId('column-filter');
    const operator = screen.getByTestId('comparison-filter');
    const number = screen.getByTestId('value-filter');
    const removerTodos = screen.getByRole('button', {name: 'Remover filtros'})
    expect(removerTodos).toBeInTheDocument();


    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.type(number, '2500');
    
    userEvent.click(removerTodos);
    
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.type(number, '2500');
    
    userEvent.click(removerTodos); 

  })
});
