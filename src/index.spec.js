import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders User Management App header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/User Management App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the form inputs', () => {
  const { getByPlaceholderText } = render(<App />);
  const nameInput = getByPlaceholderText('Name');
  const emailInput = getByPlaceholderText('Email');
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});
