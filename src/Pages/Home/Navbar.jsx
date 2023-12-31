import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import "./Navbar.css";
import logo from "../../../src/assets/logo.png";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navLinks = (
    <>
      <li className="text-lg font-semibold">
        <NavLink to="/tasks">Tasks</NavLink>
      </li>

      <li className="text-lg font-semibold">
        <NavLink to="/addTask">Add Task</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    userLogout();
    navigate("/");
  };

  return (
    <div className="navbar bg-transparent" id="sidebar">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <div className="w-[60px]">
          <img src={logo} alt="" />{" "}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/DCghjvD/profile.jpg"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <p>{user.displayName}</p>
                </li>

                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
