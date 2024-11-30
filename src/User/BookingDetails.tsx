import { useParams } from "react-router-dom";
import { useGetABookingQuery } from "../redux/features/admin/adminApi";
import dayjs from "dayjs";

const BookingDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetABookingQuery(id);
  // Format "12:00" (string) to 12-hour format using dayjs
  const formatTime = (time: string) => {
    return dayjs(time, "HH:mm").isValid()
      ? dayjs(time, "HH:mm").format("hh:mm A")
      : "Invalid Time"; // Ensure it's valid before formatting
  };

  if (isLoading) {
    return (
      <p className="text-center text-lg font-medium animate-pulse">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-lg text-red-500">
        Something went wrong. Please try again later.
      </p>
    );
  }

  const {
    facility,
    user,
    date,
    startTime,
    endTime,
    payableAmount,
    paymentStatus,
    transactionId,
    isBooked,
  } = data?.data || {};
  console.log(user);

  return (
    <div className="lg:pl-72 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-6 pb-6">
          <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
            Booking Details
          </h1>
          <div className="w-full lg:w-[75%] mx-auto border border-gray-200 rounded-lg shadow-lg bg-gray-50">
            <div className="text-center p-6 bg-gray-100 rounded-t-lg">
              <img
                src={facility?.image || "https://via.placeholder.com/600x300"}
                alt={facility?.name || "Facility Image"}
                className="w-full max-w-[90%] mx-auto h-56 lg:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
            <table className="w-[90%] mx-auto divide-y divide-gray-200 text-sm mb-6">
              <tbody className="divide-y divide-gray-300">
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Facility :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {facility?.name || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Name :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {user?.name || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Email :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {user?.email || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Address :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {user?.address || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4 bg-gray-100">
                  <th className="font-semibold text-lg text-gray-700">
                    Date :
                  </th>
                  <td className="text-gray-600 text-lg">{date || "N/A"}</td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Start Time :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {formatTime(startTime) || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4 bg-gray-100">
                  <th className="font-semibold text-lg text-gray-700">
                    End Time :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {formatTime(endTime) || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Status :
                  </th>
                  <td
                    className={`text-lg ${
                      isBooked ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isBooked ? "Booked" : "Not Booked"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4 bg-gray-100">
                  <th className="font-semibold text-lg text-gray-700">
                    Payable Amount :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {payableAmount ? `$${payableAmount}` : "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4 bg-gray-100">
                  <th className="font-semibold text-lg text-gray-700">
                    Payment Status :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {paymentStatus || "N/A"}
                  </td>
                </tr>
                <tr className="flex justify-between p-4">
                  <th className="font-semibold text-lg text-gray-700">
                    Transaction ID :
                  </th>
                  <td className="text-gray-600 text-lg">
                    {transactionId || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
