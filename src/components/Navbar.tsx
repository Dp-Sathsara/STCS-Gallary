import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImageIcon, GridIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <ImageIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                MagicPhotos
              </span>
            </Link>
          </div>
          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                Dashboard
              </Link>
              <Link to="/gallery" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/gallery') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                Gallery
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none" title="Log out">
              <LogOutIcon className="h-6 w-6" />
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              {mobileMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/gallery" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/gallery') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </Link>
            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              Log out
            </button>
          </div>
        </div>}
    </nav>;
};
export default Navbar;