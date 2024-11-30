import { useParams } from "react-router-dom";
import { useGetAFacultyQuery } from "../redux/features/admin/adminApi";
import { FormEvent, useState } from "react";
import {
  useAddBookingsMutation,
  useCheckAvailabilityQuery,
} from "../redux/features/user/userApi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "sonner";

// Extend dayjs with the customParseFormat plugin
dayjs.extend(customParseFormat);

const Booking = () => {
  const { id } = useParams<{ id: string }>(); // Infer `id` from route params

  const { data, isLoading, error } = useGetAFacultyQuery(id as string);
  const [addBooking, { isLoading: bookingLoading }] =
    useAddBookingsMutation();

  // Manage date and availability state
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD")); // Default to today's date
  const [showAvailability, setShowAvailability] = useState(false);

  // Fetch availability based on selected date and faculty ID
  const { data: availabilityData, error: availabilityError } =
    useCheckAvailabilityQuery({
      facilityId: id,
      date: date,
    });

  // Handle form submission and set the date
  const handleCheckAvailability = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedDate = formData.get("date") as string;
    setDate(selectedDate);
    setShowAvailability(true);
  };

  // Handle booking form submission and log the data
  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedDate = formData.get("date") as string;
    const selectedTime = formData.get("time") as string;
    const [startTime, endTime] = selectedTime.split("-");
    const toastId = toast.loading("Add booking...");

    const res = (await addBooking({
      date: selectedDate,
      startTime,
      endTime,
      facility: id,
    })) as any;

    if (res?.error?.data) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Add booking successfully", { id: toastId });
      window.location.href = res?.data?.data?.payment_url;
      console.log(res?.data?.data?.payment_url);
    }
  };

  // Format "12:00" (string) to 12-hour format using dayjs
  const formatTime = (time: string) => {
    return dayjs(time, "HH:mm").isValid()
      ? dayjs(time, "HH:mm").format("hh:mm A")
      : "Invalid Time"; // Ensure it's valid before formatting
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const { image, location, name, pricePerHour } = data?.data || {};

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-center">Book Now</h1>
      <div className="w-[95%] lg:w-[60%] mx-auto bg-slate-100 shadow-lg p-6 mb-5 border-2 border-slate-200 rounded-lg">
        <h5 className="text-xl font-semibold mb-5">
          {name || "No Name Available"}
        </h5>
        <hr className="mb-5" />
        {image && (
          <img className="h-80 w-full mb-5 rounded-sm" src={image} alt={name} />
        )}
        <p className="text-xl mb-5 text-gray-800">
          Price Per Hour: ${pricePerHour || "N/A"}
        </p>
        <p className="text-xl mb-5 text-gray-800">
          Location: {location || "N/A"}
        </p>

        {/* Form for checking availability */}
        <form onSubmit={handleCheckAvailability}>
          <label className="text-xl font-bold" htmlFor="date">
            Check Availability
          </label>
          <br />
          <input
            className="mt-3 w-full h-8 border border-yellow-300 rounded-lg"
            type="date"
            name="date"
            required
            defaultValue={dayjs().format("YYYY-MM-DD")} // Default to today's date
            min={dayjs().format("YYYY-MM-DD")} // Disable dates before today
          />
          <br />
          <button
            className="mt-4 bg-pink-500 p-1 rounded-md text-gray-100"
            type="submit"
          >
            Check Availability
          </button>
        </form>

        {/* Conditionally render availability data */}
        {showAvailability && (
          <div className="mt-5">
            {(availabilityError as any)?.data?.success === false ? (
              <p className="w-full h-8 p-1 border">
                No available times for the selected date.
              </p>
            ) : (
              <div>
                <p className="w-full h-8 p-1 border">
                  This Time available on this date.
                </p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {availabilityData?.data?.map((data: any, index: any) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(data?.startTime) || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(data?.endTime) || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Booking form */}
        <form className="mt-3" onSubmit={handleBookingSubmit}>
          <label className="text-gray-600 font-semibold" htmlFor="date">
            📅 Select Date
          </label>
          <br />
          <input
            className="mt-1 mb-3 w-full h-8 border border-yellow-300 rounded-lg"
            type="date"
            name="date"
            required
            min={dayjs().format("YYYY-MM-DD")} // Disable dates before today
          />

          <label className="text-gray-600 font-semibold" htmlFor="time">
            ⏲️ Select Time
          </label>
          <br />
          <select
            className="mt-1 w-full h-10 border border-yellow-300 rounded-lg"
            name="time"
            required
          >
            {/* Default option (placeholder) */}
            <option value="" disabled selected>
              -- Select a Time slot --
            </option>
            <option value="08:00-10:00">08:00 AM - 10:00 AM</option>
            <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
            <option value="12:00-14:00">12:00 PM - 02:00 PM</option>
            <option value="14:00-16:00">02:00 PM - 04:00 PM</option>
            <option value="16:00-18:00">04:00 PM - 06:00 PM</option>
            <option value="18:00-20:00">06:00 PM - 08:00 PM</option>
          </select>

          <button
            className="mt-4 bg-blue-500 p-1 rounded-md text-gray-100"
            type="submit"
            disabled={bookingLoading}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
