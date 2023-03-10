import React from "react";
import Link from "next/link";
import { MAX_DESCRIPTION_LENGTH } from "@/api/constants";

const PostCard = ({ post }) => {
  const thumbnailImageSource = post.thumbnailImage;

  return (
    <div className="overflow-hidden bg-white hover:shadow-2xl shadow-xl sm:rounded-lg">
      <Link href={`blog/${post.slug}`}>
        <div className="relative">
          <img
            src={thumbnailImageSource}
            alt="thumbnail"
          />
          <div className="px-4 pt-3 pb-1 sm:px-2">
            <h3 className="text-lg font-heading font-black leading-6 text-gray-900">
              {post.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm font-date text-gray-500">
              {new Date(Date.parse(post.date)).toDateString("dd/MM/yyyy")}
            </p>
            <div className="my-1 max-w-2xl text-md text-gray-500 text-justify">
              {`${post.description.slice(
                0,
                Math.min(post.description.length, MAX_DESCRIPTION_LENGTH)
              )}...`}
            </div>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Read More
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
