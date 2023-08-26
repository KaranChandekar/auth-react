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
    <div className="mx-auto h-screen-minus-header grid place-content-center text-white bg-gradient-to-b from-[#030003] from-40% to-[#6031BC] to-100%">
      <form onSubmit={logoutHandler} className="w-96">
        <button
          disabled={loading}
          type="submit"
          onClick={logoutHandler}
          className="bg-purple-600 p-2 font-semibold text-white w-full rounded-lg mt-1"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
