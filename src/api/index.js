import fs from "fs";
import path from "path";
import { POSTS_PATH, DEFAULT_POST_FILE } from "@/api/constants";
import matter from "gray-matter";

export const getPostPathFromSlug = (slug) => {
  const filePath = path.join(...slug.split("_"));
  const postPath = path.join(POSTS_PATH, filePath, DEFAULT_POST_FILE);
  return postPath;
};

/**
 * Function to read all the categories for the blog posts.
 * The current implementation assumes that each directory within the posts/ folder corresponds to a single category.
 */
export const readPostsByCategories = () => {
  const categories = fs.readdirSync(POSTS_PATH);
  let postsForAllCategories = [];
  categories.forEach((category) => {
    postsForAllCategories = [
      ...postsForAllCategories,
      ...readPostsInACategory(category),
    ];
  });
  return postsForAllCategories;
};

export const readPostsInACategory = (category) => {
  const postPath = path.join(POSTS_PATH, category);
  const postsInThisCategory = fs.readdirSync(postPath);
  const slugList = postsInThisCategory.map((post) => {
    const slug = `${category}_${post}`;
    return {
      category,
      slug,
      ...readFrontMatterAndContentForAPost(slug).frontMatter,
    };
  });
  slugList.sort((a, b) => new Date(b.date) - new Date(a.date));
  return slugList;
};

export const readFrontMatterAndContentForAPost = (slug) => {
  const postPath = getPostPathFromSlug(slug);
  if (!fs.existsSync(postPath)) {
    return null;
  }
  const postFile = fs.readFileSync(postPath, "");
  const { data: frontMatter, content } = matter(postFile);
  return { frontMatter, content };
};
