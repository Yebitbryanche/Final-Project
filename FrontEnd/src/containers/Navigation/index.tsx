import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../types/images";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { api } from "../../API/Registration";
import type { UserProps } from "../../types/UserRead";
import type { CartResponse } from "../../pages/Cart";
import { HiSquaresPlus } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useCart } from "../../Context/Context";

function Navigation() {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProps | undefined>();
  const [cartItems, setCartItems] = useState<CartResponse | null>(null);
  const [error, setError] = useState("");
  const { cart } = useCart();

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
        console.log(error);
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

          <li>
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

          {/* Cart */}
          <li className="relative">
            <div className="absolute -top-2 -right-2 py-[2px] px-[6px] rounded-full bg-secondary text-white">
              {cart.length > 0 && <p className="text-xs">{cart.length}</p>}
            </div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-secondary hover:text-primary transition"
              }
            >
              <BsCart size={25} />
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
            className={
              user?.role
                ? `text-3xl cursor-pointer text-secondary hover:text-secondary/70`
                : `hidden`
            }
          >
            <HiSquaresPlus />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-primary "
          onClick={() => setIsOpen(true)}
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 bg-white w-3/4 max-w-xs shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
        >
          {/* Header with Logo & Close */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={images.logo} alt="Logo" className="w-[100px]" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gray-600 hover:text-primary"
            >
              <IoClose />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 px-6 py-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-secondary hover:text-primary"
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
                  : "text-secondary hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              Market
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary  font-semibold"
                  : "text-secondary hover:text-primary "
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>

            {/* Cart with badge */}
            <NavLink
              to="/cart"
              className="relative text-secondary hover:text-primary "
              onClick={() => setIsOpen(false)}
            >
              <BsCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-[1px] rounded-full">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3 px-6 mt-4">
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-white font-semibold rounded-md text-center hover:bg-primary/90 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-tertiary text-primary font-semibold rounded-md text-center hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
          </div>

          {/* Search */}
          <div className="flex items-center px-6 mt-6">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm"
            />
            <button className="px-3 py-3 bg-secondary text-white rounded-r-md hover:bg-primary/90 transition">
              <IoSearchSharp />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
