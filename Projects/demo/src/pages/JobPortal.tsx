import { useEffect, useState } from "react";
import "./styles.css";

type Job = {
  id: number;
  title: string;
  by: string;
  time: number;
};

export default function App() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getJobIds = async (): Promise<void> => {
    try {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json",
      );
      const data: number[] = await res.json();
      setJobIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobs = async (
    currentPage: number,
    ids: number[],
  ): Promise<void> => {
    if (!ids.length) return;

    setLoading(true);

    const startPage = currentPage;
    const endPage = currentPage + 6;
    const pageIds = ids.slice(startPage, endPage);

    try {
      const data: Job[] = await Promise.all(
        pageIds.map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
          return res.json();
        }),
      );

      setJobs((prev) => [...prev, ...data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreHandler = (): void => {
    setPage((prev) => prev + 6);
  };

  useEffect(() => {
    getJobIds();
  }, []);

  useEffect(() => {
    if (jobIds.length > 0) {
      fetchJobs(page, jobIds);
    }
  }, [page, jobIds.length]);

  return (
    <div className="container">
      <p className="heading">Hacker News Jobs Board</p>

      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h2 className="job-title">{job.title}</h2>
          <p className="job-meta">
            Posted by <strong>{job.by}</strong> •{" "}
            {new Date(job.time * 1000).toLocaleDateString()}
          </p>
        </div>
      ))}

      <button
        className="load-more-btn"
        onClick={loadMoreHandler}
        disabled={loading || jobs.length >= jobIds.length}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
