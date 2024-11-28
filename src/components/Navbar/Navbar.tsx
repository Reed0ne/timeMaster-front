import React from 'react';
import { FaCog, FaUser, FaClock } from 'react-icons/fa';

function Navbar() {
  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="text-2xl font-bold flex items-center">
        <span className="mr-2 text-3xl"><FaClock /></span>
        TimeMaster
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-white text-lg">
          <FaCog />
        </button>
        <button className="text-white text-lg">
          <FaUser />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
