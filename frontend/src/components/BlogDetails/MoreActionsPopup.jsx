import { useEffect, useRef } from "react";
import useBlogDetails from "../../hooks/useBlogDetails";
import { useParams } from "react-router-dom";

const MoreActions = ({ isOpen, onClose, onMakePublic, onHideResponses }) => {
  const menuRef = useRef(null);
  const { blogId } = useParams();
  const { handleEditBlog, deleteBlog, handleCopyLink } = useBlogDetails(blogId);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAction = (callback) => {
    if (callback) callback();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-50 mt-2 w-48 rounded border border-[#f2f2f2] bg-white py-1.5 text-[13px] text-[#242424] shadow-[0_2px_10px_rgba(0,0,0,0.08)] select-none"
    >
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => handleAction(handleCopyLink)}
          className="w-full px-4 py-2 text-left transition-colors hover:bg-[#fafafa]"
        >
          Copy link
        </button>

        <button
          type="button"
          onClick={() => handleAction(handleEditBlog)}
          className="w-full px-4 py-2 text-left transition-colors hover:bg-[#fafafa]"
        >
          Edit story
        </button>

        <button
          type="button"
          onClick={() => handleAction(onMakePublic)}
          className="w-full px-4 py-2 text-left transition-colors hover:bg-[#fafafa]"
        >
          Make story public
        </button>

        <button
          type="button"
          onClick={() => handleAction(onHideResponses)}
          className="w-full px-4 py-2 text-left transition-colors hover:bg-[#fafafa]"
        >
          Hide responses
        </button>

        <div className="my-1 border-t border-[#f2f2f2]" />

        <button
          type="button"
          onClick={() => handleAction(deleteBlog)}
          className="w-full px-4 py-2 text-left text-[#c93b2b] transition-colors hover:bg-[#fafafa]"
        >
          Delete story
        </button>
      </div>
    </div>
  );
};

export default MoreActions;
