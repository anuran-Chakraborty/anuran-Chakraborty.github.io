import path from 'path'

console.log(process.cwd())
export const POSTS_PATH = path.join(process.cwd(), 'posts');
export const DEFAULT_POST_FILE = 'index.md';