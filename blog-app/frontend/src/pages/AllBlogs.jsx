import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { setBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/Home/BlogCard";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogsList = useSelector((state) => state.blogs.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/v1/blogs/");

        const blogsData = response.data;

        dispatch(setBlogs(blogsData.blogs));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  console.log("From Redux:", blogsList);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 text-gray-900 sm:px-6">
      <div className="relative flex max-w-6xl flex-col items-center justify-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          Stories
        </h1>

        <div className="max-w-4xl divide-zinc-100">
          {blogsList.map((post) => (
            <BlogCard key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
