import { Link, useParams } from "react-router-dom";
import { useGetAFacultyQuery } from "../../redux/features/admin/adminApi";

const FacultyDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAFacultyQuery(id);

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

  const faculty = data?.data;

  if (!faculty) {
    return <p>No faculty details available.</p>;
  }

  const { image, name, description, location, pricePerHour } = faculty;

  return (
    <div className="pt-4">
      <div className="w-[90%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <img
          src={image}
          alt={`${name} image`}
          className="w-full h-60 lg:h-80 object-cover rounded-lg shadow-md"
        />

        {/* Information Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
          <p className="text-lg text-gray-600 mb-2">{description}</p>
          <p className="text-md text-gray-500 mb-4">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-xl font-semibold text-green-600 mb-6">
            Price per hour: ${pricePerHour}
          </p>
          <Link to={`/booking/${id}`}>
            <button className="bg-lime-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-lime-700 transition w-full">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Accordion Section for Amenities, Terms, and Reviews */}
      <div className="mt-8 w-[90%] mx-auto border rounded-lg mb-5">
        <div className="border-t border-b divide-y">
          {/* Amenities Section */}
          <details className="py-4 pl-3">
            <summary className="text-lg font-medium cursor-pointer">
              Facility Amenities
            </summary>
            <div className="mt-2 text-gray-600">
              <p>
                Our facility offers a wide range of amenities including free
                parking, fully equipped locker rooms with showers, and a
                comfortable lounge area where you can relax before or after your
                game. We also have a café on-site offering refreshments and
                light snacks.
              </p>
              <p className="mt-2">
                Additional features include Wi-Fi access, seating for
                spectators, and climate control to ensure comfort in all weather
                conditions.
              </p>
            </div>
          </details>

          {/* Booking Terms Section */}
          <details className="py-4 pl-3">
            <summary className="text-lg font-medium cursor-pointer">
              Booking Terms & Conditions
            </summary>
            <div className="mt-2 text-gray-600">
              <p>
                When booking a facility, please ensure you do so at least 24
                hours in advance. Cancellations must be made no less than 12
                hours prior to your booking time, or a cancellation fee will
                apply. Please respect the rules of the facility, including no
                smoking, no alcohol, and appropriate sports attire at all times.
                We reserve the right to refuse service to anyone not adhering to
                these rules.
              </p>
              <p className="mt-2">
                Payments must be made in full prior to your booking. Failure to
                do so may result in your booking being canceled.
              </p>
            </div>
          </details>

          {/* Reviews Section */}
          <details className="py-4 pl-3">
            <summary className="text-lg font-medium cursor-pointer">
              Reviews
            </summary>
            <div className="mt-2 text-gray-600">
              <p>
                <span className="text-lg font-semibold text-gray-800">
                  John Doe:
                </span>{" "}
                Had a fantastic time at this facility. The staff were friendly,
                and the amenities were top-notch!
              </p>
              <p className="mt-2">
                <span className="text-lg font-semibold text-gray-800">
                  Jane Smith:
                </span>{" "}
                Clean and well-maintained. I will definitely be booking again in
                the future.
              </p>
              <p className="mt-2">
                <span className="text-lg font-semibold text-gray-800">
                  David Lee:
                </span>{" "}
                A great experience, though the booking system could be a little
                more intuitive. Otherwise, fantastic!
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
