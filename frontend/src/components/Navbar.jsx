import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="nav-container">
        <div>
          <Link to="/">
            <h1>Workout App</h1>
          </Link>
        </div>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
