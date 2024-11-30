import React, { useState } from "react";
import { toast } from "sonner";
import { useAddRepresentativeTeacherMutation } from "../redux/features/admin/adminApi";

const RepTeachersForm: React.FC = () => {
  const [formData, setFormData] = useState({
    district: "",
    upazila: "",
    teacherName: "",
    designation: "",
    institutionName: "",
    mobileNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [addRepresentativeTeacher] = useAddRepresentativeTeacherMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const toastId = toast.loading("Submitting form...");
    const res = (await addRepresentativeTeacher(formData)) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Representative Teacher`s data submitted successfully!", { id: toastId });
      setFormData({
        district: "",
        upazila: "",
        teacherName: "",
        designation: "",
        institutionName: "",
        mobileNumber: "",
        email: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Representative Teacher
      </h2>
      {[
        { name: "district", label: "District" },
        { name: "upazila", label: "Upazila" },
        { name: "teacherName", label: "Teacher Name" },
        { name: "designation", label: "Designation" },
        { name: "institutionName", label: "Institution Name" },
        { name: "mobileNumber", label: "Mobile Number" },
        { name: "email", label: "Email" },
      ].map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-gray-700 font-bold mb-2"
          >
            {field.label}
          </label>
          <input
            type={field.name === "email" ? "email" : "text"}
            id={field.name}
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RepTeachersForm;
