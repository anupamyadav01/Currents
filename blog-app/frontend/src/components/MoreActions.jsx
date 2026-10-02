import { useEffect, useRef } from "react";

const MoreActions = ({
  isOpen,
  onClose,
  onCopyLink,
  onEditListInfo,
  onMakePublic,
  onHideResponses,
  onDeleteBlog,
}) => {
  const menuRef = useRef(null);

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
      className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-50 mt-2.5 w-44 rounded-md border border-zinc-100/80 bg-white py-2 text-[14px] text-zinc-600 shadow-[0_4px_20px_rgba(0,0,0,0.12)] duration-100 select-none"
    >
      {/* Top pointer arrow notch */}
      <div className="absolute -top-1.5 right-3.5 h-3 w-3 rotate-45 border-t border-l border-zinc-100/80 bg-white" />

      {/* Menu Options */}
      <div className="relative z-10 flex flex-col">
        <button
          type="button"
          onClick={() => handleAction(onCopyLink)}
          className="w-full cursor-pointer px-4 py-2 text-left transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          Copy link
        </button>

        <button
          type="button"
          onClick={() => handleAction(onEditListInfo)}
          className="w-full cursor-pointer px-4 py-2 text-left transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          Edit list info
        </button>

        <button
          type="button"
          onClick={() => handleAction(onMakePublic)}
          className="w-full cursor-pointer px-4 py-2 text-left transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          Make list public
        </button>

        <button
          type="button"
          onClick={() => handleAction(onHideResponses)}
          className="w-full cursor-pointer px-4 py-2 text-left transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          Hide responses
        </button>

        {/* Subtle separator */}
        <div className="my-1 border-t border-zinc-100" />

        {/* Delete blog button */}
        <button
          type="button"
          onClick={() => handleAction(onDeleteBlog)}
          className="w-full cursor-pointer px-4 py-2 text-left font-normal text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          Delete blog
        </button>
      </div>
    </div>
  );
};

export default MoreActions;
