import { useState } from "react";
import BlogForm from "../components/Form/BlogForm";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const response = await api.post("/v1/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success || response.status === 201) {
        navigate("/");
      } else {
        alert(response.data?.message || "Failed to create blog post.");
      }
    } catch (err) {
      console.error("Failed to save blog", err);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <BlogForm
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        setUserData={setUserData}
        userData={userData}
        navigate={navigate}
        isEditMode={false}
      />
    </div>
  );
};

export default CreateBlog;
