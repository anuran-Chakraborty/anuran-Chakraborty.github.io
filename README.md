This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It used tailwindcss for styling

## Adding posts to blog

1. Create a new markdown file in `posts/<suitable category>` directory. If no category is suitable then create a new folder and add the file. Tabs will be automatically created on the home page corresponding to each category. While naming directory replace spaces with `-`.
2. Create corresponding directory in `public/images` with the same name as the post under the category directory and add all images corresponding to the markdown file. For thumbnail the default file is `thumbnail.png` inside the corresponding folder (`category/post`), however the same may be overridden in the frontmatter of the corresponding post.
