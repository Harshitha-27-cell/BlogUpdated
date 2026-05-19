import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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

  const { currentUser } = useAuth((state) => ({
    currentUser: state.currentUser
  }));

  useEffect(() => {
    if (!query) {
      setArticles([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const url =
          `${import.meta.env.VITE_API_URL}/common-api/articles/search/${encodeURIComponent(query)}`;

        console.log("Search query:", query);
        console.log("API URL:", url);

        const res = await axios.get(url, {
          withCredentials: true
        });

        console.log("Response:", res.data);

        setArticles(res.data.payload || []);

      } catch (err) {
        console.log("FULL ERROR:", err);

        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Search failed"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

  }, [query]);

  const isSaved = (articleId) => {
    return currentUser?.savedArticles?.includes(articleId);
  };

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article
    });
  };

  return (
    <div className={pageWrapper}>
      <h2 className={`${headingClass} mb-8`}>
        Search Results for{" "}
        <span className={subHeadingClass}>
          "{query}"
        </span>
      </h2>

      {loading && (
        <p className={loadingClass}>
          Searching...
        </p>
      )}

      {error && (
        <p className={errorClass}>
          {error}
        </p>
      )}

      {!loading && !error && articles.length === 0 && query && (
        <div className={emptyStateClass}>
          No articles found matching "{query}"
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className={articleGrid}>
          {articles.map((article) => (
            <div
              key={article._id}
              className={articleCardClass}
            >
              <div className="flex flex-col h-full gap-3">

                <div className="flex justify-between">

                  <p className={articleTitle}>
                    {article.title}
                  </p>

                  {isSaved(article._id) && (
                    <span className="text-[#FFD700]">
                      ★
                    </span>
                  )}

                </div>

                <p className={articleExcerpt}>
                  {article.content?.slice(0,120)}...
                </p>

                <button
                  className={`${ghostBtn} mt-auto`}
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