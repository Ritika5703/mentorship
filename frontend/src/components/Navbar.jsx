import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isLoggedin, logout, user } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    navigate(`/profile`);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-[#388E3C] text-2xl font-bold">Mentor</span>
            <span className="text-[#FF9800] text-2xl font-bold">Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                color: isActive ? "#388E3C" : "#4B5563",
              })}
              className="font-medium hover:text-[#388E3C]"
            >
              Home
            </NavLink>
            <NavLink
              to="/all-mentors"
              style={({ isActive }) => ({
                color: isActive ? "#388E3C" : "#4B5563",
              })}
              className="font-medium hover:text-[#388E3C]"
            >
              All mentors
            </NavLink>

            <NavLink
              to="/contact-us"
              style={({ isActive }) => ({
                color: isActive ? "#388E3C" : "#4B5563",
              })}
              className="font-medium hover:text-[#388E3C]"
            >
              Contact us
            </NavLink>

            {isLoggedin && (
              <NavLink
                to="/notifications"
                style={({ isActive }) => ({
                  color: isActive ? "#388E3C" : "#4B5563",
                })}
                className="font-medium hover:text-[#388E3C]"
              >
                Notifications
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-[#388E3C] hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedin ? (
              <div className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={user.profilePicture || "/api/placeholder/50/50"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#388E3C] cursor-pointer hover:border-[#FF9800] transition duration-300"
                  />
                </div>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
                  >
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#388E3C] hover:bg-[#388E3C] hover:text-white px-6 py-2 rounded-full border-2 border-[#388E3C] transition duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-[#388E3C] text-white px-6 py-2 rounded-full hover:bg-[#2E7D32] transition duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-[#388E3C] bg-gray-50"
                      : "text-gray-600 hover:text-[#388E3C] hover:bg-gray-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/all-mentors"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-[#388E3C] bg-gray-50"
                      : "text-gray-600 hover:text-[#388E3C] hover:bg-gray-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                All mentors
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-[#388E3C] bg-gray-50"
                      : "text-gray-600 hover:text-[#388E3C] hover:bg-gray-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </NavLink>
              {isLoggedin && (
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-[#388E3C] bg-gray-50"
                        : "text-gray-600 hover:text-[#388E3C] hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications
                </NavLink>
              )}
            </div>

            {/* Mobile Auth Section */}
            {!isLoggedin ? (
              <div className="px-4 py-3 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center text-[#388E3C] border-2 border-[#388E3C] px-4 py-2 rounded-full hover:bg-[#388E3C] hover:text-white transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-[#388E3C] text-white px-4 py-2 rounded-full hover:bg-[#2E7D32] transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="px-4 py-3 border-t border-gray-100 space-y-1">
                <button
                  onClick={() => {
                    handleProfileClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-[#388E3C] hover:bg-gray-50"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
