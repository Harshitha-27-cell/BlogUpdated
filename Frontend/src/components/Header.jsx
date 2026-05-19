import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";
import { useState } from "react";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

   // console.log("current user", user);
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };
  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Logo */}
        <NavLink to="/" className={navBrandClass}>
          MyBlog
        </NavLink>

        <ul className={navLinksClass}>
          {/* Always visible */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 text-sm border-2 border-transparent bg-[#fff0f3] rounded-l-full focus:outline-none focus:border-[#ff0a54] text-[#4a0e28] placeholder:text-[#ff8fab] w-32 md:w-48 transition-all"
                  />
                  <button type="submit" className="bg-[#ff0a54] text-white px-3 py-1 text-sm rounded-r-full border-2 border-[#ff0a54] hover:bg-[#d90443] transition-colors">
                    Search
                  </button>
                </form>
              </li>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Profile
                </NavLink>
              </li>

              <li>
                <button className="bg-[#ff0a54] text-white font-bold px-4 py-1.5 rounded-full hover:bg-[#d90443] transition-colors text-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li>
                <img
                  src={user?.profileImageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-[#ffe5ec] object-cover hover:border-[#ff0a54] transition-all"
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
