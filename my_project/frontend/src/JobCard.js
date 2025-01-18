import React from 'react';
import './JobCard.css';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.role}</h3>
      <p>{job.company}</p>
      <p>{job.date}</p>
    </div>
  );
}

export default JobCard;
