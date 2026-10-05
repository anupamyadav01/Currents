import {
  BadgeCheck,
  BookmarkPlus,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Like from "../other/LikeIcon";

const BlogCard = ({ post }) => {
  function handleActionClick(e, callback) {
    e.preventDefault();
    e.stopPropagation();
    if (callback) callback();
  }

  return (
    <Link to={`/blog-details/${post?.blogId}`} className="group relative block">
      <article className="relative overflow-hidden rounded-2xl border border-transparent p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-neutral-300/80 hover:bg-amber-50/30 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.08)] active:translate-y-0 active:shadow-xs sm:p-5">
        <span className="pointer-events-none absolute inset-y-2 left-0 w-1 scale-y-0 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-y-100" />

        <div className="flex items-start justify-between gap-5 sm:gap-7">
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs text-neutral-600 sm:text-[13px]">
              {/* Avatar */}
              {post?.creator?.avatar ? (
                <img
                  src={post.creator.avatar}
                  alt={post?.creator?.name || "Author"}
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-neutral-200 transition-transform duration-200 group-hover:ring-neutral-400"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white transition-colors duration-200 group-hover:bg-amber-500">
                  {post?.creator?.name?.[0]?.toUpperCase() || "A"}
                </div>
              )}

              {/* Author name */}
              <span className="font-semibold text-neutral-900 transition-colors group-hover:text-black">
                {post?.creator?.name || "Anonymous Scribe"}
              </span>

              {/* Verified Badge */}
              <BadgeCheck
                size={14}
                strokeWidth={2.5}
                className="fill-blue-500 text-white"
              />

              <span className="text-neutral-300">·</span>

              {/* Date */}
              <span className="text-neutral-500">
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently"}
              </span>
            </div>

            {/* BLOG TEXT */}
            <div>
              <h2 className="relative inline-block font-serif text-lg font-bold tracking-tight text-neutral-950 transition-colors duration-200 group-hover:text-amber-950 sm:text-lg md:text-xl">
                {post?.title || "Untitled Thought"}
              </h2>

              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-600 transition-colors duration-200 group-hover:text-neutral-700 sm:text-[15px]">
                {post?.description ||
                  "No excerpt provided. A mystery worth clicking."}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-1 text-xs text-neutral-500">
              {/* Left Action Counters */}
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Claps */}
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md py-1 transition-all duration-150 hover:scale-105 hover:text-amber-700"
                  title="Clap"
                >
                  <Like size={18} />
                  <span className="font-medium">{post?.like.length}</span>
                </button>

                {/* Comments */}
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md py-1 transition-all duration-150 hover:scale-105 hover:text-amber-700"
                  title="Responses"
                >
                  <MessageCircle
                    size={18}
                    strokeWidth={1.8}
                    className="text-black transition-colors group-hover:text-neutral-700"
                  />
                  <span className="font-medium">
                    {post?.commentsCount ?? 0}
                  </span>
                </button>

                {/* Repost */}
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e)}
                  className="hidden cursor-pointer items-center gap-1.5 rounded-md py-1 transition-all duration-150 hover:scale-105 hover:text-amber-700 sm:flex"
                  title="Reshare"
                >
                  <Repeat2
                    size={21}
                    strokeWidth={1.8}
                    className="text-black transition-colors group-hover:text-neutral-700"
                  />
                  <span className="font-medium">{post?.repostsCount ?? 0}</span>
                </button>
              </div>

              {/* Right Utility Buttons */}
              <div className="flex items-center gap-2 text-neutral-400 sm:gap-3">
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e)}
                  className="cursor-pointer p-1 transition-all duration-150 hover:scale-110 hover:text-neutral-900"
                  title="Bookmark"
                >
                  <BookmarkPlus size={18} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleActionClick(e)}
                  className="cursor-pointer p-1 transition-all duration-150 hover:scale-110 hover:text-neutral-900"
                  title="More options"
                >
                  <MoreHorizontal size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {post?.image && (
            <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100 shadow-2xs transition-all duration-300 group-hover:border-neutral-300 group-hover:shadow-md sm:w-36 md:w-44">
              <img
                src={post.image}
                alt={post?.title || "Story thumbnail"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
