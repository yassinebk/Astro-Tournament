import React from "react";
import { userState } from "../../store";
import { Link } from "react-router-dom";

interface PropType {
  variant: string;
}

const Navbar = ({ variant }: PropType) => {
  
  const logout = () => {
    localStorage.clear();
    userState(null)
  }
  

  console.log(variant);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Astro Tournament</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          {variant !== "ADMIN" && (
            <Link
              to={variant === "PLAYER" ? "/competition" : "/Signin"}
              className="mr-5 hover:text-gray-900"
            >
              {variant === "PLAYER" ? "Go back to Competition" : "Signin"}
            </Link>
          )}
          <Link
            to={variant === "ADMIN" ? "/dashboard" : "/About"}
            className="mr-5 hover:text-gray-900"
          >
            {variant === "ADMIN" ? "Dashboard" : "About"}
          </Link>

          <Link to="/Leaderboards" className="mr-5 hover:text-gray-900">
            Leaderboards
          </Link>
        </nav>
        {variant !== "NOAUTH" ? <button onClick={logout} className="bg-red-400 text-center text-white rounded-md">Logout</button> :
          <Link  to="/Signup" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Compete
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        }
      </div>
    </header>
  );
};

export default Navbar;
