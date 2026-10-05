import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import BlogForm from "../components/Form/BlogForm";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
  });

  const [editImagePreview, setEditImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`/v1/blogs/${id}`);

        const blog = response?.data?.requestedBlog;

        if (!blog) {
          throw new Error("Blog not found(fontend editblog");
        }

        setUserData({
          title: blog.title || "",
          description: blog.description || "",
          content: blog.content || "",
          image: null,
        });

        if (blog.image) {
          setEditImagePreview(blog.image || null);
        }
      } catch (error) {
        console.error("Error while fetching blog:", error);

        alert(error.response?.data?.message || "Unable to load the blog.");

        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", userData.title);
      formData.append("description", userData.description);
      formData.append("content", userData.content);

      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      const response = await api.patch(`/v1/blogs/${id}`, formData);

      console.log("UPDATE RESPONSE:", response.data);

      if (response.data?.success) {
        navigate(`/blog-details/${id}`);
        return;
      }

      alert(response.data?.message || "Failed to update blog post.");
    } catch (error) {
      console.error("Failed to update blog:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while updating the blog.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-semibold text-slate-600">
          Loading blog...
        </div>
      </div>
    );
  }

  return (
    <div>
      <BlogForm
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        userData={userData}
        setUserData={setUserData}
        navigate={navigate}
        editImagePreview={editImagePreview}
        setEditImagePreview={setEditImagePreview}
        isEditMode={true}
      />
    </div>
  );
};

export default EditBlog;
