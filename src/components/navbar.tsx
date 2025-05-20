"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated by looking for token
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    // Close profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsProfileMenuOpen(false);
    window.location.href = "/home";
  };

  const ProfileButton = () => (
    <div className="relative" ref={profileMenuRef}>
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 px-4 py-2"
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ease-in-out ${
          isProfileMenuOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-2"
        }`}
      >
        <Link
          href="/dashboard/patient"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsProfileMenuOpen(false)}
        >
          View Profile
        </Link>
        <Link
          href="/appointments"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsProfileMenuOpen(false)}
        >
          My Appointments
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );

  const AuthButtons = () => (
    <>
      <li>
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 px-4 py-2"
        >
          Log In
        </Link>
      </li>
      <li>
        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md active:transform active:scale-95"
        >
          Sign Up
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-gradient-to-r from-white to-blue-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/home" className="flex items-center group">
            <span className="text-blue-600 text-2xl font-bold tracking-tight group-hover:text-blue-700 transition-colors duration-200">
              Doc-Genie
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  href="/home"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/home")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/doctors")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/about")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/contact")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <ProfileButton />
                </li>
              ) : (
                <AuthButtons />
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } mt-4 pb-4`}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/home"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/home")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/doctors")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Find Doctors
            </Link>
            <Link
              href="/about"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/about")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/contact")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard/patient"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm text-center transition-colors duration-200 py-2"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/appointments"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm text-center transition-colors duration-200 py-2"
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-medium text-sm text-center transition-colors duration-200 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm text-center transition-colors duration-200 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium text-center transition-all duration-200 hover:shadow-md active:transform active:scale-95"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
