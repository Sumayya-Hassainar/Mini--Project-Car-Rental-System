
import React, { useState } from "react";

function ReportIssue() {
  const [formData, setFormData] = useState({
    carId: "",
    issue: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.carId) newErrors.carId = "Car ID is required";
    if (!formData.issue) newErrors.issue = "Issue type is required";
    if (!formData.description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Issue reported successfully!");
      console.log("Reported Issue:", formData);
      setFormData({ carId: "", issue: "", description: "" });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Report Car Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car ID */}
          <div>
            <label className="block font-medium mb-1">Car ID</label>
            <input
              type="text"
              name="carId"
              placeholder="Enter Car ID"
              value={formData.carId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.carId && <p className="text-red-500 text-sm">{errors.carId}</p>}
          </div>

          {/* Issue Type */}
          <div>
            <label className="block font-medium mb-1">Issue Type</label>
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select an Issue</option>
              <option value="Engine">Engine Problem</option>
              <option value="Brakes">Brakes Issue</option>
              <option value="Tyres">Tyres / Wheel Issue</option>
              <option value="AC">AC / Cooling Issue</option>
              <option value="Other">Other</option>
            </select>
            {errors.issue && <p className="text-red-500 text-sm">{errors.issue}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;

