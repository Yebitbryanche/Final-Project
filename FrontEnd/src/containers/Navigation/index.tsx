import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../types/images";
import { RxHamburgerMenu } from "react-icons/rx";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md py-2 relative bg-white">
      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <img className="max-w-[120px]" src={images.logo} alt="Logo" />

        {/* Navigation Links */}
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary"
              }
            >
              Brand New
            </NavLink>
          </li>
          <li>
            <NavLink
              to="upload"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary"
              }
            >
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/market"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary"
              }
            >
              Market
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/signup" className="px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition">
            Sign Up
          </Link>
          <Link to="/login" className="px-3 py-1.5 border-2 border-tertiary text-sm pointer-cursur text-primary font-semibold rounded-md hover:bg-gray-100 transition">
            Log In
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center ml-6">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm"
          />
          <button className="px-3 py-2 bg-primary text-white rounded-r-md font-semibold hover:bg-primary/90 transition">
            Search
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden justify-between items-center px-4 py-2">
        {/* Logo */}
        <img className="max-w-[100px]" src={images.logo} alt="Logo" />

        {/* Search + Hamburger */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-[120px] sm:w-[160px] px-2 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm"
          />
          <button className="px-2 py-1 bg-primary text-white rounded-r-md font-semibold text-sm hover:bg-primary/90 transition">
            Search
          </button>

          <RxHamburgerMenu
            className="w-7 h-7 ml-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-2 px-4 py-4 bg-white shadow-md border-t border-gray-200 rounded-b-md animate-slide-down">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-secondary font-medium hover:text-primary"
            }
            onClick={() => setIsOpen(false)}
          >
            Brand New
          </NavLink>
          <NavLink
            to="/market"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-secondary font-medium hover:text-primary"
            }
            onClick={() => setIsOpen(false)}
          >
            Market
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-secondary font-medium hover:text-primary"
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-secondary font-medium hover:text-primary"
            }
            onClick={() => setIsOpen(false)}
          >
            Cart
          </NavLink>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <button className="px-3 py-1.5 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition">
              Sign Up
            </button>
            <button className="px-3 py-1.5 border-2 border-tertiary text-primary font-semibold rounded-md hover:bg-gray-100 transition">
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
