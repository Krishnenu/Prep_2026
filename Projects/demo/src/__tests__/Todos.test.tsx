import { render, screen } from "@testing-library/react";
import { Todos } from "../pages/Todos";

const mockTodos = [
  { id: 1, title: "Learn Jest" },
  { id: 2, title: "Write tests" },
];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockTodos),
  } as unknown as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and displays todo items", async () => {
  render(<Todos />);

  expect(await screen.findByText("Learn Jest")).toBeInTheDocument();
  expect(await screen.findByText("Write tests")).toBeInTheDocument();

  expect(global.fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/todos",
  );
});
