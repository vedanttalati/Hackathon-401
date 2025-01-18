import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobDetails from './JobDetails';
import AddJobModal from './AddJobModal';

function App() {
  const defaultJobData = {
    applied: [
      {
        role: 'Frontend Developer',
        company: 'TechCorp',
        date: '2025-01-10',
        status: 'applied'
      },
      {
        role: 'UI Designer',
        company: 'Designify',
        date: '2025-01-12',
        status: 'applied'
      },
    ],
    interview: [
      {
        role: 'Backend Developer',
        company: 'CodeBase',
        date: '2025-01-08',
        status: 'interview'
      },
    ],
    offer: [
      {
        role: 'Fullstack Developer',
        company: 'InnovateTech',
        date: '2025-01-05',
        status: 'offer'
      },
    ],
    rejection: [
      {
        role: 'Data Scientist',
        company: 'AnalyzeAI',
        date: '2025-01-03',
        status: 'rejection'
      },
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

  // Find which status array a job belongs to
  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => setSelectedJob(null);

  // 1) When you add a job, store the status in the job object
  const handleAddJob = (newJob) => {
    // newJob already has newJob.status from AddJobModal
    // e.g. { role, company, date, status: 'applied' }
    setJobData((prevData) => ({
      ...prevData,
      [newJob.status]: [...prevData[newJob.status], newJob],
    }));
    setShowAddJobModal(false);
  };

  // 2) Edit a job and move it to the correct status array if needed
  const handleEditJob = (updatedJob) => {
    setJobData((prevData) => {
      const {
        originalRole,
        originalCompany,
        originalStatus,
        role,
        company,
        date,
        status, // new status chosen by the user
      } = updatedJob;

      // If the status hasn't changed, just update fields in place
      if (status === originalStatus) {
        const updatedJobsInSameColumn = prevData[status].map((job) => {
          if (job.role === originalRole && job.company === originalCompany) {
            // Return the updated job, including its new status
            return { role, company, date, status };
          }
          return job;
        });

        return {
          ...prevData,
          [status]: updatedJobsInSameColumn,
        };
      } else {
        // Status changed: remove from old array, add to new array
        const filteredOldArray = prevData[originalStatus].filter(
          (job) => !(job.role === originalRole && job.company === originalCompany)
        );
        const newArray = [
          ...prevData[status],
          // Pass the new data including the updated status
          { role, company, date, status },
        ];
        return {
          ...prevData,
          [originalStatus]: filteredOldArray,
          [status]: newArray,
        };
      }
    });
    setSelectedJob(null);
  };

  // 3) Delete a job from its current status array
  const handleDeleteJob = (jobToDelete) => {
    const { role, company, status } = jobToDelete;
    setJobData((prevData) => {
      const updatedStatusArray = prevData[status].filter(
        (job) => !(job.role === role && job.company === company)
      );
      return {
        ...prevData,
        [status]: updatedStatusArray,
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
        {/* Map over each status array and render the jobs */}
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
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
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
