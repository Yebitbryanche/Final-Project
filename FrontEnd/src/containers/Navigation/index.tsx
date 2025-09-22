import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../types/images";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { api } from "../../API/Registration";
import type {UserProps }from "../../types/UserRead";
import type { CartResponse } from "../../pages/Cart";
import { useCart } from "../../Context/Context";
import { HiOutlineSquaresPlus, HiSquaresPlus } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";

function Navigation() {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProps | undefined>();
  const [cartItems, setCartItems] = useState<CartResponse | null>(null);
  const [error, setError] = useState("");
 

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setError("Failed to fetch user"));
  }, []);

    useEffect(() => {
      if (!user?.id) return;
  
      api
        .get(`/cart/${user.id}/view`)
        .then((res) => {
          setCartItems(res.data);
        })
        .catch((err: any) => {
          setError(err.message);
        });
    }, [user]);

  return (
    <nav className="shadow-md bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <Link to="/">
          <img
            className="w-[100px] md:w-[120px] object-contain"
            src={images.logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary transition"
              }
            >
              Brand New
            </NavLink>
          </li>
          <li className="p-5">
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
                  : "text-secondary font-medium hover:text-primary transition"
              }
            >
              Market
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary transition"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="relative p-5">
             <div className="absolute top-0 right-0 py-1 px-[6px] rounded-full bg-secondary text-white">{cartItems?.items.length === 0? null: <p className="text-xs">{cartItems?.items.length}</p>}</div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-secondary font-medium hover:text-primary transition"
              }
            >
             <BsCart size={25}/>
            </NavLink>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signup"
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border-2 border-tertiary text-sm cursor-pointer text-primary font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Log In
          </Link>

          {/* Search */}
          <div className="flex items-center ml-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm w-[200px]"
            />
            <button className="px-3 py-2 bg-secondary text-white rounded-r-md font-semibold hover:bg-secondary/90 transition">
              <IoSearchSharp size={21} />
            </button>
          </div>

          <Link
            to="/upload"
            className="text-3xl cursor-pointer text-secondary hover:text-secondary/70"
          >
            <HiSquaresPlus />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-6 py-4 bg-white shadow-md border-t border-gray-200">
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
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-tertiary text-primary font-semibold rounded-md hover:bg-gray-100 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="flex items-center mt-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm"
            />
            <button className="px-3 py-2 bg-primary text-white rounded-r-md font-semibold hover:bg-primary/90 transition">
              <IoSearchSharp />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
