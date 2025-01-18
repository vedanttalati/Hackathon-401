import React from 'react';

function JobCard({ job }) {
  let bgColor = 'bg-gray-50 hover:bg-gray-100'; // default fallback

  switch (job.status) {
    case 'applied':
      bgColor = 'bg-blue-50 hover:bg-blue-100';
      break;
    case 'interview':
      bgColor = 'bg-yellow-50 hover:bg-yellow-100';
      break;
    case 'offer':
      bgColor = 'bg-green-50 hover:bg-green-100';
      break;
    case 'rejection':
      bgColor = 'bg-red-50 hover:bg-red-100';
      break;
    default:
      break;
  }

  return (
    <div
      className={`border border-gray-300 rounded-lg p-4 mb-4 shadow-sm transition-colors ${bgColor}`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{job.role}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
      <p className="text-sm text-gray-400">{job.date}</p>
    </div>
  );
}

export default JobCard;
