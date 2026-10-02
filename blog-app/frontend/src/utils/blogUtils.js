export const getBlogContentData = (blog) => {
  const content = blog?.content?.trim() || "";

  const wordCount = content ? content.split(/\s+/).length : 0;

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const paragraphs = content
    ? content
        .split(/\r?\n\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return {
    content,
    wordCount,
    readTime,
    paragraphs,
  };
};

export const getCommentCount = (blog) => {
  const comments = blog?.comment ?? blog?.comments ?? [];

  return Array.isArray(comments) ? comments.length : (blog?.commentsCount ?? 0);
};

export const getAuthorData = (blog) => {
  const authorName = blog?.creator?.name || blog?.author?.name || "Anonymous";

  const authorAvatar = blog?.creator?.avatar || blog?.author?.avatar;

  const authorInitial = authorName?.charAt(0)?.toUpperCase() || "A";

  return {
    authorName,
    authorAvatar,
    authorInitial,
  };
};
