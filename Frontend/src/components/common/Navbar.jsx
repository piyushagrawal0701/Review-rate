import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenu(false);
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();

    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/");
    }

    setMobileMenu(false);
  };

  return (
    <header>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="h-[70px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-700 flex items-center justify-center text-white font-bold">
              ★
            </div>

            <h1 className="text-2xl md:text-3xl font-light">
              Review<span className="text-purple-600">&</span>
              <span className="font-bold">RATE</span>
            </h1>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search company..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-[400px] h-[44px] border rounded-xl pl-4 pr-10"
            />

            <Search
              className="absolute right-3 top-3 text-purple-500"
              size={18}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm text-gray-600">
                  Hi <span className="font-semibold ml-1">{user?.name}</span>
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
                  className="px-5 py-2 rounded-xl border border-purple-500 text-purple-600"
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

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search */}
        {/* <div className="lg:hidden pb-3">
          <input
            type="text"
            placeholder="Search company..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full h-[44px] border rounded-xl px-4"
          />
        </div> */}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 gap-3">
            {user ? (
              <>
                <div className="font-medium">{user?.name}</div>
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
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-center py-3 border rounded-xl"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-center py-3 bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white rounded-xl"
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
