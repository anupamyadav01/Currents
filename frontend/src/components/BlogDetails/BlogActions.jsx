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
import Like, { Dislike } from "../other/LikeIcon";
import api from "../../api/axios";

import { likeBlog } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogActions = ({
  blog,
  responseCount = 0,
  isBookmarked,
  copied,
  isMenuOpen,
  onBookmark,
  onCopyLink,
  onToggleMenu,
  onCloseMenu,
  toggleCommentBox,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const blogs = useSelector((state) => state.blogs?.blogs) || [];
  // console.log(blogs);
  const commentsList = useSelector((state) => state?.comments?.comments);
  const currentBlog =
    blogs.find((item) => item._id === blog?._id) ||
    blogs.find((item) => item.blogId === blog?.blogId);

  const userId = currentUser?._id;
  const blogId = blog?.blogId || blog?._id;
  const isLiked = currentBlog?.like?.includes(userId) ?? false;

  const handleLike = async () => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    if (!blogId) {
      console.error("Blog ID is missing.");
      return;
    }
    dispatch(
      likeBlog({
        blogId,
        userId,
      }),
    );

    try {
      await api.post(`/v1/blogs/like/${blogId}`);
    } catch (error) {
      console.error("Failed to like the blog on server:", error);
      dispatch(
        likeBlog({
          blogId,
          userId,
        }),
      );
    }
  };

  return (
    <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
      {/* Left Actions */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Like */}
        <button
          type="button"
          onClick={handleLike}
          aria-label={isLiked ? "Unlike story" : "Like story"}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <span className="cursor-pointer">
            {isLiked ? <Dislike size={18} /> : <Like size={18} />}
          </span>

          <span className="text-[13px]">{currentBlog?.like?.length ?? 0}</span>
        </button>

        {/* Comments */}
        <button
          type="button"
          onClick={toggleCommentBox}
          aria-label="Comments"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <MessageCircle size={18} strokeWidth={1.6} />

          <span className="text-[13px]">{commentsList?.length || 0}</span>
        </button>

        {/* Responses / Reposts */}
        <button
          type="button"
          aria-label="Responses"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#242424]"
        >
          <Repeat2 size={18} strokeWidth={1.6} />

          <span className="text-[13px]">{responseCount}</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Bookmark */}
        <button
          type="button"
          onClick={onBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Save story"}
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
