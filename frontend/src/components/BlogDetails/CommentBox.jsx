import { useState, useRef, useEffect } from "react";
import {
  X,
  ShieldAlert,
  ChevronDown,
  SendHorizontal,
  LoaderCircle,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { addComment, removeComment } from "../../features/comment/commentSlice";
import { toast } from "sonner";

const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  const diffMinutes = Math.floor((new Date() - new Date(dateString)) / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
};

// representing one comment
const SingleComment = ({ item, currentUser, onDelete, onUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.comment);
  const [likes, setLikes] = useState(
    item.likesCount ?? (item.likes?.length || 0),
  );
  const [isLiked, setIsLiked] = useState(
    item.isLiked || item.likes?.includes(currentUser?._id || currentUser?.id),
  );

  const menuRef = useRef(null);
  const isOwner =
    currentUser?._id === item.user?._id || currentUser?.id === item.user?.id;
  const commenterName = item.user?.name || "Anonymous";

  // Close dropdown on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  const handleLikeToggle = async () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
    try {
      await api.post(`/v1/comments/like/${item._id || item.id}`);
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(item._id || item.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="relative py-4">
      {/* Author Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {item.user?.avatar ? (
            <img
              src={item.user.avatar}
              alt={commenterName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e4e6b] text-xs font-semibold text-white">
              {commenterName[0]?.toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-semibold text-neutral-900">
                {commenterName}
              </h4>
              {isOwner && (
                <span className="rounded bg-neutral-100 px-1 py-0.5 text-[10px] text-neutral-500">
                  You
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-400">
              {formatRelativeTime(item.createdAt)}
            </span>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-1 text-neutral-400 hover:text-neutral-700"
          >
            <MoreHorizontal size={18} />
          </button>

          {isMenuOpen && (
            <div className="absolute top-8 right-0 z-30 w-36 rounded-xl border border-neutral-100 bg-white py-1.5 shadow-xl">
              <div className="absolute -top-1.5 right-2.5 h-3 w-3 rotate-45 border-t border-l border-neutral-100 bg-white" />
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Edit response
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(item._id || item.id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50"
              >
                Delete response
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comment Text or Inline Edit */}
      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm text-neutral-800 focus:outline-none"
            rows={2}
          />
          <div className="mt-2 flex justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-full px-3 py-1 text-neutral-500 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-neutral-900 px-3.5 py-1 text-white hover:bg-neutral-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap text-neutral-700">
          {item.comment}
        </p>
      )}

      {/* Action Buttons */}
      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
        <button
          type="button"
          onClick={handleLikeToggle}
          className={`flex items-center gap-1.5 transition-colors ${
            isLiked
              ? "font-medium text-blue-600"
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          <ThumbsUp
            size={15}
            className={isLiked ? "fill-blue-600 stroke-blue-600" : ""}
          />
          {likes > 0 && <span>{likes}</span>}
        </button>
        <button
          type="button"
          className="hover:text-neutral-900 hover:underline"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

// Main Box Component
const CommentBox = ({ closeCommentBox }) => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.user);
  const commentList = useSelector((state) => state.comments.comments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await api.post(`/v1/comments/${blogId}`, {
        comment: trimmed,
      });
      const newComment = res?.data?.newComment || res?.data;
      console.log(res.data.message);

      if (newComment) {
        toast.success(`${res.data.message}`);
        dispatch(addComment(newComment));
        setCommentText("");
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/v1/comments/${id}`);
      dispatch(removeComment(id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = async (id, updatedText) => {
    try {
      await api.put(`/v1/comments/${id}`, { comment: updatedText });
      dispatch(addComment(updatedText));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <aside className="fixed top-14 right-0 z-50 flex h-[calc(100vh-3.5rem)] w-full max-w-[420px] flex-col border-l border-neutral-200 bg-white shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-5">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Responses{" "}
          <span className="font-normal text-neutral-500">
            ({commentList.length})
          </span>
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <ShieldAlert size={19} />
          </button>
          <button
            type="button"
            onClick={closeCommentBox}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Comment Input */}
        <form
          onSubmit={handleAdd}
          className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 focus-within:bg-white"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7353ba] text-sm text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-sm font-semibold text-neutral-800">
              {user?.name || "Guest"}
            </span>
          </div>

          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) =>
              (e.ctrlKey || e.metaKey) && e.key === "Enter" && handleAdd(e)
            }
            placeholder="What are your thoughts?"
            className="mt-4 block w-full resize-none border-none bg-transparent p-0 text-sm focus:outline-none"
          />

          <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3">
            <span className="text-[11px] text-neutral-400">
              Ctrl/⌘ + Enter to submit
            </span>
            <button
              type="submit"
              disabled={!commentText.trim() || isSubmitting}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white disabled:bg-neutral-200"
            >
              {isSubmitting ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <SendHorizontal size={16} />
              )}
            </button>
          </div>
        </form>

        {/* Sort Controls */}
        <div className="mt-7 flex items-center justify-between">
          <div className="relative inline-flex items-center">
            <select className="cursor-pointer appearance-none bg-transparent pr-6 text-[11px] font-bold uppercase focus:outline-none">
              <option>MOST RECENT</option>
              <option>MOST RELEVANT</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-1 text-neutral-700"
            />
          </div>
        </div>

        {/* Comments List */}
        <div className="mt-4 divide-y divide-neutral-100">
          {commentList.length > 0 ? (
            commentList.map((item, index) => (
              <SingleComment
                key={item._id || item.id || index}
                item={item}
                currentUser={user}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <div className="py-12 text-center text-sm text-neutral-500">
              No responses yet. Be the first to share your thoughts.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CommentBox;
