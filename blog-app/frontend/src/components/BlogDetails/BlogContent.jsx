const BlogContent = ({ paragraphs, fallbackText }) => {
  return (
    <section className="mx-auto max-w-[720px] font-serif text-[1.125rem] text-zinc-800 sm:text-[1.2rem] sm:leading-[1.9]">
      {paragraphs?.length > 0 ? (
        paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-7 whitespace-pre-line last:mb-0">
            {paragraph}
          </p>
        ))
      ) : (
        <p className="whitespace-pre-line text-zinc-500">
          {fallbackText || "This story does not contain any content yet."}
        </p>
      )}
    </section>
  );
};

export default BlogContent;
