import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const handleLogout = () => {
    logout();

    navigate("/login");

    setMobileMenu(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">

      <div className="max-w-[1250px] mx-auto px-4">

        <div className="h-[70px] flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-700 flex items-center justify-center text-white font-bold">
              ★
            </div>

            <h1 className="text-2xl md:text-3xl font-light">
              Review
              <span className="text-purple-600">
                &
              </span>
              <span className="font-bold">
                RATE
              </span>
            </h1>
          </Link>

          {/* Desktop Search */}

          <div className="hidden lg:block relative">

            <input
              type="text"
              placeholder="Search company..."
              className="w-[400px] h-[44px] border border-gray-300 rounded-xl pl-4 pr-12 outline-none focus:border-purple-500"
            />

            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500"
            />

          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <>
                <div className="text-sm text-gray-600">
                  Hi,
                  <span className="font-semibold ml-1">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl border border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-fuchsia-600 to-blue-700"
                >
                  Login
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="md:hidden"
          >
            {mobileMenu ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* Mobile Search */}

        <div className="lg:hidden pb-4">

          <div className="relative">

            <input
              type="text"
              placeholder="Search company..."
              className="w-full h-[44px] border border-gray-300 rounded-xl pl-4 pr-12"
            />

            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500"
            />

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (
        <div className="md:hidden border-t bg-white">

          <div className="flex flex-col p-4 gap-3">

            {user ? (
              <>
                <div className="font-medium">
                  {user?.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="w-full text-center py-3 rounded-xl border"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white"
                >
                  Login
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;