

const FacilitiesGrid = () => {
  return (
    <div className="pt-20">
      <div className="mb-5">
        <h1 className="text-center text-xl lg:text-4xl font-bold mb-2 lg:mb-5 text-slate-800">
          Featured <span className="text text-[#085A6C]">Venues</span>
        </h1>
        <h6 className="text-center text-[11px] lg:text-xl font-semibold text-[#6b7385]">
          Advanced sports venues offer the latest facilities, dynamic and unique
          <br />
          <p className="mt-1">
            environments for enhanced badminton performance.
          </p>
        </h6>
      </div>
      <FacultyCard />
    </div>
  );
};

export default FacilitiesGrid;
