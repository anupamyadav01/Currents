import { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBlog } from "../features/blog/blogSlice";

const useBlogDetails = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // fetching blog details
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
        // console.log("requested blog: ", requestedBlog);

        if (!requestedBlog) {
          setBlog(null);
          setError("Story not found.");
          return;
        }
        setBlog(requestedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const deleteBlog = async () => {
    try {
      const response = await api.delete(`/v1/blogs/${blogId}`);
      // const data = response.data;
      if (response.data.sucsess) {
        dispatch(dispatch(removeBlog(blogId)));
      }
      navigate("/");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBlog = () => {
    console.log("we are here");

    navigate(`/update-blog/${blogId}`);
  };

  const handleBookmark = () => {
    console.log("Handle bookmark called...");
  };

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

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return {
    deleteBlog,
    blog,
    loading,
    error,
    copied,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleCopyLink,
    handleBookmark,
    handleEditBlog,
  };
};

export default useBlogDetails;
