import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./components/Home/Navbar";
import Blogs from "./pages/AllBlogs";
import BlogDetails from "./pages/BlogDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

import api from "./api/axios";
import { logout, setCredentials } from "./features/auth/authSlice";
import { setBlogs } from "./features/blog/blogSlice";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.get("/v1/me");
        const response = await api.get("/v1/blogs/");
        const blogsData = response.data;
        dispatch(setBlogs(blogsData.blogs || []));
        dispatch(setCredentials({ user: res.data.user }));
      } catch (err) {
        dispatch(logout());
        console.error("Session restore error:", err);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, [dispatch]);

  // Initial session restoration state with matching background and playful tone
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5]/60 px-4 text-center selection:bg-amber-200">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 shadow-md">
          <span className="animate-bounce text-2xl">☕</span>
          <div className="absolute -bottom-1 h-2 w-8 rounded-full bg-neutral-300/40 blur-xs" />
        </div>
        <p className="mt-4 font-serif text-sm font-semibold tracking-tight text-neutral-800">
          Warming up the printing press...
        </p>
        <span className="mt-1 text-xs text-neutral-500">
          Checking your credentials
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 text-neutral-900 antialiased selection:bg-amber-200 selection:text-neutral-900">
      <Navbar />
      <main className="w-full pb-16">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog-details/:blogId" element={<BlogDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:id" element={<EditBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
