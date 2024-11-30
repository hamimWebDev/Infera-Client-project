import { useParams } from "react-router-dom";

import { useState } from "react";
import { useGetAPublicRelationQuery } from "../redux/features/admin/adminApi";



const OnePublicRelationOfficer = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAPublicRelationQuery(id);

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter visitingSchedule based on search query
  const filteredVisitingSchedule = data?.data?.VisitingSchedule.filter(
    (VisitingSchedule: any) =>
      VisitingSchedule?.upazila
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className="overflow-x-auto lg:ml-64">
      {/* Search Input */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search by Upazila"
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
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Upazila
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number of interested Institutions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredVisitingSchedule?.map(
            (VisitingSchedule: any, index: number) => (
              <tr key={VisitingSchedule._id}>
                <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {VisitingSchedule?.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {VisitingSchedule?.upazila}
                </td>
                <td className="px-6 py-4 lg:pl-24 whitespace-nowrap text-sm text-gray-900">
                  {VisitingSchedule?.interestedInstitutions}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OnePublicRelationOfficer;
