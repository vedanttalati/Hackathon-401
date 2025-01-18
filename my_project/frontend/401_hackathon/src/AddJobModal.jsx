import React, { useState } from 'react';

function AddJobModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    date: '',
    status: 'applied',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Add a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              className="border rounded w-full p-2"
              value={formData.role}
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
              value={formData.company}
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
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              className="border rounded w-full p-2"
              value={formData.status}
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
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;
