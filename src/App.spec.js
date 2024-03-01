// Import React for JSX support and render and fireEvent functions from @testing-library/react for testing.
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Import the component to be tested.
import App from './App';

describe('App Component', () => {

// Test case: Checks if the header of the application is rendered correctly.
it('renders User Management App header', () => {
  // Render the App component.
  const { getByText } = render(<App />);
  // Find the header element by its text content using a case-insensitive regular expression.
  const headerElement = getByText(/User Management Apps/i);
  // Assert that the header element is present in the document.
  expect(headerElement).toBeInTheDocument();
});

// Test case: Checks if a new user can be added to the list.
it('adds a new user to the list', () => {
  // Render the App component.
  const { getByPlaceholderText, getByText } = render(<App />);
  
  // Find input fields and submit button by their placeholder and text content.
  const nameInput = getByPlaceholderText('Namee');
  const emailInput = getByPlaceholderText('Email');
  const submitButton = getByText('Add User');

  // Simulate user input by changing the values of the input fields.
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  // Simulate a button click to submit the form.
  fireEvent.click(submitButton);

  // Find elements corresponding to the added user's name and email.
  const nameCell = getByText('John Doe');
  const emailCell = getByText('john@example.com');

  // Assert that the user's name and email are present in the document.
  expect(nameCell).toBeInTheDocument();
  expect(emailCell).toBeInTheDocument();
});

// Test case: Checks if a user is not added when the name or email is empty.
it('does not add user if name or email is empty', () => {
  // Render the App component.
  const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  
  // Find input fields and submit button by their placeholder and text content.
  const nameInput = getByPlaceholderText('Name');
  const emailInput = getByPlaceholderText('Email');
  const submitButton = getByText('Add User');

  // Simulate user input by changing the value of the name input field to an empty string.
  fireEvent.change(nameInput, { target: { value: '' } });
  // Simulate user input by changing the value of the email input field to a non-empty string.
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  // Simulate a button click to submit the form.
  fireEvent.click(submitButton);

  // Since the user should not be added, we expect these elements not to be found.
  // Use queryByText instead of getByText to avoid throwing an error if the element is not found.
  const nameCell = queryByText('John Doe');
  const emailCell = queryByText('john@example.com');

  // Assert that the user's name and email are not present in the document.
  expect(nameCell).not.toBeInTheDocument();
  expect(emailCell).not.toBeInTheDocument();
});

});