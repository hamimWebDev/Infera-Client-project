import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useAddAdmissionMutation,
  useGetUserQuery,
} from "../redux/features/admin/adminApi";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

// process.config();

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdmissionForm: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.userId);
  const name = data?.data?.name;
  console.log(name)

  const [formData, setFormData] = useState({
    technology: "",
    picture: "",
    studentName: "",
    sNumber: "",
    bloodGroup: "",
    fName: "",

    mName: "",
    pMobile: "",
    address: {
      village: "",
      post: "",
      thana: "",
      district: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        if (event.key.toLowerCase() === "a") {
          navigate("/admin");
        } else if (event.key.toLowerCase() === "l") {
          navigate("/login");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [sendAdmission] = useAddAdmissionMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [fieldName]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

    const toastId = toast.loading("Submitting form...");
    const allData = { ...formData, reference: name };
    console.log(allData);
    const res = (await sendAdmission(allData)) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Admission submitted successfully!", { id: toastId });
      setFormData({
        technology: "",
        picture: "",
        studentName: "",
        sNumber: "",
        bloodGroup: "",
        fName: "",

        mName: "",
        pMobile: "",
        address: {
          village: "",
          post: "",
          thana: "",
          district: "",
        },
      });
      setSelectedFile(null);
      setImageSrc(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md space-y-6 my-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Admission Form
      </h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Technology
          </label>
          <input
            type="text"
            name="technology"
            required
            value={formData.technology}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
      </div>

      {/* Student Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            required
            value={formData.studentName}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            required
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Parent Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name
          </label>
          <input
            type="text"
            name="fName"
            required
            value={formData.fName}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            name="mName"
            required
            value={formData.mName}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Number
          </label>
          <input
            type="text"
            name="sNumber"
            required
            value={formData.sNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            parents Number
          </label>
          <input
            type="text"
            name="pMobile"
            required
            value={formData.pMobile}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Address Section */}
      <h3 className="text-lg font-semibold text-gray-800">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Village
          </label>
          <input
            type="text"
            name="address.village"
            required
            value={formData.address.village}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Post
          </label>
          <input
            type="text"
            name="address.post"
            required
            value={formData.address.post}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thana
          </label>
          <input
            type="text"
            name="address.thana"
            required
            value={formData.address.thana}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            name="address.district"
            required
            value={formData.address.district}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
      >
        {uploading ? "Uploading..." : "Submit Admission"}
      </button>
    </form>
  );
};

export default AdmissionForm;
