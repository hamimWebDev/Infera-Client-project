import React, { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch} from "./redux/features/hooks";
import { useLoginMutation } from "./redux/features/auth/authApi";
import { verifyToken } from "./utils/verifyToken";
import { setUser } from "./redux/features/auth/authSlice";

const LoginRoute: React.FC = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [login, { isLoading }] = useLoginMutation();
  const Dispatch = useAppDispatch();
  const Navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tostId = toast.loading("Logging in...");
    try {
      const res = (await login({ email, password })) as any;
      const errorMessage = res.error?.data?.message;

      if (res?.error?.data) {
        toast.error(errorMessage, { id: tostId });
      } else {
        toast.success("Login Successfully", { id: tostId });
        const user = verifyToken(res?.data?.token);
        Dispatch(setUser({ user: user, token: res?.data?.token }));

        if (res?.data?.token) {
          setEmail("");
          setPassword("");
        }
        Navigate(`/${res?.data?.data?.role}/dashboard`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: tostId });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] lg:w-[70%] h-[90%] rounded-md ">
        <div>
          <img
            src="https://i.ibb.co.com/xCWKTF0/DALL-E-2024-10-27-19-56-29-A-modern-and-sleek-login-themed-image-showing-a-user-signing-in-on-a-webs.webp"
            alt=""
            className="w-full h-full"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg w-full ">
          <div className="flex items-center justify-between p-6 bg-blue-50 border-b rounded-t-lg">
            <h3 className="text-3xl font-semibold text-gray-900">Log in</h3>
            <img
              className="h-12"
              src="https://dreamsport.com/images/main-logo.png"
              alt="logo"
            />
          </div>
          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  minLength={7}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-3 mt-10 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c41.4 0 78.8-10.4 112.4-27.7l-28.1-22.3z" />
                    </svg>
                  )}
                </button>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full py-3 text-white font-medium rounded-lg text-lg transition duration-300 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  }`}
                >
                  {isLoading ? "Loading..." : "Login to your account"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
              Not registered?{" "}
              <Link to={`/register`}>
                <button className="text-blue-700 hover:underline dark:text-blue-500">
                  Create account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRoute;
