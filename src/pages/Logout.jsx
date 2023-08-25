import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Logout = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="max-w-[1250px] mx-auto h-screen-minus-header grid place-content-center text-gray-500 px-4">
      <form onSubmit={logoutHandler} className="w-96">
        <button
          disabled={loading}
          type="submit"
          onClick={logoutHandler}
          className="bg-purple-600 p-2 text-white w-full rounded-md mt-1"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
