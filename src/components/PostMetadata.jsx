import React from "react";

const PostMetadata = ({ frontMatter }) => {
  return (
    <div className="mb-4">
      <div>
        <h2 className="mt-2 text-md font-date">{`Posted on ${new Date(
          frontMatter.date
        ).toDateString()}`}</h2>
        <h1 className="text-5xl mt-2 font-heading font-black">
          {frontMatter.title}
        </h1>
      </div>
    </div>
  );
};

export default PostMetadata;
