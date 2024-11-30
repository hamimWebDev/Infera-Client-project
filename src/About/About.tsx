
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission Statement */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          Our Mission
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We aim to create a platform that empowers individuals and businesses
          by providing top-notch services and fostering community growth.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-10">
          Meet the Team
        </h2>
        <Marquee
          pauseOnHover
          speed={60}
          gradient={false}
          className="overflow-hidden p-8"
        >
          <div className="flex gap-8 px-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-slate-100 rounded-lg shadow-md hover:shadow-xl p-6 sm:p-8 transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full mx-auto mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 text-center">
                  {member.role}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* History & Milestones */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-10">
          Our Journey
        </h2>
        <ul className="space-y-8">
          {milestones.map((milestone) => (
            <li key={milestone.date} className="relative pl-8">
              <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="pl-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                  {milestone.date}
                </h3>
                <h4 className="text-md sm:text-lg font-bold text-gray-600">
                  {milestone.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-500 mt-2">
                  {milestone.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Information */}
      <section className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
          Feel free to reach out to us through any of the following:
        </p>
        <div className="mt-6 space-y-4 text-lg text-gray-700">
          <p>
            <span className="font-semibold">Office Address:</span> 123 Main
            Street, City, Country
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +123 456 7890
          </p>
          <p>
            <span className="font-semibold">Email:</span> info@platform.com
          </p>
        </div>
        <Link to={`/contact`} >
          <button className="mt-8 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300">
            Contact Us
          </button>
        </Link>
      </section>

    </div>
  );
};


// Example data for team members and milestones (can be replaced with API or state data)
const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "CEO",
    bio: "Jane has over 10 years of experience in the industry and leads the company with vision.",
    photo:
      "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    role: "CTO",
    bio: "John is responsible for the technological direction of the platform.",
    photo:
      "https://img.freepik.com/free-photo/business-concept-smiling-thoughtful-handsome-man-standing-white-isolated-background-touching-his-chin-with-hand_1258-80750.jpg",
  },
  // Add more team members here
];

const milestones = [
  {
    date: "2020",
    title: "Founded",
    description:
      "The organization was founded with the goal of providing innovative solutions.",
  },
  {
    date: "2021",
    title: "First Major Milestone",
    description:
      "We reached 10,000 users on our platform within the first year.",
  },
  {
    date: "2022",
    title: "Product Launch",
    description:
      "Launched our flagship product, gaining widespread recognition in the industry.",
  },
  {
    date: "2023",
    title: "Global Expansion",
    description:
      "Expanded operations to five new countries, establishing a global presence.",
  },
  {
    date: "2024",
    title: "Innovation Award",
    description:
      "Received an industry-leading innovation award for our cutting-edge solutions.",
  },
];


export default About;
