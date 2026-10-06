import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useBlogDetails from "../hooks/useBlogDetails";
import BlogDetailsSkeleton from "../components/BlogDetails/BlogDetailsSkeleton";
import BlogNotFound from "../components/BlogDetails/BlogNotFound";
import BlogHeader from "../components/BlogDetails/BlogHeader";
import BlogActions from "../components/BlogDetails/BlogActions";
import BlogContent from "../components/BlogDetails/BlogContent";
import BlogFooter from "../components/BlogDetails/BlogFooter";
import BlogCoverImage from "../components/BlogDetails/BlogCoverImage";
import { getAuthorData, getBlogContentData } from "../utils/blogUtils";
import CommentBox from "../components/BlogDetails/CommentBox";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setComments } from "../features/comment/commentSlice";

const BlogDetails = () => {
  const { blogId } = useParams();
  const {
    blog,
    loading,
    error,
    copied,
    isMenuOpen,
    handleCopyLink,
    toggleMenu,
    closeMenu,
  } = useBlogDetails(blogId);
  const dispatch = useDispatch();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const toggleCommentBox = () => {
    setShowCommentBox((p) => !p);
  };
  // get all comments of this blog
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/v1/comments/${blogId}`);
        // console.log(response);

        dispatch(
          setComments({
            comments: response?.data?.comments,
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [blogId, dispatch]);

  if (loading) {
    return <BlogDetailsSkeleton />;
  }

  if (!blog) {
    return <BlogNotFound error={error} />;
  }

  const { paragraphs, readTime } = getBlogContentData(blog);
  const { authorName, authorAvatar, authorInitial } = getAuthorData(blog);

  return (
    <main
      className={`${showCommentBox ? "h-full w-full bg-white/40" : "min-h-screen border bg-white text-[#242424] antialiased"} `}
    >
      {showCommentBox ? <CommentBox toggleCommentBox={toggleCommentBox} /> : ""}
      {/* Top Navigation */}
      <nav className="mx-auto w-full max-w-[680px] px-5 pt-4 sm:pt-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-sm text-[#6b6b6b] transition-colors hover:text-[#242424]"
        >
          <ArrowLeft
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span>Back to stories</span>
        </Link>
      </nav>

      <article className="w-full pb-24">
        <header className="mx-auto max-w-[680px] pt-8">
          <BlogHeader
            blog={blog}
            readTime={readTime}
            authorName={authorName}
            authorAvatar={authorAvatar}
            authorInitial={authorInitial}
          />

          <div className="mt-8 border-y border-[#f2f2f2] py-2.5">
            <BlogActions
              blog={blog}
              toggleCommentBox={toggleCommentBox}
              copied={copied}
              isMenuOpen={isMenuOpen}
              onCopyLink={handleCopyLink}
              onToggleMenu={toggleMenu}
              onCloseMenu={closeMenu}
            />
          </div>
        </header>

        {blog.image && (
          <figure className="mx-auto my-10 w-full max-w-[720px] px-0 sm:px-5">
            <BlogCoverImage
              image={blog.image}
              title={blog.title}
              caption={blog.imageCaption}
            />
          </figure>
        )}
        <section className="mx-auto w-full">
          <BlogContent
            paragraphs={paragraphs}
            fallbackText={blog.description}
          />
        </section>

        <footer className="mx-auto mt-14 max-w-[680px] px-5">
          <div className="border-y border-[#f2f2f2] py-2.5">
            <BlogFooter
              onShare={handleCopyLink}
              onLike={() => {}}
              onComment={() => {}}
            />
          </div>
        </footer>
      </article>
    </main>
  );
};

export default BlogDetails;
