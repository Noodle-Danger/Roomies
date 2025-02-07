import React from "react";
import "@testing-library/jest-dom";
// import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock";
import { render, screen, cleanup } from "@testing-library/react";

import ChoreList from "../src/Components/ChoreList";

// define mocked chore object
interface Chore {
  id: number;
  task_name: string;
  type: string;
}

fetchMock.enableMocks();
// Enable mocking
beforeEach(() => {
  fetchMock.resetMocks();
});
test("should render ChoreList component", async () => {
  // Mock each fetch call independently
  fetchMock.mockResponseOnce(
    JSON.stringify([{ id: 1, task_name: "sweep", type: "Daily" } as Chore]),
    { status: 200 }
  );

  render(<ChoreList />);

  const choreElement = await screen.findByTestId("chore-1");
  expect(choreElement).toBeInTheDocument();
  expect(choreElement).toHaveTextContent("Chore");
  //   expect(choreElement).toContainHTML('<button>');

  const defaultState = screen.getByText("Add Chore");
  expect(defaultState).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /Add Chore/ });
  expect(button).toBeInTheDocument();
});

test("should handle fetch errors", async () => {
  // Mock a failed fetch call
  fetchMock.mockResponseOnce("", { status: 500 }); // Simulate a server error

  render(<ChoreList />);

  const errorMessage = await screen.findByTestId("error-message");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent("This is the getChore error");
});
