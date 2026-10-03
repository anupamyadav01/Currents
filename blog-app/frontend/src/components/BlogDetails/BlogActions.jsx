import {
  Bookmark,
  Check,
  MessageCircle,
  MoreHorizontal,
  Play,
  Repeat2,
  Share,
} from "lucide-react";
import MoreActionsPopup from "./MoreActionsPopup";
import useBlogDetails from "../../hooks/useBlogDetails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Like, { Dislike } from "../other/LikeIcon";

const BlogActions = ({
  commentCount = "25",
  responseCount = "3",
  isBookmarked,
  copied,
  isMenuOpen,
  onBookmark,
  onCopyLink,
  onToggleMenu,
  onCloseMenu,
}) => {
  const { blogId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(20);
  const { like, handleComment } = useBlogDetails(blogId);
  const handleLike = () => {
    setIsLiked((p) => !p);
  };

  return (
    <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
      {/* Left Actions: Claps, Comments, Responses */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Claps */}
        <button
          type="button"
          onClick={handleLike}
          className={`group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]`}
        >
          <span className="cursor-pointer">
            {isLiked ? <Like size={18} /> : <Dislike size={18} />}
          </span>

          <span className="text-[13px]">{likeCount}</span>
        </button>

        {/* Comments */}
        <button
          type="button"
          onClick={handleComment}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span className="text-[13px]">{commentCount}</span>
        </button>

        {/* Responses / Re-posts */}
        <button
          type="button"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <Repeat2 size={18} strokeWidth={1.6} />
          <span className="text-[13px]">{responseCount}</span>
        </button>
      </div>

      {/* Right Actions: Bookmark, Listen, Share, More */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Bookmark */}
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

        {/* Listen / Play */}
        <button
          type="button"
          aria-label="Listen to story"
          className="rounded-full p-1.5 transition-colors hover:text-[#242424]"
        >
          <Play size={18} strokeWidth={1.6} className="fill-[#6b6b6b]" />
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={onCopyLink}
          aria-label="Share story"
          className="relative rounded-full p-1.5 transition-colors hover:text-[#242424]"
        >
          {copied ? <Check size={18} /> : <Share size={18} strokeWidth={1.6} />}
          {copied && (
            <span className="absolute top-8 right-0 z-10 rounded-md bg-[#242424] px-2.5 py-1 text-xs whitespace-nowrap text-white shadow-md">
              Link copied
            </span>
          )}
        </button>

        {/* More Options */}
        <div className="relative">
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="More options"
            className="rounded-full p-1.5 transition-colors hover:text-[#242424]"
          >
            <MoreHorizontal size={18} strokeWidth={1.6} />
          </button>

          <MoreActionsPopup
            isOpen={isMenuOpen}
            onClose={onCloseMenu}
            onCopyLink={onCopyLink}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogActions;
