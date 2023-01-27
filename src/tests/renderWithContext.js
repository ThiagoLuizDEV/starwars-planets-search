import React from 'react'
import { render } from '@testing-library/react'
import AuthProvider from '../context/AuthProvider'
import authContext from '../context/authContext'
import FilterProvider from '../context/FilterProvider'
import FilterContext from '../context/FilterContext'

const renderWithContext = (component) => {
  return {
    ...render(
        <AuthProvider>
            <FilterProvider>
              {component}
            </FilterProvider>
        </AuthProvider>)
  }
}
export default renderWithContext;