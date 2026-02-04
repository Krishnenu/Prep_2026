import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import JobPortal from "./JobPortal";

// Mock data
const mockJobIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    by: "johndoe",
    time: 1704067200, // 2024-01-01
  },
  {
    id: 2,
    title: "Backend Engineer",
    by: "janedoe",
    time: 1704153600, // 2024-01-02
  },
  {
    id: 3,
    title: "Full Stack Developer",
    by: "bobsmith",
    time: 1704240000, // 2024-01-03
  },
  {
    id: 4,
    title: "DevOps Engineer",
    by: "alicejones",
    time: 1704326400, // 2024-01-04
  },
  {
    id: 5,
    title: "UI/UX Designer",
    by: "charlielee",
    time: 1704412800, // 2024-01-05
  },
  {
    id: 6,
    title: "Product Manager",
    by: "davidkim",
    time: 1704499200, // 2024-01-06
  },
];

// Mock fetch globally
globalThis.fetch = jest.fn();

describe("JobPortal Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Initial Render", () => {
    it("should render the heading", () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        json: async () => [],
      });

      render(<JobPortal />);
      expect(screen.getByText("Hacker News Jobs Board")).toBeInTheDocument();
    });

    it("should render the Load More button", () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        json: async () => [],
      });

      render(<JobPortal />);
      expect(
        screen.getByRole("button", { name: /load more/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Fetching Job IDs", () => {
    it("should fetch job IDs on mount", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobIds,
      });

      render(<JobPortal />);

      await waitFor(() => {
        expect(globalThis.fetch).toHaveBeenCalledWith(
          "https://hacker-news.firebaseio.com/v0/jobstories.json",
        );
      });
    });

    it("should handle error when fetching job IDs fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error"),
      );

      render(<JobPortal />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Loading Jobs", () => {
    it("should load first 6 jobs on mount", async () => {
      // Mock job IDs fetch
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobIds,
      });

      // Mock individual job fetches
      mockJobs.forEach((job) => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
          json: async () => job,
        });
      });

      render(<JobPortal />);

      // Wait for jobs to be loaded
      await waitFor(() => {
        expect(
          screen.getByText("Senior Frontend Developer"),
        ).toBeInTheDocument();
      });

      expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
      expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
      expect(screen.getByText("DevOps Engineer")).toBeInTheDocument();
      expect(screen.getByText("UI/UX Designer")).toBeInTheDocument();
      expect(screen.getByText("Product Manager")).toBeInTheDocument();
    });

    it("should display job metadata correctly", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [1],
      });

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobs[0],
      });

      render(<JobPortal />);

      await waitFor(() => {
        expect(
          screen.getByText("Senior Frontend Developer"),
        ).toBeInTheDocument();
      });

      expect(screen.getByText(/Posted by/i)).toBeInTheDocument();
      expect(screen.getByText("johndoe")).toBeInTheDocument();
    });

    it("should show loading state while fetching jobs", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobIds,
      });

      // Delay the job fetch to capture loading state
      (globalThis.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  json: async () => mockJobs[0],
                }),
              100,
            ),
          ),
      );

      render(<JobPortal />);

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  describe("Load More Functionality", () => {
    it("should load more jobs when Load More button is clicked", async () => {
      // Mock job IDs fetch
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobIds,
      });

      // Mock first 6 jobs
      for (let i = 0; i < 6; i++) {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
          json: async () => mockJobs[i],
        });
      }

      render(<JobPortal />);

      // Wait for initial jobs to load
      await waitFor(() => {
        expect(
          screen.getByText("Senior Frontend Developer"),
        ).toBeInTheDocument();
      });

      // Mock next batch of jobs
      const nextJobs = [
        { id: 7, title: "Data Scientist", by: "user7", time: 1704585600 },
        { id: 8, title: "ML Engineer", by: "user8", time: 1704672000 },
      ];

      nextJobs.forEach((job) => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
          json: async () => job,
        });
      });

      // Click Load More
      const loadMoreButton = screen.getByRole("button", { name: /load more/i });
      fireEvent.click(loadMoreButton);

      // Wait for new jobs to appear
      await waitFor(() => {
        expect(screen.getByText("Data Scientist")).toBeInTheDocument();
      });
    });

    it("should disable Load More button when loading", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockJobIds,
      });

      (globalThis.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  json: async () => mockJobs[0],
                }),
              100,
            ),
          ),
      );

      render(<JobPortal />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /loading/i });
        expect(button).toBeDisabled();
      });
    });

    it("should disable Load More button when all jobs are loaded", async () => {
      const limitedJobIds = [1, 2, 3];

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => limitedJobIds,
      });

      limitedJobIds.forEach((id) => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
          json: async () => mockJobs[id - 1],
        });
      });

      render(<JobPortal />);

      await waitFor(() => {
        expect(
          screen.getByText("Senior Frontend Developer"),
        ).toBeInTheDocument();
      });

      const loadMoreButton = screen.getByRole("button", { name: /load more/i });

      // After loading all jobs, button should be disabled
      await waitFor(() => {
        expect(loadMoreButton).toBeDisabled();
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle error when fetching individual jobs fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [1],
      });

      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to fetch job"),
      );

      render(<JobPortal />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty job IDs array", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [],
      });

      render(<JobPortal />);

      await waitFor(() => {
        expect(screen.getByText("Hacker News Jobs Board")).toBeInTheDocument();
      });

      // Should not display any job cards
      const jobCards = screen.queryAllByRole("heading", { level: 2 });
      expect(jobCards.length).toBe(0);
    });

        it('should handle fetchJobs early return when ids array is empty', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => [],
            });

            const { rerender } = render(<JobPortal />);

            await waitFor(() => {
                expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            });

            rerender(<JobPortal />);

            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        });
    });
});