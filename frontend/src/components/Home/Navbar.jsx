import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import api from "../../api/axios";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Subtle border shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
      setShowProfile(false);
      navigate("/login");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-neutral-200/90 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md"
          : "border-b border-neutral-200/60 bg-white"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo & Medium-style Search */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="group flex cursor-pointer items-center gap-2 select-none"
          >
            <span className="text-2.5xl font-serif font-black tracking-tighter text-neutral-900 transition-colors group-hover:text-black">
              Scribe<span className="font-sans text-emerald-600">.</span>
            </span>
          </div>

          {/* Search Bar (Medium style) */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search Scribe"
              className="h-9 w-44 rounded-full border border-transparent bg-neutral-100/90 pr-4 pl-9 text-[13px] text-neutral-800 placeholder-neutral-500 transition-all duration-300 focus:w-64 focus:border-neutral-300 focus:bg-white focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Write / Draft Story Button */}
          <button
            onClick={handleWriteBlog}
            type="button"
            className="group flex cursor-pointer items-center gap-2 text-neutral-600 transition-colors hover:text-neutral-900"
            title="Write a story"
          >
            <svg
              className="h-5 w-5 text-neutral-500 transition-transform duration-200 group-hover:scale-105 group-hover:text-neutral-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="text-sm font-normal">Write</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notification Bell */}
              <button
                type="button"
                className="relative text-neutral-500 transition-colors hover:text-neutral-900"
                title="Notifications"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                {/* Unread indicator dot */}
                <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-600 ring-2 ring-white" />
              </button>

              {/* Profile Avatar & Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfile((prev) => !prev)}
                  type="button"
                  className="flex cursor-pointer items-center gap-1 rounded-full p-0.5 focus:outline-none"
                  aria-expanded={showProfile}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.name || "User"}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-neutral-200"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <svg
                    className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 ${
                      showProfile ? "rotate-180 text-neutral-900" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfile && (
                  <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 mt-3 w-56 origin-top-right duration-150">
                    <ProfileDropdown handleLogout={handleLogout} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unauthenticated Links */
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => navigate("/our-story")}
                className="hidden text-sm text-neutral-600 transition-colors hover:text-neutral-900 md:block"
              >
                Our story
              </button>

              <button
                type="button"
                onClick={() => navigate("/membership")}
                className="hidden text-sm text-neutral-600 transition-colors hover:text-neutral-900 lg:block"
              >
                Membership
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-normal text-neutral-700 transition-colors hover:text-neutral-950"
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-95"
              >
                Get started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
