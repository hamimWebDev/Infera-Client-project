import React, { useState } from "react";
import { toast } from "sonner";
import { useAddPublicRelationOfficerMutation } from "../redux/features/admin/adminApi";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const PublicRelationOfficerForm: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [addPROfficer] = useAddPublicRelationOfficerMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setImageSrc(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setSelectedFile(null);
  };

  const [formData, setFormData] = useState({
    district: "",
    picture: "",
    name: "",
    mobileNo: "",
    email: "",
    infraTagOfficerName: "",
    designation: "",
    infraMobileNo: "",
    VisitingSchedule: [{ date: "", upazila: "", interestedInstitutions: "" }],
  });

  // Handle input change for general fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes within VisitingSchedule
  const handleVisitingScheduleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedSchedule = formData.VisitingSchedule.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setFormData((prev) => ({ ...prev, VisitingSchedule: updatedSchedule }));
  };

  // Add a new VisitingSchedule
  const addVisitingSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      VisitingSchedule: [
        ...prev.VisitingSchedule,
        { date: "", upazila: "", interestedInstitutions: "" },
      ],
    }));
  };

  // Remove a VisitingSchedule by index
  const removeVisitingSchedule = (index: number) => {
    const updatedSchedule = formData.VisitingSchedule.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, VisitingSchedule: updatedSchedule }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("file", selectedFile);
      uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: uploadData,
        });

        if (response.ok) {
          const data = await response.json();
          formData.picture = data.secure_url;
        } else {
          toast.error("Image upload failed.");
          return;
        }
      } catch (error) {
        toast.error("Error uploading file.");
        return;
      } finally {
        setUploading(false);
      }
    }
    console.log("Submitted Data: ", formData);

    const toastId = toast.loading("Submitting form...");
    const res = (await addPROfficer(formData)) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Admission submitted successfully!", { id: toastId });
      setFormData({
        district: "",
        picture: "",
        name: "",
        mobileNo: "",
        email: "",
        infraTagOfficerName: "",
        designation: "",
        infraMobileNo: "",
        VisitingSchedule: [
          { date: "", upazila: "", interestedInstitutions: "" },
        ],
      });
      setSelectedFile(null);
      setImageSrc(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-4 bg-gray-100 shadow rounded"
    >
      <h2 className="text-lg font-semibold">Public Relation Officer Form</h2>

      {/* General Fields */}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Choice Your Photo
        </label>

        <div className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm cursor-pointer">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              className="w-32 h-32 object-cover mx-auto"
            />
          ) : (
            <input
              type="file"
              id="file-input"
              required
              accept="image/*"
              onChange={handleFileChange}
            />
          )}
        </div>

        {imageSrc && (
          <button
            onClick={handleCancel}
            className="mt-2 text-red-500 text-sm underline"
          >
            Cancel
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Mobile Number</label>
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Infra Tag Officer Name
        </label>
        <input
          type="text"
          name="infraTagOfficerName"
          value={formData.infraTagOfficerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Designation (Optional)
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Infra Mobile Number</label>
        <input
          type="text"
          name="infraMobileNo"
          value={formData.infraMobileNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Visiting Schedule */}
      <div>
        <h3 className="text-md font-medium">Visiting Schedule</h3>
        {formData.VisitingSchedule.map((schedule, index) => (
          <div
            key={index}
            className="space-y-2 border p-4 rounded mb-4 bg-white"
          >
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={schedule.date}
                onChange={(e) =>
                  handleVisitingScheduleChange(index, "date", e.target.value)
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Upazila</label>
              <input
                type="text"
                value={schedule.upazila}
                onChange={(e) =>
                  handleVisitingScheduleChange(index, "upazila", e.target.value)
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Interested Institutions
              </label>
              <input
                type="text"
                value={schedule.interestedInstitutions}
                onChange={(e) =>
                  handleVisitingScheduleChange(
                    index,
                    "interestedInstitutions",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeVisitingSchedule(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
          </div>
        ))}

        {/* Add Visiting Schedule Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addVisitingSchedule}
            className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default PublicRelationOfficerForm;
