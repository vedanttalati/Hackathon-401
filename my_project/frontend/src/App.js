import React from 'react';
import './App.css';
import JobCard from './JobCard';

function App() {
  const jobData = {
    applied: [
      { role: 'Frontend Developer', company: 'TechCorp', date: '2025-01-10' },
      { role: 'UI Designer', company: 'Designify', date: '2025-01-12' },
    ],
    interview: [{ role: 'Backend Developer', company: 'CodeBase', date: '2025-01-08' }],
    offer: [{ role: 'Fullstack Developer', company: 'InnovateTech', date: '2025-01-05' }],
    rejection: [{ role: 'Data Scientist', company: 'AnalyzeAI', date: '2025-01-03' }],
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <button className="add-job-button">Add Job</button>
      </header>

      {/* Columns */}
      <div className="columns-container">
        {Object.entries(jobData).map(([status, jobs]) => (
          <div key={status} className="column">
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2025 Job Tracker App. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
