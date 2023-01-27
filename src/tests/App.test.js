import React from 'react';
import { getAllByTestId, render, screen } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import userEvent from '@testing-library/user-event'
import App from '../App';
import AuthProvider from '../context/AuthProvider';
import FilterProvider from '../context/FilterProvider';



test('Se ao entrar na página aparece um input de pesquisa', () => {
  render(
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>,
  );
  const elemento = screen.getByRole('textbox');
  expect(elemento).toBeInTheDocument();
  });
test('Se as informações dos planets são exibidas assim que a API é carregada.', async () => {
  render(
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>,
  );
  const PlanetaUm = await screen.findByText(/name/i);
  expect(PlanetaUm).toBeInTheDocument();
})  

  test('Se ao digitar no input, os planets digitados são exibidos', async () => {
    render(
      <AuthProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </AuthProvider>,
    )
  const PlanetaUm = await screen.findByText('Tatooine');
  expect(PlanetaUm).toBeInTheDocument();
  const elemento =  screen.getByRole('textbox')
  userEvent.type(elemento, 'Alder')
  const alderaan = screen.getByText('Alderaan')
  expect(alderaan).toBeInTheDocument()
  
  // console.log(screen.logTestingPlaygroundURL());
  
  })

  test('filtro de planets funciona', async () => {
    render(
      <AuthProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </AuthProvider>,
    );
    const filtro = screen.getByRole('button', {
      name: /filtrar/i
    })
    const hoth = await screen.findByRole('cell', {
      name: /Hoth/i
    })
    userEvent.click(filtro);
  expect(hoth).not.toBeInTheDocument();
})

test('existe o texto do filtro', () => {
  render(
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>,
  );
  const filtro = screen.getByRole('button', {
    name: /filtrar/i
  })
  userEvent.click(filtro);
  const text = screen.getByText(/maior que/i)
  userEvent.click(filtro);
  expect(text).toBeInTheDocument();
})

test('clicar em filtrar, adiciona um parágrafo' , () => {
  render(
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>,
  );
  const filtro = screen.getByRole('button', {
    name: /filtrar/i
  })
  userEvent.click(filtro);
  userEvent.click(filtro);
  userEvent.click(filtro);
  const ola = screen.getAllByText(/maior que/i)

  expect(ola.length).toBe(1);
})


test('filtro de comparação menor funciona', async () => {
  render(
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>,
  )
  const filtro = screen.getByRole('button', {
    name: /filtrar/i
  });
  const comparacao = screen.getByTestId('comparison-filter');
  userEvent.selectOptions((comparacao), 'menor que');
  expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(true);
  userEvent.click(filtro);
  const planets = await findAllByTestId('planet-name');
  expect(planets).not.toBeInTheDocument();
})
