import { BadgeCheck } from "lucide-react";

const BlogHeader = ({
  blog,
  readTime,
  authorName,
  authorAvatar,
  authorInitial,
}) => {
  return (
    <header>
      {/* Title */}
      <h1 className="max-w-4xl p-1 font-serif text-[2rem] leading-normal font-semibold tracking-[-0.035em] text-zinc-950 sm:text-5xl lg:text-[3rem]">
        {blog.title}
      </h1>

      {/* Description */}
      {blog.description && (
        <p className="mt-5 max-w-3xl px-4 font-sans text-lg leading-8 text-zinc-500 sm:text-lg sm:leading-8">
          {blog.description}
        </p>
      )}

      {/* Author section */}
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
  );
};

export default BlogHeader;
