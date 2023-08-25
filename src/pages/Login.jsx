import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/logout"} />;

  return (
    <div className="max-w-[1250px] mx-auto h-screen-minus-header grid place-content-center text-gray-500">
      <section>
        <form onSubmit={submitHandler} className="w-96">
          <h1 className="text-3xl font-semibold mb-3 text-gray-900 text-center">
            Welcome back
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Welcome back! Please enter your details.
          </p>

          <label htmlFor="email" className="text-gray-700 text-sm block mb-1">
            Email*
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full border rounded-md px-3 text-gray-500 py-2 mb-5 outline-none"
          />

          <label
            htmlFor="password"
            className="text-gray-700 text-sm block mb-1"
          >
            Password*
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            className="w-full border rounded-md px-3 text-gray-500 py-2 mb-5 outline-none"
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-purple-600 p-2 text-white w-full rounded-md mt-1"
          >
            Log In
          </button>

          <div className="text-center mt-8 text-sm">
            <span className="text-gray-600 mr-2">Do not have an account?</span>
            <Link to="/register" className="text-purple-600">
              Sign up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
