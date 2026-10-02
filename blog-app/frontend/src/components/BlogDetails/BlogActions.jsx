import {
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";

import MoreActionsPopup from "./MoreActionsPopup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { removeBlog } from "../../features/blog/blogSlice";

const BlogActions = ({
  isLiked,
  likeCount,
  commentCount,
  isBookmarked,
  copied,
  isMenuOpen,
  onLike,
  onBookmark,
  onCopyLink,
  onToggleMenu,
  onCloseMenu,
}) => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      const response = await api.delete(`/v1/blogs/${blogId}`);
      // const data = response.data;
      if (response.data.sucsess) {
        dispatch(dispatch(removeBlog(blogId)));
      }
      navigate("/");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 py-4">
      {/* Left */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Like */}
        <button
          type="button"
          onClick={onLike}
          aria-label={isLiked ? "Unlike story" : "Like story"}
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950"
        >
          <Heart
            size={20}
            strokeWidth={1.8}
            className={`transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500" : "group-hover:scale-110"
            }`}
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
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Bookmark */}
        <button
          type="button"
          onClick={onBookmark}
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
          onClick={onCopyLink}
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

        {/* More menu */}
        <div className="relative">
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="More options"
            className="cursor-pointer rounded-full p-2 text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-950"
          >
            <MoreHorizontal size={20} strokeWidth={1.8} />
          </button>

          <MoreActionsPopup
            deleteBlog={deleteBlog}
            isOpen={isMenuOpen}
            onClose={onCloseMenu}
            onCopyLink={onCopyLink}
            onEditListInfo={() => console.log("Edit list clicked")}
            onMakePublic={() => console.log("Make public clicked")}
            onHideResponses={() => console.log("Hide responses clicked")}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogActions;
