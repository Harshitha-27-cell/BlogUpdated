import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router"; // Use "react-router-dom" if "react-router" gives issues, but project seems to use "react-router"
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  pageWrapper,
  headingClass,
  subHeadingClass
} from "../styles/common.js";

function SearchArticles() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, checkAuth } = useAuth((state) => ({ currentUser: state.currentUser, checkAuth: state.checkAuth }));

  useEffect(() => {
    if (!query) {
      setArticles([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/common-api/articles/search/${query}`,
          { withCredentials: true }
        );
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Search failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth(true); // Refresh the user's savedArticles state silently
    fetchResults();
  }, [query]);

  const isSaved = (articleId) => {
    return currentUser?.savedArticles?.includes(articleId);
  };

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  return (
    <div className={pageWrapper}>
      <h2 className={`${headingClass} mb-8`}>
        Search Results for <span className={subHeadingClass}>"{query}"</span>
      </h2>

      {loading && <p className={loadingClass}>Searching...</p>}
      {error && <p className={errorClass}>{error}</p>}

      {!loading && !error && articles.length === 0 && query && (
        <div className={emptyStateClass}>
          No articles found matching "{query}". Try a different keyword!
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className={articleGrid}>
          {articles.map((article) => (
            <div key={article._id} className={articleCardClass}>
              <div className="flex flex-col h-full gap-3">
                <div className="flex items-start justify-between gap-2">
                  <p className={articleTitle}>{article.title}</p>
                  {isSaved(article._id) && <span title="Saved Article" className="text-[#FFD700] text-2xl drop-shadow-sm leading-none">★</span>}
                </div>
                <p className={`${articleExcerpt} break-words line-clamp-3 overflow-hidden`}>
                  {article.content.slice(0, 120)}...
                </p>
                <button
                  className={`${ghostBtn} mt-auto pt-4`}
                  onClick={() => openArticle(article)}
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

export default SearchArticles;
