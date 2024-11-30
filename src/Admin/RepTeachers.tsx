import { useState } from "react";
import {
  useDeleteAAdmissionCampMutation,
  useGetAllRepresentativeTeacherQuery,
} from "../redux/features/admin/adminApi";
import { toast } from "sonner";
import EditAUserModal from "./EditAUser";

const AllRepTeachers = () => {
  const { data, isLoading } = useGetAllRepresentativeTeacherQuery(undefined);
  const [deleteAdmission] = useDeleteAAdmissionCampMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditAAdmissionOpen, setIsEditAAdmissionOpen] = useState(false);
  const [selectedAdmissionId, setSelectedAdmissionId] = useState<string | null>(
    null
  );

  const handleEditClick = (admissionCampId: string) => {
    setSelectedAdmissionId(admissionCampId);
    toggleModal();
  };

  const toggleModal = () => setIsEditAAdmissionOpen(!isEditAAdmissionOpen);

  const handleDeleteClick = async (admissionCampId: string) => {
    const toastId = toast.loading("Deleting admissionCamp...");
    try {
      const res = (await deleteAdmission(admissionCampId)) as any;
      if (res?.error?.data) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Deleted admissionCamp successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter admissionCamps based on search query
  const filteredAdmissionCamp = data?.data.filter((admissionCamp: any) =>
    admissionCamp?.teacherName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  console.log(data);

  return (
    <div className="overflow-x-auto lg:ml-64">
      {/* Search Input */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search by 
Teacher name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2"
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teacher Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              District
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              upazila
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Institution Name
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAdmissionCamp?.map((admissionCamp: any, index: number) => (
            <tr key={admissionCamp._id}>
              <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admissionCamp?.teacherName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admissionCamp?.mobileNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admissionCamp?.email}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {admissionCamp?.designation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                {admissionCamp?.district}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admissionCamp?.upazila}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                {admissionCamp?.institutionName}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => {
                    handleEditClick(admissionCamp._id);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(admissionCamp._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Admission Modal */}
      {isEditAAdmissionOpen && selectedAdmissionId && (
        <EditAUserModal
          id={selectedAdmissionId}
          isEditAUserModalOpen={isEditAAdmissionOpen}
          setIsEditAUserModalOpen={setIsEditAAdmissionOpen}
        />
      )}
    </div>
  );
};

export default AllRepTeachers;