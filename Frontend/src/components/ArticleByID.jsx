import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(user?.savedArticles?.includes(id) || false);

  const emojis = ["👍", "❤️", "😂", "🔥", "👏", "🎉", "✨", "💯", "🤔", "🙌"];

  const toggleSaveArticle = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-api/article/${id}/save`,
        {},
        { withCredentials: true }
      );
      setIsSaved(res.data.isSaved);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save article");
    }
  };

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-api/article/${id}`,
          { withCredentials: true }
        );

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus
      ? "Restore this article?"
      : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg);
      } else {
        setError(msg || "operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const addComment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-api/article/${id}/comment`,
        { comment: newComment },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const shareArticle = async () => {
    const url = window.location.href;
    const shareData = {
      title: article?.title,
      text: `Check out this amazing article: ${article?.title}`,
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Article shared successfully!");
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase flex flex-wrap items-center gap-3`}>
          {article.title}
          {isSaved && <span title="Saved Article" className="text-[#FFD700] text-3xl drop-shadow-md pb-1">★</span>}
        </h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            ✍️ {article.author?.firstName || "Author"}
          </div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      <div className={articleContent}>{article.content}</div>

      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button
            className={editBtn}
            onClick={() => editArticle(article)}
          >
            Edit
          </button>

          <button
            className={deleteBtn}
            onClick={toggleArticleStatus}
          >
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}

      {user?.role === "USER" && (
        <div className="mt-8 flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#ffe5ec]">
          <h3 className="text-xl font-bold text-[#2d0a16]">Add a Comment</h3>
          
          <div className="flex gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setNewComment((prev) => prev + emoji)}
                className="text-2xl hover:scale-125 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Write your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-[#fff5f8] border-2 border-transparent rounded-2xl px-5 py-3.5 text-[#2d0a16] focus:outline-none focus:border-[#ff0a54] focus:bg-white transition-all shadow-inner"
            rows="3"
          />
          <button className="bg-gradient-to-r from-[#ff0a54] to-[#ff477e] text-white font-bold py-2.5 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all w-fit" onClick={addComment}>
            Post Comment
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={shareArticle}
          className="bg-white border-2 border-[#ff0a54] text-[#ff0a54] font-bold px-6 py-2.5 rounded-full hover:bg-[#fff0f3] hover:shadow-md transition-all cursor-pointer text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
          Share Article
        </button>

        {user?.role === "USER" && (
          <button
            onClick={toggleSaveArticle}
            className={`${isSaved ? 'bg-[#ff0a54] text-white' : 'bg-white text-[#ff0a54] border-[#ff0a54]'} border-2 font-bold px-6 py-2.5 rounded-full hover:shadow-md transition-all cursor-pointer text-sm flex items-center gap-2`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d={isSaved ? "M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" : "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"}/>
            </svg>
            {isSaved ? "Saved" : "Save Article"}
          </button>
        )}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#2d0a16] mb-6">Comments</h3>
        {article.comments?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {article.comments.map((comment, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-[#ffe5ec] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#ff0a54]">
                    {comment.user?.firstName || comment.user?.email || "Unknown User"}
                    {user?.role === "AUTHOR" && comment.user?.email && <span className="text-sm font-normal text-[#6e3b52] ml-2">({comment.user.email})</span>}
                  </p>
                  <p className="text-xs font-medium text-[#b07d92]">{comment.createdAt ? formatDate(comment.createdAt) : "Just now"}</p>
                </div>
                <p className="text-[#4a0e28] text-[0.95rem] leading-relaxed">{comment.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#b07d92] italic">No comments yet. Be the first to comment!</p>
        )}
      </div>

      <div className={articleFooter}>
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;