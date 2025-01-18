import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobDetails from './JobDetails';
import AddJobModal from './AddJobModal';

function App() {
  const defaultJobData = {
    applied: [
      { role: 'Frontend Developer', company: 'TechCorp', date: '2025-01-10' },
      { role: 'UI Designer', company: 'Designify', date: '2025-01-12' },
    ],
    interview: [
      { role: 'Backend Developer', company: 'CodeBase', date: '2025-01-08' },
    ],
    offer: [
      { role: 'Fullstack Developer', company: 'InnovateTech', date: '2025-01-05' },
    ],
    rejection: [
      { role: 'Data Scientist', company: 'AnalyzeAI', date: '2025-01-03' },
    ],
  };

  const [jobData, setJobData] = useState(() => {
    const savedData = localStorage.getItem('jobData');
    return savedData ? JSON.parse(savedData) : defaultJobData;
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('jobData', JSON.stringify(jobData));
  }, [jobData]);

  const handleCardClick = (job) => {
    setSelectedJob({
      ...job,
      status: Object.keys(jobData).find((key) => jobData[key].includes(job)),
    });
  };

  const closeJobDetails = () => setSelectedJob(null);

  const handleAddJob = (newJob) => {
    setJobData((prevData) => ({
      ...prevData,
      [newJob.status]: [...prevData[newJob.status], newJob],
    }));
    setShowAddJobModal(false);
  };

  const handleEditJob = (updatedJob) => {
    setJobData((prevData) => {
      const currentStatus = updatedJob.status;
      const updatedJobs = prevData[currentStatus].map((job) =>
        job.role === updatedJob.originalRole && job.company === updatedJob.originalCompany
          ? { ...updatedJob, status: undefined } // Prevent duplicate status in the job object
          : job
      );
      return {
        ...prevData,
        [currentStatus]: updatedJobs,
      };
    });
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Tenth X</h1>
          <button
            onClick={() => setShowAddJobModal(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100"
          >
            Add Job
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto my-8">
        {Object.entries(jobData).map(([status, jobs]) => (
          <div key={status} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold capitalize border-b pb-2 mb-4 text-blue-600">
              {status}
            </h2>
            {jobs.map((job, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(job)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={closeJobDetails}
          onEdit={handleEditJob} // Pass the edit handler
        />
      )}

      {showAddJobModal && (
        <AddJobModal
          onClose={() => setShowAddJobModal(false)}
          onAdd={handleAddJob}
        />
      )}

      <footer className="bg-blue-600 text-white py-4 mt-auto">
        <p className="text-center text-sm">© 2025 Job Tracker App. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
