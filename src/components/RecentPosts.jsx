import React from "react";
import PostCard from "./PostCard";
import { Tabs } from "flowbite-react";

const RecentPosts = ({ postsForAllCategories }) => {
  const categoryList = postsForAllCategories.map((post) => post.category);
  const uniqueCategoryList = [...new Set(categoryList)];
  const defaultCategory = uniqueCategoryList[1];

  return (
    <div className="container mx-auto">
      <Tabs.Group aria-label="Default tabs" style="underline">
        {uniqueCategoryList.map((uniqueCategory) => {
          const postsInThisCategory = postsForAllCategories.filter(
            (post) => post.category === uniqueCategory
          );

          return (
            <Tabs.Item
              active={defaultCategory == uniqueCategory}
              title={uniqueCategory.replace("-"," ").toUpperCase()}
            >
              <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8">
                {postsInThisCategory.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </Tabs.Item>
          );
        })}
      </Tabs.Group>
    </div>
  );
};

export default RecentPosts;
