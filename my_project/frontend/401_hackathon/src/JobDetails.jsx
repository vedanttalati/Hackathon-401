import React from 'react';

function JobDetails({ job, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">{job.role}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Date Applied:</strong> {job.date}</p>
        <p><strong>Status:</strong> {job.status}</p>
      </div>
    </div>
  );
}

export default JobDetails;
