import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="items-center w-screen ">
      <footer className="text-blueGray-700 transition duration-500 ease-in-out transform bg-white border rounded-lg ">
        <div className="flex flex-col flex-wrap justify-center p-5 md:flex-row">
          <nav className="flex flex-wrap items-center justify-center w-full mx-auto mb-6 text-base nprd">
            <Link
              to="/"
              className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
            >
              About
            </Link>
            <Link
              to="/rules"
              href="#"
              className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
            >
              Rules
            </Link>
          </nav>
          <span className="inline-flex justify-center w-full mx-auto mt-2 mr-2 sm:ml-auto sm:mt-0">
            <a className="text-blue-500 hover:text-black" href="ajst-facebook">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              className="ml-3 text-blue-500 hover:text-black"
              href="ajst-twitter"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              className="ml-3 text-blue-500 hover:text-black"
              href="ajst-instagram"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
        <div className="w-full px-8 mt-4 rounded-b-lg bg-blueGray-50">
          <div className="container inline-flex flex-col flex-wrap items-center px-5 py-6 mx-auto sm:flex-row">
            <p className="mx-auto text-sm text-center text-black sm:text-left ">
              {" "}
              Copyright Reserved © 2021{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
