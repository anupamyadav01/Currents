import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Blogs from "./pages/AllBlogs";
import BlogDetails from "./pages/BlogDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddBlog from "./pages/AddBlog";
import Error from "./pages/Error";
import { useEffect, useState } from "react";
import api from "./api/axios";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Shuru me checking state
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.get("/v1/me");

        dispatch(setCredentials({ user: res.data.user }));
      } catch (err) {
        dispatch(logout());
        console.log(err);
      } finally {
        setLoading(false); // Check complete hua
      }
    };
    restoreSession();
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-medium text-zinc-600">
        Checking session...
      </div>
    );
  }
  return (
    <div className="min-h-screen text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog-details/:blogId" element={<BlogDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-blog" element={<AddBlog />} />
          <Route path="/update-blog/:id" element={<AddBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
