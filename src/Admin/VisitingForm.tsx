import React, { useState } from "react";
import { useAddVisitingMutation } from "../redux/features/admin/adminApi";
import { toast } from "sonner";

const VisitingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    district: "",
    upazila: "",
    schoolName: "",
    headOfInstitution: { name: "" },
    institutionMobile: "",
    institutionEmail: "",
    interestedStudents: [
      { name: "", contactNumber: "", parentsMobileNumber: "" },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("headOfInstitution")) {
      setFormData((prev) => ({
        ...prev,
        headOfInstitution: {
          ...prev.headOfInstitution,
          name: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStudentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedStudents = formData.interestedStudents.map((student, i) =>
      i === index ? { ...student, [name]: value } : student
    );
    setFormData((prev) => ({ ...prev, interestedStudents: updatedStudents }));
  };

  const addStudent = () => {
    setFormData((prev) => ({
      ...prev,
      interestedStudents: [
        ...prev.interestedStudents,
        { name: "", contactNumber: "", parentsMobileNumber: "" },
      ],
    }));
  };

  const removeStudent = (index: number) => {
    const updatedStudents = formData.interestedStudents.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, interestedStudents: updatedStudents }));
  };

  const [addVisiting] = useAddVisitingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const toastId = toast.loading("Submitting form...");
    const res = (await addVisiting(formData)) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Visiting data submitted successfully!", { id: toastId });
      setFormData({
        district: "",
        upazila: "",
        schoolName: "",
        headOfInstitution: { name: "" },
        institutionMobile: "",
        institutionEmail: "",
        interestedStudents: [
          { name: "", contactNumber: "", parentsMobileNumber: "" },
        ],
      });
    }
    // Submit to your backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-4 bg-white shadow-md rounded mt-10 mb-5"
    >
      <h2 className="text-lg font-semibold">Visiting Area Form</h2>

      {/* District */}
      <div>
        <label className="block text-sm font-medium">District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Upazila */}
      <div>
        <label className="block text-sm font-medium">Upazila</label>
        <input
          type="text"
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* School Name */}
      <div>
        <label className="block text-sm font-medium">School Name</label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Head of Institution */}
      <div>
        <label className="block text-sm font-medium">Head of Institution</label>
        <input
          type="text"
          name="headOfInstitution.name"
          value={formData.headOfInstitution.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Institution Mobile */}
      <div>
        <label className="block text-sm font-medium">Institution Mobile</label>
        <input
          type="text"
          name="institutionMobile"
          value={formData.institutionMobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Institution Email */}
      <div>
        <label className="block text-sm font-medium">Institution Email</label>
        <input
          type="email"
          name="institutionEmail"
          value={formData.institutionEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Interested Students */}
      <div>
        <label className="block text-sm font-medium">Interested Students</label>
        {formData.interestedStudents.map((student, index) => (
          <div key={index} className="space-y-2 border p-2 rounded mb-2">
            <p className="font-medium">Student {index + 1}</p>{" "}
            {/* Displaying the index */}
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={student.name}
              onChange={(e) => handleStudentChange(index, e)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={student.contactNumber}
              onChange={(e) => handleStudentChange(index, e)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="parentsMobileNumber"
              placeholder="Parent's Mobile Number"
              value={student.parentsMobileNumber}
              onChange={(e) => handleStudentChange(index, e)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => removeStudent(index)}
              className="bg-red-500 px-3 py-1 text-2xl rounded font-bold text-white"
            >
              -
            </button>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addStudent}
            className="bg-blue-500 px-3 py-1 text-2xl rounded font-bold text-white"
          >
            +
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default VisitingForm;
