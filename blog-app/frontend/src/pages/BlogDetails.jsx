import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import api from "../api/axios";

const BlogDetails = () => {
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

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

        /*
         * Your current backend appears to return:
         *
         * {
         *   requestedBlog: [blog]
         * }
         *
         * So we safely support both:
         * requestedBlog: [...]
         * requestedBlog: {...}
         */
        const requestedBlog = response?.data?.requestedBlog;

        const blogData = Array.isArray(requestedBlog)
          ? requestedBlog[0]
          : requestedBlog;

        if (!blogData) {
          setBlog(null);
          setError("Story not found.");
          return;
        }

        setBlog(blogData);

        // Initial like state
        const likes = blogData?.like ?? blogData?.likes ?? [];

        setLikeCount(Array.isArray(likes) ? likes.length : 0);

        // If backend already tells us whether current user liked it
        setIsLiked(Boolean(blogData?.isLiked));
      } catch (error) {
        console.error("Error fetching blog:", error);

        setBlog(null);

        if (error?.response?.status === 404) {
          setError("This story could not be found.");
        } else {
          setError("Something went wrong while loading this story.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleLike = () => {
    setIsLiked((previousLiked) => {
      setLikeCount((previousCount) =>
        previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1,
      );

      return !previousLiked;
    });
  };

  const handleBookmark = () => {
    setIsBookmarked((previous) => !previous);
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

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
          {/* Back button skeleton */}
          <div className="mb-10 h-5 w-32 animate-pulse rounded bg-zinc-100" />

          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-100 sm:h-14" />
            <div className="h-10 w-4/5 animate-pulse rounded-lg bg-zinc-100 sm:h-14" />
          </div>

          {/* Description skeleton */}
          <div className="mt-6 space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-100" />
          </div>

          {/* Author skeleton */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-100" />

            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
              <div className="h-3 w-40 animate-pulse rounded bg-zinc-100" />
            </div>
          </div>

          {/* Image skeleton */}
          <div className="mt-10 h-72 w-full animate-pulse rounded-2xl bg-zinc-100 sm:h-[430px]" />

          {/* Content skeleton */}
          <div className="mt-10 space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-zinc-100" />
            <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
          </div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
            <span className="text-xl">📖</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {error || "Story not found"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            The story may have been removed or the link may no longer be valid.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            Back to stories
          </Link>
        </div>
      </main>
    );
  }

  const content = blog?.content?.trim() || "";

  const wordCount = content ? content.split(/\s+/).length : 0;

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const paragraphs = content
    ? content
        .split(/\r?\n\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  const comments = blog?.comment ?? blog?.comments ?? [];

  const commentCount = Array.isArray(comments)
    ? comments.length
    : (blog?.commentsCount ?? 0);
  console.log(blog);

  const authorName = blog?.creator?.name || blog?.author?.name || "Anonymous";

  const authorAvatar = blog?.creator?.avatar || blog?.author?.avatar;

  const authorInitial = authorName?.charAt(0)?.toUpperCase() || "A";

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-4xl px-5 pt-8 pb-24 sm:px-6 sm:pt-12 lg:px-8">
        {/* ========================================
            BACK NAVIGATION
        ======================================== */}
        <div className="mb-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to stories
          </Link>
        </div>

        {/* ========================================
            HEADER
        ======================================== */}
        <header>
          {/* Title */}
          <h1 className="max-w-4xl font-serif text-[2.5rem] leading-[1.08] font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl lg:text-[3.6rem]">
            {blog.title}
          </h1>

          {/* Description */}
          {blog.description && (
            <p className="mt-5 max-w-3xl font-sans text-lg leading-8 text-zinc-500 sm:text-xl sm:leading-8">
              {blog.description}
            </p>
          )}

          {/* ========================================
              AUTHOR
          ======================================== */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-b border-zinc-100 pb-7">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-zinc-200"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                  {authorInitial}
                </div>
              )}

              {/* Author info */}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-zinc-900">
                    {authorName}
                  </span>

                  <BadgeCheck size={16} className="fill-blue-500 text-white" />

                  <button
                    type="button"
                    className="ml-1 text-xs font-semibold text-zinc-900 transition-colors hover:text-blue-600"
                  >
                    Follow
                  </button>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently"}
                  </span>

                  <span>·</span>

                  <span>{readTime} min read</span>

                  {blog.draft && (
                    <>
                      <span>·</span>

                      <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                        Draft
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================
            ACTION BAR
        ======================================== */}
        <div className="flex items-center justify-between border-b border-zinc-100 py-4">
          {/* Left */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Like */}
            <button
              type="button"
              onClick={handleLike}
              aria-label={isLiked ? "Unlike story" : "Like story"}
              className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950"
            >
              <Heart
                size={20}
                strokeWidth={1.8}
                className={`transition-all duration-300 ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "group-hover:scale-110"
                } `}
              />

              <span>{likeCount}</span>
            </button>

            {/* Comments */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MessageCircle size={20} strokeWidth={1.8} />

              <span>{commentCount}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Bookmark */}
            <button
              type="button"
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark story"}
              className="rounded-full p-2 text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-950"
            >
              <Bookmark
                size={20}
                strokeWidth={1.8}
                className={isBookmarked ? "fill-zinc-900 text-zinc-900" : ""}
              />
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy story link"
              className="relative rounded-full p-2 text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-950"
            >
              {copied ? (
                <Check size={20} />
              ) : (
                <Share2 size={20} strokeWidth={1.8} />
              )}

              {copied && (
                <span className="absolute top-10 right-0 z-10 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg">
                  Link copied
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================
            COVER IMAGE
        ======================================== */}
        {blog.image && (
          <figure className="my-10 sm:my-12">
            <div className="group relative overflow-hidden rounded-xl bg-zinc-100 shadow-sm">
              <img
                src={blog.image}
                alt={blog.title || "Blog cover"}
                className="h-auto max-h-[560px] min-h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] sm:min-h-[400px]"
              />
            </div>
          </figure>
        )}

        {/* ========================================
            BLOG CONTENT
        ======================================== */}
        <section className="mx-auto max-w-[720px] font-serif text-[1.125rem] leading-[1.85] text-zinc-800 sm:text-[1.2rem] sm:leading-[1.9]">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-7 whitespace-pre-line last:mb-0">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="whitespace-pre-line text-zinc-500">
              {blog.description ||
                "This story does not contain any content yet."}
            </p>
          )}
        </section>

        {/* ========================================
            BOTTOM META
        ======================================== */}
        <footer className="mx-auto mt-14 max-w-[720px] border-t border-zinc-100 pt-8">
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>{readTime} min read</span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-zinc-950"
            >
              <Share2 size={16} />
              Share story
            </button>
          </div>
        </footer>
      </article>
    </main>
  );
};

export default BlogDetails;
