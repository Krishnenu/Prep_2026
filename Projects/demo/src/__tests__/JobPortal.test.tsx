import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import JobPortal from "../pages/JobPortal";

const mockJobIds = Array.from({ length: 12 }, (_, i) => i + 1);

const mockJob = (id: number) => ({
  id,
  title: `Job ${id}`,
  by: `user${id}`,
  time: 1700000000,
});

beforeEach(() => {
  globalThis.fetch = jest.fn() as jest.Mock;

  (globalThis.fetch as jest.Mock).mockImplementation((url: RequestInfo) => {
    if (url.toString().includes("jobstories")) {
      return Promise.resolve({
        json: () => Promise.resolve(mockJobIds),
      });
    }

    const id = Number(url.toString().match(/item\/(\d+)/)?.[1]);

    return Promise.resolve({
      json: () => Promise.resolve(mockJob(id)),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Hacker News Jobs Board", () => {
  test("renders heading", () => {
    render(<JobPortal />);
    expect(screen.getByText(/Hacker News Jobs Board/i)).toBeInTheDocument();
  });

  test("fetches job IDs on mount", async () => {
    render(<JobPortal />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://hacker-news.firebaseio.com/v0/jobstories.json",
      );
    });
  });

  test("renders first 6 jobs on initial load", async () => {
    render(<JobPortal />);

    const jobCards = await screen.findAllByText(/Job \d/);
    expect(jobCards).toHaveLength(6);
  });

  test("loads more jobs when clicking Load More", async () => {
    render(<JobPortal />);

    // wait for first batch
    await screen.findAllByText(/Job \d/);

    fireEvent.click(screen.getByRole("button", { name: /load more/i }));

    const jobCards = await screen.findAllByText(/Job \d/);
    expect(jobCards).toHaveLength(6);
  });

  test("disables Load More button while loading", async () => {
    render(<JobPortal />);

    const button = screen.getByRole("button", { name: /load more/i });

    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
