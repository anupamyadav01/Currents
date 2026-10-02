import { useEffect, useState } from "react";
import api from "../api/axios";

const useBlogDetails = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ----------------------------------------
  // FETCH BLOG
  // ----------------------------------------

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setError("Invalid blog ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/v1/blogs/${blogId}`);

        const requestedBlog = response?.data?.requestedBlog;

        const blogData = Array.isArray(requestedBlog)
          ? requestedBlog[0]
          : requestedBlog;

        if (!blogData) {
          setBlog(null);
          setError("Story not found.");
          return;
        }

        setBlog(blogData);

        const likes = blogData?.like ?? blogData?.likes ?? [];

        setLikeCount(Array.isArray(likes) ? likes.length : 0);

        setIsLiked(Boolean(blogData?.isLiked));
      } catch (error) {
        console.error("Error fetching blog:", error);

        setBlog(null);

        if (error?.response?.status === 404) {
          setError("This story could not be found.");
        } else {
          setError("Something went wrong while loading this story.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // ----------------------------------------
  // LIKE
  // ----------------------------------------

  const handleLike = () => {
    setIsLiked((previousLiked) => {
      setLikeCount((previousCount) =>
        previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1,
      );

      return !previousLiked;
    });
  };

  // ----------------------------------------
  // BOOKMARK
  // ----------------------------------------

  const handleBookmark = () => {
    setIsBookmarked((previous) => !previous);
  };

  // ----------------------------------------
  // COPY LINK
  // ----------------------------------------

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // ----------------------------------------
  // MENU
  // ----------------------------------------

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return {
    blog,
    loading,
    error,

    isLiked,
    likeCount,

    isBookmarked,
    copied,

    isMenuOpen,

    handleLike,
    handleBookmark,
    handleCopyLink,

    toggleMenu,
    closeMenu,
  };
};

export default useBlogDetails;
