import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const checkAuth = useAuth((state) => state.checkAuth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-api/articles`,
          { withCredentials: true }
        );
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    checkAuth(true); // Refresh the user's savedArticles state silently
    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  const isSaved = (articleId) => {
    return currentUser?.savedArticles?.includes(articleId);
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}

      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a54] to-[#ff477e] tracking-tight">
          Welcome, {currentUser?.firstName}!
        </h1>
        <p className="text-[#b07d92] mt-3 text-lg font-medium">Explore the latest articles below.</p>
      </div>

      {articles.length > 0 && (
        <div className={articleGrid}>
          {articles.map((articleObj) => (
            <div className={articleCardClass} key={articleObj._id}>
              <div className="flex flex-col h-full">
                {/* Top Content */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className={articleTitle}>{articleObj.title}</p>
                    {isSaved(articleObj._id) && <span title="Saved Article" className="text-[#FFD700] text-2xl drop-shadow-sm leading-none">★</span>}
                  </div>
                  <p>{articleObj.content.slice(0, 20)}...</p>
                  <p className={timestampClass}>
                    {formatDateIST(articleObj.createdAt)}
                  </p>
                </div>

                {/* Button at bottom */}
                <button
                  className={`${ghostBtn} mt-auto pt-4`}
                  onClick={() => navigateToArticleByID(articleObj)}
                >
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
