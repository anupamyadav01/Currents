import {
  BadgeCheck,
  BookmarkPlus,
  Hand,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Star,
  ThumbsDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  console.log(post);

  return (
    <Link to={`/blog-details/${post?.blogId}`}>
      <article className="group relative my-3 cursor-pointer rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-150 ease-out hover:-translate-y-1 hover:border-zinc-900 hover:shadow-[0_4px_0_0_#18181b] active:translate-y-0 active:shadow-none sm:p-7">
        <div className="flex items-start justify-between gap-6 sm:gap-8">
          <div className="min-w-0 flex-1">
            {/* AUTHOR */}
            <div className="mb-3.5 flex items-center gap-2 text-xs text-zinc-600 sm:text-sm">
              {/* Avatar */}
              {post?.creator?.avatar ? (
                <img
                  src={post.creator.avatar}
                  alt={post?.creator?.name || "Author"}
                  className="h-8 w-8 rounded-full border border-zinc-200 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                  {post?.creator?.name?.[0] || "A"}
                </div>
              )}

              {/* Author name */}
              <span className="font-semibold text-zinc-900">
                {post?.creator?.name || "Anonymous"}
              </span>

              {/* Verified */}
              <BadgeCheck
                size={16}
                strokeWidth={2.5}
                className="fill-blue-500 text-white"
              />

              <span className="text-zinc-300">·</span>

              {/* Date */}
              <span className="text-zinc-400">
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "May 8"}
              </span>
            </div>

            {/* ================= BLOG CONTENT ================= */}
            <div>
              {/* Title */}
              <h2 className="line-clamp-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                {post?.title || "Untitled"}
              </h2>

              {/* Description */}
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {post?.description || "No description available."}
              </p>
            </div>

            {/* ================= BOTTOM ACTIONS ================= */}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
              {/* LEFT ACTIONS */}
              <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                {/* Star */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 transition-colors hover:text-amber-500"
                >
                  <Star size={16} strokeWidth={2} />
                  <span>{post?.likesCount ?? post?.likes?.length ?? 0}</span>
                </button>

                {/* Clap */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
                >
                  <Hand size={16} strokeWidth={2} />
                  <span>{post?.clapsCount ?? 0}</span>
                </button>

                {/* Comments */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  <span>{post?.commentsCount ?? 0}</span>
                </button>

                {/* Repost */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
                >
                  <Repeat2 size={17} strokeWidth={2} />
                  <span>{post?.repostsCount ?? 0}</span>
                </button>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3 text-zinc-400">
                <button
                  type="button"
                  className="transition-colors hover:text-zinc-900"
                >
                  <ThumbsDown size={17} strokeWidth={2} />
                </button>

                <button
                  type="button"
                  className="transition-colors hover:text-zinc-900"
                >
                  <BookmarkPlus size={17} strokeWidth={2} />
                </button>

                <button
                  type="button"
                  className="transition-colors hover:text-zinc-900"
                >
                  <MoreHorizontal size={18} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= BLOG IMAGE ================= */}
          {post?.image && (
            <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 sm:w-44">
              <img
                src={post.image}
                alt={post?.title || "Blog thumbnail"}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
