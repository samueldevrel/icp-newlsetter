import { Link } from "react-router-dom";
import { useAuth } from "../auth/authetication";
import { typescript2_backend } from "declarations/typescript2_backend";
import AuthButton from "../auth/authbutton";
const NavBar = () => {
  const { isAuthenticated, login, principal, logout } = useAuth();
  typescript2_backend.login_user().then((result) => {});
  return (
    <div className="">
      <div className="nav">
        <h1 className="">DAILY MAGAZINE</h1>
        <div className="">
          <Link to="/newsletter">latest Newsletter</Link>
          {isAuthenticated && (
            <>
              <Link to="/profile">Your profile</Link>
              <Link to="/create">Create newsletter</Link>
            </>
          )}
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
