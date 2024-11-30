import React, { useState, useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../redux/features/admin/adminApi";
import { toast } from "sonner";

interface EditAUserModalProps {
  id: string;
  isEditAUserModalOpen: boolean;
  setIsEditAUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAUserModal: React.FC<EditAUserModalProps> = ({
  id,
  isEditAUserModalOpen,
  setIsEditAUserModalOpen,
}) => {

  // Fetch user data
  const { data: userData } = useGetUserQuery(id);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Set state when user data is fetched
  useEffect(() => {
    if (userData?.data) {
      const { name, email, phone, address } = userData.data;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [userData]);
  const closeModal = () => setIsEditAUserModalOpen(false);

  const [editUser, { isLoading }] = useUpdateUserMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Editing...");
    try {
      const res = (await editUser({
        userId: id,
        userData: { name, email, phone, address },
      })) as any;

      if (res?.error?.data) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Edit successfully", { id: toastId });
        closeModal();
      }
    } catch (err) {
      console.error(err); // Log error details for debugging
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isEditAUserModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden={!isEditAUserModalOpen}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <img
                  className="h-14"
                  src="https://dreamsport.com/images/main-logo.png"
                  alt="logo"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit User
                </h3>
                <button
                  type="button"
                  aria-label="Close modal"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="123-456-7890"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                      isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {isLoading ? "Loading..." : "Update User"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAUserModal;
