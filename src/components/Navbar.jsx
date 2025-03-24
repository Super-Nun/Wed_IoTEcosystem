import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    // กำหนดความกว้างตายตัว และให้สูงเต็มที่ด้วย h-full
    <div className="w-64 bg-gray-800 text-white h-auto">
      <nav className="p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded'
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded'
              }
            >
              Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
