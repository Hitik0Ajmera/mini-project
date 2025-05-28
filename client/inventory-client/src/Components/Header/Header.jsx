import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Inventory App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;