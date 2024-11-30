import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0A1930] text-white py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              We Welcome Your Passion And Expertise
            </h2>
            <p className="text-lg mb-6">
              Join our empowering sports community today and grow with us.
            </p>
            <Link to={`/register`}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out">
                Join With Us
              </button>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="border-t border-white/20 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact us</h3>
              <p>Toll free Customer Care</p>
              <p className="font-medium">+017 123 456 78</p>
              <p className="mt-4">Need Live Support</p>
              <p className="font-medium">dreamsports@example.com</p>
              <div className="flex mt-6 space-x-4 items-center mb-3">
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  <img
                    src="https://freepnglogo.com/images/all_img/facebook-logo.png"
                    className="fab fa-facebook-f h-8"
                  ></img>
                </a>
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"
                    className="fab fa-twitter h-8"
                  ></img>
                </a>
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-200 "
                >
                  <img
                    src="https://i.ibb.co/C5QGMLV/a7c43d29cdb71e99b3de3d2537523f81-removebg-preview.png"
                    className="fab fa-instagram h-11 "
                  ></img>
                </a>
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  <img
                    src="https://i.ibb.co/R2hxQt8/linkedin-logo-blog-blogger-nadege-patisserie-twitter-blue-text-circle-png-clipart-removebg-preview.png"
                    className="fab fa-linkedin-in h-9"
                  ></img>
                </a>
              </div>
            </div>
            <hr className="sm:hidden flex" />
            <div className="mb-5 mt-5 lg:mt-0">
              <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <hr className="sm:hidden flex" />
            <div className="mb-5 mt-5 lg:mt-0">
              <h3 className="font-semibold text-lg mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <hr className="sm:hidden flex" />
            <div className="mb-5 mt-5 lg:mt-0">
              <h3 className="font-semibold text-lg mb-3">Other Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Coaches
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Sports Venue
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Join As Coach
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    Add Venue
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400 transition duration-200"
                  >
                    My Account
                  </a>
                </li>
              </ul>
            </div>
            <hr className="sm:hidden flex" />
            <div className="mb-5 mt-5 lg:mt-0">
              <h3 className="font-semibold text-lg mb-3">Our Locations</h3>
              <ul className="space-y-2">
                <li>Germany</li>
                <li>Russia</li>
                <li>France</li>
                <li>UK</li>
                <li>Colombia</li>
              </ul>
            </div>
            <hr className="sm:hidden flex" />
            <div className="mb-5 mt-5 lg:mt-0">
              <h3 className="font-semibold text-lg mb-3">Download</h3>
              <div className="mt-6">
                <img
                  className="mb-3"
                  src="https://dreamsports.dreamstechnologies.com/html/assets/img/icons/google-icon.svg"
                  alt="playStore.svg"
                />
                <img
                  src="https://dreamsports.dreamstechnologies.com/html/assets/img/icons/icon-apple.svg"
                  alt="appleStore.svg"
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 mt-12 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 DreamSports - All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button className="hover:text-gray-400 transition duration-200">
                English (US)
              </button>
              <button className="hover:text-gray-400 transition duration-200">
                $ USD
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
