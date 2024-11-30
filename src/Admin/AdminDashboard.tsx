import { useGetUserQuery } from "../redux/features/admin/adminApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/features/hooks";

const AdminDashboard = () => {
  const user = useAppSelector(useCurrentUser);

  // Call useGetUserQuery directly in the component
  const { data, isLoading } = useGetUserQuery(user?.userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const { createdAt, name } = data?.data;
  const userCreateTime = formatDate(createdAt);
  return (
    <div className="lg:ml-72">
      <div className="bg-purple-500 rounded-xl p-6 flex items-center justify-between w-[95%] mt-5 mx-auto">
        {/* Text section */}
        <div className="text-white">
          <p className="text-sm lg:text-lg mb-2">{userCreateTime}</p>
          <h1 className="text-xl lg:text-8xl font-bold">Welcome back,</h1>
          <h1 className="text-lg lg:text-4xl font-bold mb-3">{name}</h1>
          <p className="text-sm lg:text-lg mt-1">
            Always stay updated in your portal
          </p>
        </div>

        {/* 3D Character and icons */}
        <div className="relative">
          {data?.data?.profileImage === "" ? (
            <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              <img
                src="https://img.freepik.com/free-photo/3d-illustration-business-man-with-glasses-grey-background-clipping-path_1142-58140.jpg?t=st=1726101622~exp=1726105222~hmac=0a1b13a94c134dfbb2dec3b32a8d5b7d6bbdd9370e302d2b1dc7a654a244953e&w=740"
                alt="3D Character"
                className="w-28 lg:w-64 rounded-lg h-auto"
              />
            </button>
          ) : (
            <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              <img
                src={data?.data?.profileImage}
                alt="3D Character"
                className="w-28 lg:w-64 rounded-lg h-auto"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
