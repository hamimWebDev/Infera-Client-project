

const HeroSection: React.FC = () => {
  
  return (
    <div className="relative bg-gradient-to-r from-teal-600 to-green-400 py-16 px-8 sm:px-16 md:px-24 lg:px-32 h-[630px] flex ">
      <div className=" mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-40">
        {/* Left Content */}
        <div className="lg:w-1/2 text-white">
          <h3 className="text-xl  font-semibold text-lime-200">
            World Class Sports Coaching & Premium Courts
          </h3>
          <h1 className="text-5xl font-bold mt-4">
            Choose Your <span className="text-lime-400">Facility</span> <br />
            And Start Your Training
          </h1>
          <p className="mt-4 text-lg">
            Unleash Your Athletic Potential with Expert Coaching,
            State-of-the-Art Facilities, and Personalized Training Programs.
          </p>
        </div>

        {/* Right Content - Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
          <img
            src="https://img.freepik.com/premium-photo/dynamic-3d-illustrated-sports-stadium-icons-app-interface-design_1326207-3021.jpg?w=1060" // Replace with your image path
            alt="Sports Court"
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
