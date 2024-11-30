import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../redux/features/admin/adminApi";
import { logOut, useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import EditAUserModal from "./EditAUser";
import axios from "axios";
import { toast } from "sonner";

const Profile = () => {
  const [isEditAUserOpen, setIsEditAUserOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const [deleteUser] = useDeleteUserMutation();

  const { data, isLoading } = useGetUserQuery(user?.userId);
  const [uploadUser] = useUpdateUserMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Ensure data exists before accessing properties
  if (!data?.data) {
    return <div>No user data available</div>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const { createdAt, name, role, _id } = data.data; // Ensure 'data.data' exists
  const userCreateTime = formatDate(createdAt);

  const toggleModal = () => setIsEditAUserOpen(!isEditAUserOpen);

  const handleUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageBBApiKey = "3ab9a41a4be5e04b88403d171ce271e6";

    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
          formData
        );
        const imageUrl = response.data.data.url;

        uploadUser({
          userId: _id,
          userData: { profileImage: imageUrl },
        });
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleDeleteClick = async (userId: string) => {
    // Show a confirmation alert
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (isConfirmed) {
      const toastId = toast.loading("Deleting user...");
      try {
        const res = (await deleteUser(userId)) as any;
        if (res?.error?.data) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Deleted user successfully", { id: toastId });
          handleLogout();
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  return (
    <div className=" lg:ml-32 w-full bg-gray-100 flex justify-center items-center">
      {/* Main Container */}
      <div className="w-full bg-white rounded-lg shadow-lg h-screen">
        {/* Profile Header */}
        <div className="relative bg-black rounded-t-lg p-6 flex justify-center h-60">
          <div className="absolute -bottom-12">
            {data?.data?.profileImage === "" ? (
              <>
                <input
                  onChange={handleUploadImg}
                  type="file"
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  <svg
                    className="w-40 h-40 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </label>
              </>
            ) : (
              <>
                <img
                  src={data?.data?.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              </>
            )}
            {data?.data?.profileImage === "" ? (
              ""
            ) : (
              <button>
                <label htmlFor="profile-change" className="cursor-pointer">
                  Change Image
                </label>
                <input
                  onChange={handleUploadImg}
                  id="profile-change"
                  className="hidden"
                  type="file"
                />
              </button>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-14 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="mt-2 text-gray-600">
            Hey! I am {name}. I am a {role}.
          </p>
          <div className="flex justify-center items-center mt-4 text-gray-500">
            <i className="fa fa-calendar mr-2"></i>
            <span>Joined on {userCreateTime}</span>
            <a href="#" className="ml-2">
              <i className="fa fa-github text-black"></i>
            </a>
          </div>
          <button
            onClick={toggleModal}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Edit profile
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 ml-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Logout
          </button>
          <button
            onClick={() => {
              handleDeleteClick(_id);
            }}
            className="mt-4 ml-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Delete your account
          </button>
        </div>
      </div>
      <EditAUserModal
        id={_id}
        isEditAUserModalOpen={isEditAUserOpen}
        setIsEditAUserModalOpen={setIsEditAUserOpen}
      />
    </div>
  );
};

export default Profile;
