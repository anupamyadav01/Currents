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

import {
  getAuthorData,
  getBlogContentData,
  getCommentCount,
} from "../utils/blogUtils";

const BlogDetails = () => {
  const { blogId } = useParams();

  const {
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
  } = useBlogDetails(blogId);

  if (loading) {
    return <BlogDetailsSkeleton />;
  }

  if (!blog) {
    return <BlogNotFound error={error} />;
  }

  const { paragraphs, readTime } = getBlogContentData(blog);
  const commentCount = getCommentCount(blog);
  const { authorName, authorAvatar, authorInitial } = getAuthorData(blog);

  return (
    <main className="min-h-screen bg-white text-[#242424] antialiased">
      {/* Top Navigation */}
      <nav className="mx-auto w-full max-w-[680px] px-5 pt-8 sm:pt-12">
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
        <header className="mx-auto max-w-[680px] px-5 pt-8">
          <BlogHeader
            blog={blog}
            readTime={readTime}
            authorName={authorName}
            authorAvatar={authorAvatar}
            authorInitial={authorInitial}
          />

          <div className="mt-8 border-y border-[#f2f2f2] py-2.5">
            <BlogActions
              isLiked={isLiked}
              likeCount={likeCount}
              commentCount={commentCount}
              isBookmarked={isBookmarked}
              copied={copied}
              isMenuOpen={isMenuOpen}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onCopyLink={handleCopyLink}
              onToggleMenu={toggleMenu}
              onCloseMenu={closeMenu}
            />
          </div>
        </header>

        {blog.image && (
          <figure className="mx-auto my-10 w-full max-w-[800px] px-0 sm:px-5">
            <div className="overflow-hidden">
              <BlogCoverImage
                image={blog.image}
                title={blog.title}
                className="w-full object-cover"
              />
            </div>
            {blog.imageCaption && (
              <figcaption className="mt-2 text-center text-xs tracking-tight text-[#6b6b6b]">
                {blog.imageCaption}
              </figcaption>
            )}
          </figure>
        )}
        <section className="mx-auto text-[16px] sm:text-[20px]">
          <BlogContent
            paragraphs={paragraphs}
            fallbackText={blog.description}
          />
        </section>

        <footer className="mx-auto mt-16 max-w-[680px] px-5">
          <div className="border-t border-[#f2f2f2] pt-6">
            <BlogFooter readTime={readTime} onShare={handleCopyLink} />
          </div>
        </footer>
      </article>
    </main>
  );
};

export default BlogDetails;
