import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { listTrainingJobs, getTrainingJob, listDatasets, startTraining } from "../../services/api";

const TrainingAdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [datasets, setDatasets] = useState<string[]>([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [epochs, setEpochs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    if (!user) return;
    try {
      const res = await listTrainingJobs(user.token);
      setJobs(res.jobs);
    } catch (err: any) {
      setError("Failed to fetch jobs");
    }
  };

  const fetchDatasets = async () => {
    if (!user) return;
    try {
      const res = await listDatasets(user.token);
      setDatasets(res.datasets);
    } catch (err: any) {
      setError("Failed to fetch datasets");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchDatasets();
    // eslint-disable-next-line
  }, [user]);

  const handleStartTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDataset || !user) return;
    setLoading(true);
    setMsg(null);
    setError(null);
    try {
      const res = await startTraining(selectedDataset, epochs, user.token);
      setMsg(`Training started: Job ID ${res.job_id}`);
      fetchJobs();
    } catch (err: any) {
      setError(err.message || "Failed to start training");
    }
    setLoading(false);
  };

  const handleShowJob = async (jobId: string) => {
    if (!user) return;
    setSelectedJob(null);
    setError(null);
    try {
      const res = await getTrainingJob(jobId, user.token);
      setSelectedJob(res);
    } catch (err: any) {
      setError("Failed to fetch job info");
    }
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-2">Training Control</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      <form className="mb-4 flex flex-col md:flex-row gap-2 items-start" onSubmit={handleStartTraining}>
        <select
          className="border rounded px-2 py-1"
          value={selectedDataset}
          onChange={e => setSelectedDataset(e.target.value)}
        >
          <option value="">Select dataset</option>
          {datasets.map(ds => (
            <option key={ds} value={ds}>{ds}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={epochs}
          onChange={e => setEpochs(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
          placeholder="Epochs"
        />
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
          disabled={loading || !selectedDataset}
        >
          {loading ? "Starting..." : "Start Training"}
        </button>
      </form>
      <div>
        <h4 className="font-semibold mb-1">Training Jobs</h4>
        <ul className="list-disc pl-6 space-y-1">
          {jobs.length === 0 && <li>No training jobs found.</li>}
          {jobs.map(job => (
            <li key={job.job_id}>
              <button
                className="text-blue-600 underline"
                onClick={() => handleShowJob(job.job_id)}
                type="button"
              >
                {job.job_id}
              </button>
              : {job.info}
            </li>
          ))}
        </ul>
        {selectedJob && (
          <div className="mt-4 bg-gray-50 border p-3 rounded">
            <strong>Job ID:</strong> {selectedJob.job_id}
            <br />
            <strong>Info:</strong> {selectedJob.info}
            <button
              className="ml-4 text-blue-600 underline"
              onClick={() => setSelectedJob(null)}
              type="button"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingAdminPanel;
