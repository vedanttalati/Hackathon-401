import React, { useState } from 'react';

function JobDetails({ job, onClose, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  // Local state for editing the fields
  const [editForm, setEditForm] = useState({
    role: job.role,
    company: job.company,
    date: job.date,
    status: job.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...editForm,
      // Provide original identifiers so parent can correctly update
      originalRole: job.role,
      originalCompany: job.company,
      originalStatus: job.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {isEditing ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  className="border rounded w-full p-2"
                  value={editForm.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  className="border rounded w-full p-2"
                  value={editForm.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  className="border rounded w-full p-2"
                  value={editForm.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Status</label>
                <select
                  name="status"
                  className="border rounded w-full p-2"
                  value={editForm.status}
                  onChange={handleChange}
                >
                  <option value="applied">applied</option>
                  <option value="interview">interview</option>
                  <option value="offer">offer</option>
                  <option value="rejection">rejection</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">{job.role}</h2>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Date Applied:</strong> {job.date}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>

            {/* 
               3) ADD THE DELETE BUTTON. 
               It calls onDelete with the current job.
            */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onDelete(job)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
