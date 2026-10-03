import { Bookmark, MessageCircle, Play, Repeat2, Share } from "lucide-react";
import { SlLike } from "react-icons/sl";
const BlogFooter = ({
  likeCount = "16K",
  commentCount = "532",
  responseCount = "304",
  isLiked,
  isBookmarked,
  onLike,
  onComment,
  onBookmark,
  onShare,
}) => {
  return (
    <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
      {/* Left side: claps & responses */}
      <div className="flex items-center gap-5 sm:gap-6">
        <button
          type="button"
          onClick={onLike}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <SlLike
            size={18}
            className={isLiked ? "fill-[#242424] text-[#242424]" : ""}
          />
          <span className="text-[13px]">{likeCount}</span>
        </button>

        <button
          type="button"
          onClick={onComment}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span className="text-[13px]">{commentCount}</span>
        </button>

        <button
          type="button"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <Repeat2 size={18} strokeWidth={1.6} />
          <span className="text-[13px]">{responseCount}</span>
        </button>
      </div>

      {/* Right side: save, listen, share */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onBookmark}
          aria-label="Save story"
          className="rounded-full p-1.5 transition-colors hover:text-[#242424]"
        >
          <Bookmark
            size={18}
            strokeWidth={1.6}
            className={isBookmarked ? "fill-[#242424] text-[#242424]" : ""}
          />
        </button>

        <button
          type="button"
          aria-label="Listen to story"
          className="rounded-full p-1.5 transition-colors hover:text-[#242424]"
        >
          <Play size={18} strokeWidth={1.6} className="fill-[#6b6b6b]" />
        </button>

        <button
          type="button"
          onClick={onShare}
          aria-label="Share story"
          className="rounded-full p-1.5 transition-colors hover:text-[#242424]"
        >
          <Share size={18} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
};

export default BlogFooter;
