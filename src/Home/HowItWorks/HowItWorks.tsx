import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const HowItWorks = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <section className="pt-20 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          How It <span className="text-green-500">Works</span>
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Simplifying the See your booking for Facilities, venues, and athletes.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-[#192335] text-gray-600 hover:text-white">
            <div className="p-4 mb-6 bg-green-100 rounded-full shadow-md">
              <img
                src="https://dreamsports.dreamstechnologies.com/html/assets/img/icons/work-icon1.svg"
                alt="Join Us Icon"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-3 ">Join Us</h3>
            <p className=" mb-8 text-center leading-relaxed ">
              Quick and easy registration to get started on our platform with a
              seamless account creation process.
            </p>
            <Link to={`/register`}>
              <button className="inline-flex items-center px-6 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-full hover:bg-green-700 hover:text-white transition-colors duration-300">
                Register Now &rarr;
              </button>
            </Link>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300  hover:bg-[#192335] text-gray-600 hover:text-white ">
            <div className="p-4 mb-6 bg-green-100 rounded-full shadow-md">
              <img
                src="https://dreamsports.dreamstechnologies.com/html/assets/img/icons/work-icon2.svg"
                alt="Select Facilities/Venues Icon"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              Select Facilities/Venues
            </h3>
            <p className=" mb-8 text-center leading-relaxed">
              Book badminton Facilities and venues for expert guidance and
              premium facilities.
            </p>
            <Link
              to={`/facilities`}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-full hover:bg-green-700 hover:text-white transition-colors duration-300"
            >
              Go To Facilities &rarr;
            </Link>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300  hover:bg-[#192335] text-gray-600 hover:text-white ">
            <div className="p-4 mb-6 bg-green-100 rounded-full shadow-md">
              <img
                src="https://dreamsports.dreamstechnologies.com/html/assets/img/icons/work-icon3.svg"
                alt="See your booking  Icon"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-semibold  mb-3">Booking </h3>
            <p className=" mb-8 text-center leading-relaxed">
              Easily book, pay, and enjoy a seamless experience on our
              user-friendly platform.
            </p>
            <Link
              to={`/${user?.role}/bookings`}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-full hover:bg-green-700 hover:text-white transition-colors duration-300"
            >
              See booking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
