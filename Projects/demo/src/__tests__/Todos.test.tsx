import { render, screen } from "@testing-library/react";
import { Todos } from "../pages/Todos";

const mockTodos = [
  { id: 1, title: "Learn Jest" },
  { id: 2, title: "Write tests" },
];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockTodos),
  });
});
afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and displays todo items", async () => {
  render(<Todos />);

  expect(await screen.findByText("Learn Jest")).toBeInTheDocument();
  expect(await screen.findByText("Write tests")).toBeInTheDocument();

  expect(globalThis.fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/todos",
  );
});

test("shows error message when fetch fails", async () => {
  globalThis.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

  render(<Todos />);

  expect(await screen.findByText("Failed to load todos")).toBeInTheDocument();

  expect(screen.queryByText("Learn Jest")).not.toBeInTheDocument();
});
