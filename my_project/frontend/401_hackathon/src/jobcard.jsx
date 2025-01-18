import React from 'react';

function JobCard({ job }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700">{job.role}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
      <p className="text-sm text-gray-400">{job.date}</p>
    </div>
  );
}

export default JobCard;
