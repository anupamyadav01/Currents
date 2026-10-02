import { useEffect, useRef, useState } from "react";

const BlogForm = ({
  isSubmitting,
  handleSubmit,
  userData,
  setUserData,
  navigate,
  isEditMode,

  editImagePreview,
  setEditImagePreview,
}) => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const validateImage = (file) => {
    if (!file) return false;

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG, or WEBP image.");
      return false;
    }

    // Maximum size = 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      return false;
    }

    return true;
  };

  const handleRemoveImage = () => {
    // Cleanup newly created blob URL
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    // Remove new image preview
    setImagePreview(null);

    // Remove existing image preview
    if (setEditImagePreview) {
      setEditImagePreview(null);
    }

    // Remove actual selected file
    setUserData((prev) => ({
      ...prev,
      image: null,
    }));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = "";
      return;
    }

    // Cleanup previous blob URL
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    // A new image is selected,
    // therefore old database image should no longer be displayed.
    if (setEditImagePreview) {
      setEditImagePreview(null);
    }

    // Store actual File object
    setUserData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview for newly selected image
    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ----------------------------------------
  // INPUT CHANGE
  // ----------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------
  // CURRENT IMAGE
  // ----------------------------------------

  const currentImage = imagePreview || editImagePreview;

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* ----------------------------------------
            HEADER
        ---------------------------------------- */}

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {isEditMode ? "Edit Blog" : "Add New Blog"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update your blog and save your changes."
                : "Share your story with the world."}
            </p>
          </div>

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

        {/* ----------------------------------------
            FORM CARD
        ---------------------------------------- */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
            {/* ========================================
                1. COVER IMAGE
            ======================================== */}

            <div>
              <label className="mb-2.5 block text-sm font-semibold text-slate-800">
                Cover Image{" "}
                <span className="text-xs font-normal text-slate-400">
                  (Recommended 16:9 ratio)
                </span>
              </label>

              {currentImage ? (
                <div className="group relative flex max-h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
                  {/* Image */}
                  <img
                    src={currentImage}
                    alt="Blog Cover Preview"
                    className="h-full max-h-80 w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    {/* Replace */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer rounded-lg bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-white"
                    >
                      Replace Image
                    </button>

                    {/* Remove */}
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
                  {/* Upload Icon */}
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

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                id="blog-image"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* ========================================
                2. BLOG TITLE
            ======================================== */}

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

            {/* ========================================
                3. DESCRIPTION
            ======================================== */}

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

            {/* ========================================
                4. FULL CONTENT
            ======================================== */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="content"
                  className="text-sm font-semibold text-slate-800"
                >
                  Full Content <span className="text-rose-500">*</span>
                </label>

                <span className="font-mono text-xs text-slate-400">
                  {userData.content?.length || 0} chars
                </span>
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

            {/* ========================================
                5. BUTTONS
            ======================================== */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    {/* Loading spinner */}
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    <span>{isEditMode ? "Updating..." : "Publishing..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update Post" : "Publish Post"}</span>

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
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
