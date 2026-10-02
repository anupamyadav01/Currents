import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import api from "../../api/axios"; // Central axios instance with withCredentials: true
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWriteBlog = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/create-blog");
  };

  // Logout Logic
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message,
      );
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
        isScrolled ? "px-4 pt-3" : "px-6 pt-5"
      }`}
    >
      <nav
        className={`relative flex w-full items-center justify-between transition-all duration-300 ${
          isScrolled ? "max-w-5xl px-5 py-2.5" : "max-w-6xl px-6 py-3.5"
        } rounded-[16px] border border-white/[0.12] bg-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7.5px]`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="group flex cursor-pointer items-center gap-3 select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4.5 w-4.5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-zinc-900">
            Scribe<span className="text-zinc-400">.</span>
          </span>
        </div>

        {/* CENTER NAV LINKS */}
        <div className="hidden items-center gap-1 rounded-full bg-black/[0.04] p-1 text-xs font-medium tracking-wide text-zinc-700 backdrop-blur-md sm:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-full px-4 py-1.5 transition-all hover:bg-white/60 hover:text-zinc-950 hover:shadow-xs"
          >
            Stories
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full px-4 py-1.5 transition-all hover:bg-white/60 hover:text-zinc-950 hover:shadow-xs"
          >
            Featured
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full px-4 py-1.5 transition-all hover:bg-white/60 hover:text-zinc-950 hover:shadow-xs"
          >
            Community
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2.5">
          {/* WRITE BLOG BUTTON */}
          <button
            onClick={handleWriteBlog}
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/40 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-200 hover:bg-white/70 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Write</span>
          </button>

          {/* AUTHENTICATION STATE */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* User Avatar Badge */}
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                title={user?.email || "User Profile"}
                className="group relative flex h-9 cursor-pointer items-center gap-2 rounded-full bg-white/35 py-1 pr-3 pl-1.5 shadow-xs backdrop-blur-md transition-colors select-none hover:bg-white/55"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white uppercase shadow-xs">
                  {user?.name?.[0] || "U"}
                </div>
                <span className="max-w-[70px] truncate text-xs font-medium text-zinc-800 sm:max-w-[100px]">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:text-zinc-950"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                type="button"
                className="cursor-pointer rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-full right-0 z-50 mt-2">
            <ProfileDropdown handleLogout={handleLogout} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
