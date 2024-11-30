import { useParams } from "react-router-dom";
// {visiting?.interestedStudents.length}

import { useState } from "react";
import { useGetAVisitingQuery } from "../redux/features/admin/adminApi";

const OneVisiting = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAVisitingQuery(id);
  console.log(data);

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter visitingSchedule based on search query
  const filteredInterestedStudent = data?.data?.interestedStudents.filter(
    (InterestedStudent: any) =>
      InterestedStudent?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto lg:ml-64">
      {/* Search Input */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search by Student Name"
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
              Student Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            parents Mobile Number
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInterestedStudent?.map(
            (InterestedStudent: any, index: number) => (
              <tr key={InterestedStudent._id}>
                <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {InterestedStudent?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {InterestedStudent?.contactNumber}
                </td>
                <td className="px-6 py-4 lg:pl-24 whitespace-nowrap text-sm text-gray-900">
                  {InterestedStudent?.parentsMobileNumber}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OneVisiting;
