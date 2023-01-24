import React from 'react';
import './App.css';
import SearchFilter from './components/SearchFilter';
import Table from './components/Table';
import AuthProvider from './context/AuthProvider';
import FilterProvider from './context/FilterProvider';

function App() {
  return (
    <div>
      <AuthProvider>
        <FilterProvider>
          <SearchFilter />
          <Table />
        </FilterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
