import { Link } from "react-router-dom";
import { Context, server } from "../main";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Logo from "../assets/logo.webp";

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

  // if (isAuthenticated) return <Navigate to={"/logout"} />;

  if (isAuthenticated) {
    window.location.href = "https://salk-ai-chatbot-ui.vercel.app/";
    return null;
  }

  return (
    <div className="mx-auto h-screen-minus-header grid place-content-center text-white bg-gradient-to-b from-[#030003] from-40% to-[#6031BC] to-100%">
      <section className="max-w-[1250px]">
        <form onSubmit={submitHandler} className="w-96">
          <div className="mb-6 w-full grid place-content-center">
            <img src={Logo} alt="SalkAI" className="w-14" />
          </div>
          <h1 className="text-3xl font-semibold mb-3 text-center">
            Welcome back
          </h1>
          <p className="mb-8 font-normal text-center">
            Enter your credentials to access your account
          </p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full border rounded-lg px-3 text-gray-500 py-2 mb-4 outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            className="w-full border rounded-lg px-3 text-gray-500 py-2 mb-4 outline-none"
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-purple-600 font-semibold p-2 text-white w-full rounded-lg mt-1"
          >
            Log In
          </button>

          <div className="text-center mt-8 text-sm">
            <span className="font-normal mr-2">
              Don&apos;t have an account?
            </span>
            <Link to="/" className="font-semibold">
              Sign up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
