import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

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
          
          {/* Home */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? navLinkActiveClass
                  : navLinkClass
              }
            >
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? navLinkActiveClass
                      : navLinkClass
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? navLinkActiveClass
                      : navLinkClass
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) =>
                    isActive
                      ? navLinkActiveClass
                      : navLinkClass
                  }
                >
                  Profile
                </NavLink>
              </li>

              <li>
                <button
                  className="bg-[#ff0a54] text-white font-bold px-4 py-1.5 rounded-full hover:bg-[#d90443] transition-colors text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>

              <li>
                <img
                  src={
                    user?.profileImageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
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