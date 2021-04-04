import { render, screen } from '@testing-library/react';
import {  mount } from 'enzyme';
import App from './App';

import Create  from './components/CreatePokemon/CreatePokemon';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


