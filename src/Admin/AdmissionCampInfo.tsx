import React, { useState } from "react";
import { toast } from "sonner";
import { useAddAdmissionCampMutation } from "../redux/features/admin/adminApi";

interface TCampInfo {
  district: string;
  upazila: string;
  date: string;
  time: string; // Time will now include AM/PM
  location: string;
}

const AdmissionCampInfo: React.FC = () => {
  const [formData, setFormData] = useState<TCampInfo>({
    district: "",
    upazila: "",
    date: "",
    time: "",
    location: "",
  });

  const [amPm, setAmPm] = useState("AM");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmPm(e.target.value);
  };

  const [addAdmissionCamp] = useAddAdmissionCampMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine time and AM/PM
    const formattedTime = `${formData.time} ${amPm}`;
    const dataToSubmit = { ...formData, time: formattedTime };

    console.log("Camp Info Submitted:", dataToSubmit);

    const toastId = toast.loading("Submitting form...");
    const res = (await addAdmissionCamp(dataToSubmit)) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Admission Camp data submitted successfully!", {
        id: toastId,
      });
      setFormData({
        district: "",
        upazila: "",
        date: "",
        time: "",
        location: "",
      });
      setAmPm("AM");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md mt-10">
      <h2 className="text-lg font-bold mb-4">Add Camp Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="district">
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="upazila">
            Upazila
          </label>
          <input
            type="text"
            id="upazila"
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="time">
            Time
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="00:00"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            <select
              value={amPm}
              onChange={handleAmPmChange}
              className="mt-1 block border-gray-300 rounded-md shadow-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionCampInfo;
