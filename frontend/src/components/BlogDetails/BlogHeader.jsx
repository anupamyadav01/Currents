import { Sparkles, Plus, BadgeCheck } from "lucide-react";

const BlogHeader = ({
  blog,
  readTime,
  authorName,
  authorAvatar,
  authorInitial,
}) => {
  // Fallback tags if not present in blog data
  const tags = blog.tags || [
    "Lifestyle",
    "Productivity",
    "Self",
    "Work Life Balance",
    "Philosophy",
  ];

  return (
    <header>
      {/* Member-only Story Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-normal text-[#6b6b6b]">
        <Sparkles size={13} className="fill-amber-500 text-amber-500" />
        <span>Member-only story</span>
      </div>

      {/* Topic Tags */}
      <div className="flex flex-wrap items-center gap-2 py-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#e6e6e6] bg-[#fafafa] px-3 py-1 text-xs text-[#242424] transition-colors hover:border-[#b3b3b3] hover:bg-white"
          >
            <span>{tag}</span>
            <Plus
              size={12}
              className="text-[#6b6b6b] transition-transform group-hover:rotate-90"
            />
          </button>
        ))}
      </div>

      {/* Title */}
      <h1 className="pt-2 font-sans text-[32px] leading-[1.18] font-bold tracking-[-0.025em] text-[#242424] sm:text-[40px] md:text-[44px]">
        {blog.title}
      </h1>

      {/* Subtitle / Description */}
      {blog.description && (
        <p className="pt-2 font-sans text-[20px] leading-relaxed font-normal text-[#6b6b6b]">
          {blog.description}
        </p>
      )}

      {/* Author Row */}
      <div className="flex items-center gap-3 pt-3">
        {/* Avatar */}
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={authorName}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#242424] text-xs font-medium text-white">
            {authorInitial}
          </div>
        )}

        {/* Info & Meta */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
          <div className="flex items-center gap-1">
            <span className="cursor-pointer font-medium text-[#242424] hover:underline">
              {authorName}
            </span>
            <BadgeCheck size={16} className="fill-[#1a8917] text-white" />
          </div>

          <button
            type="button"
            className="rounded-full border border-[#242424] px-3 py-0.5 text-xs font-normal text-[#242424] transition hover:bg-[#242424] hover:text-white"
          >
            Follow
          </button>

          <span className="text-[#6b6b6b]">·</span>

          <span className="text-[#6b6b6b]">{readTime} min read</span>

          <span className="text-[#6b6b6b]">·</span>

          <span className="text-[#6b6b6b]">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Aug 4, 2026"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
