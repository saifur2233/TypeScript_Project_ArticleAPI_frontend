import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

type Props = {};
const NavBar = (props: Props) => {
  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/blogs">Blogs</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={Logo} width="40" alt="LogoImg" />
          <p className="font-bold">Article API</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {/* {user?.uid ? (
          <>
            <Link to="/dashboard" className="btn btn-warning">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
          </>
        )} */}
        <Link to="/login" className="btn btn-info">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
