import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [userData, setUserData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", userData.title);
      formData.append("description", userData.description);
      formData.append("content", userData.content);

      if (userData.image) {
        formData.append("image", userData.image);
      }

      const url = id ? `/v1/blogs/${id}` : "/v1/blogs";
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // PATCH for update, POST for create
      const response = id
        ? await api.patch(url, formData, config)
        : await api.post(url, formData, config);

      if (
        response.data?.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        navigate("/");
      } else {
        alert(response.data?.message || "Failed to save blog post.");
      }
    } catch (err) {
      console.error(
        "Submission failed:",
        err.response?.data?.message || err.message,
      );
      alert(
        err.response?.data?.message ||
          "An unexpected error occurred while saving.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch blog data if editing an existing post
  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/v1/blogs/${id}`);
        const blog = response.data?.blog || response.data;

        setUserData({
          title: blog.title || "",
          description: blog.description || "",
          content: blog.content || "",
          image: null,
        });

        if (blog.imageUrl || blog.image) {
          setImagePreview(blog.imageUrl || blog.image);
        }
      } catch (error) {
        console.error(
          "Failed to load blog data:",
          error.response?.data?.message || error.message,
        );
        alert("Failed to load blog details.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [id, navigate]);

  // Clean up blob URLs to prevent browser memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Unified text input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Image file select handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setUserData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setUserData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-medium text-slate-500">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Navigation */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {id ? "Update Blog" : "Add New Blog"}
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 self-start text-sm font-medium text-slate-500 transition hover:text-slate-800 sm:self-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Editor Form Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
            {/* 1. Cover Image Section */}
            <div>
              <label className="mb-2.5 block text-sm font-semibold text-slate-800">
                Cover Image{" "}
                <span className="text-xs font-normal text-slate-400">
                  (Recommended 16:9 ratio)
                </span>
              </label>

              {imagePreview ? (
                <div className="group relative flex max-h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Blog Cover Preview"
                    className="h-full max-h-80 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer rounded-lg bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-white"
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="cursor-pointer rounded-lg bg-red-600 px-3.5 py-2 text-xs font-semibold text-white shadow transition hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50/30"
                >
                  <div className="mb-3 rounded-full bg-slate-100 p-3.5 text-slate-500 shadow-sm transition group-hover:bg-blue-100 group-hover:text-blue-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                    Click to upload cover image
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                id="blog-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* 2. Blog Title */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-800"
                >
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <span className="font-mono text-xs text-slate-400">
                  {userData.title?.length || 0} chars
                </span>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={userData.title}
                onChange={handleInputChange}
                placeholder="Give your story a catchy headline..."
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-base text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>

            {/* 3. Short Summary */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-800"
                >
                  Short Summary / Excerpt{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <span className="font-mono text-xs text-slate-400">
                  {userData.description?.length || 0} chars
                </span>
              </div>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={userData.description}
                onChange={handleInputChange}
                placeholder="A concise 1-2 sentence preview for search cards and previews..."
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-base leading-relaxed text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>

            {/* 4. Full Content */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="content"
                  className="text-sm font-semibold text-slate-800"
                >
                  Full Content <span className="text-rose-500">*</span>
                </label>
              </div>
              <textarea
                id="content"
                name="content"
                rows={12}
                value={userData.content}
                onChange={handleInputChange}
                placeholder="Write your complete story here..."
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-base leading-relaxed text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>

            {/* 5. Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {isSubmitting
                    ? "Publishing..."
                    : id
                      ? "Update Post"
                      : "Publish Post"}
                </span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
