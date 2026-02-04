import { fireEvent, render, screen } from "@testing-library/react";
import Test from "../pages/Test";

describe("render test component", () => {
  test("render test component", () => {
    render(<Test />);
    const co = screen.getByRole("heading");
    expect(co).toBeInTheDocument();
  });
  test("increment count when button click", () => {
    render(<Test />);

    const incbtn = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(incbtn);

    expect(screen.getByRole("heading")).toHaveTextContent("Count: 1");
  });
  test("decrement the count", () => {
    render(<Test />);
    const decBtn = screen.getByRole("button", { name: /Decrement/i });
    fireEvent.click(decBtn);
    expect(screen.getByRole("heading")).toHaveTextContent("Count: -1");
  });

  test("decrement count till limit reach", () => {
    render(<Test />);
    const incBtn = screen.getByRole("button", { name: /increment/i });
    for (let i = 0; i < 5; i++) {
      fireEvent.click(incBtn);
    }
    expect(screen.getByText("Limit reached")).toBeInTheDocument();
  });
});
