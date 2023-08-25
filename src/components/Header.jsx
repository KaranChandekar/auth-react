import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
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

  return (
    <header className="header">
      <div>
        <h2>Untitled UI</h2>
      </div>
      <article>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </article>
    </header>
  );
};

export default Header;
