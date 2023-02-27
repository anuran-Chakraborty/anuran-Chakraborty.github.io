import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-2 sm:px-4 bg-gradient-to-br from-violet-500 to-indigo-700 sticky w-full z-20 top-0 left-0 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Anuran Chakraborty
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col bg-transparent border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link href="/" aria-current="page">
              <li className="block text-white p-4 bg-transparent hover:bg-indigo-800 text-white">
                Home
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
