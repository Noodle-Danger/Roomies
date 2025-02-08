/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock';
import { GlobalProvider } from '../../context/GlobalContext';
import { render, screen, cleanup } from '@testing-library/react';

import ChoreItem from '../ChoreItem';
import ChoreCreator from '../ChoreCreator';

// define mocked chore object
interface Chore {
  choreId: number;
  choreName: string;
  tokens: number;
  choreImg?: string | null;
}

fetchMock.enableMocks();
// Enable mocking
beforeEach(() => {
  fetchMock.resetMocks();
});
test('should render ChoreList component', async () => {
  // Mock each fetch call independently
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        choreId: 1,
        choreName: 'take out garbage',
        tokens: 10,
        choreImg: null,
      } as Chore,
    ]),
    { status: 200 }
  );

  render(
    <GlobalProvider>
      <ChoreItem />
    </GlobalProvider>
  );

  const choreElement = await screen.findByTestId('chore-1');
  expect(choreElement).toBeInTheDocument();
  // expect(choreElement).toHaveTextContent(/chore/i);
  //   expect(choreElement).toContainHTML('<button>');

  const defaultState = screen.getByText('Mark Complete');
  expect(defaultState).toBeInTheDocument();

  const button = screen.getByRole('img', { name: /chore/ });
  expect(button).toBeInTheDocument();
});

test('should handle fetch errors', async () => {
  // Mock a failed fetch call
  fetchMock.mockResponseOnce('', { status: 500 }); // Simulate a server error

  render(
    <GlobalProvider>
      <ChoreCreator />
    </GlobalProvider>
  );

  const errorMessage = await screen.findByTestId('error-message');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Failed to create chore');
});
