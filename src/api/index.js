import fs from "fs";
import path from "path";
import {
  POSTS_PATH,
  MARKDOWN_EXTENSION,
  DEFAULT_THUMBNAIL_PATH,
  DEFAULT_THUMBNAIL_FILE,
} from "@/api/constants";
import matter from "gray-matter";

export const getPostPathFromSlug = (slug) => {
  const filePath = path.join(...slug.split("_"));
  const postPath = path.join(POSTS_PATH, `${filePath}.${MARKDOWN_EXTENSION}`);
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
    const slug = `${category}_${post.slice(0, post.lastIndexOf("."))}`;
    return {
      category,
      slug,
      ...readFrontMatterAndContentForAPost(slug).frontMatter,
    };
  });
  let filteredSlugList = slugList.filter(
    (post) => post.published && post.published == true
  );
  filteredSlugList.sort((a, b) => new Date(b.date) - new Date(a.date));
  return filteredSlugList;
};

export const readFrontMatterAndContentForAPost = (slug) => {
  const postPath = getPostPathFromSlug(slug);
  if (!fs.existsSync(postPath)) {
    return null;
  }
  const postFile = fs.readFileSync(postPath, "");
  const { data: frontMatter, content } = matter(postFile);
  frontMatter["thumbnailImage"] = getThumbnailImageForPost(slug, frontMatter);
  return { frontMatter, content };
};

export const getThumbnailImageForPost = (slug, frontMatter) => {
  const thumbnailImagePath =
    frontMatter.thumbnailImage ??
    `/images/${slug.split("_").join("/")}/${DEFAULT_THUMBNAIL_FILE}`;
  if (fs.existsSync(`${process.cwd()}/public/${thumbnailImagePath}`)) {
    return thumbnailImagePath;
  }
  return DEFAULT_THUMBNAIL_PATH;
};
