import { posts as allPosts } from '../../.velite';


export const posts = allPosts.filter(post => !post.draft);

export const getPostById = (id: string) => posts.find(post => post.id === id);

export const getPostByShort = (short: string) => posts.find(post => post.short === short);

export const getPostsByTag = (tag: string) => posts.filter(post => post.tags.includes(tag));


export type { Post } from '../../.velite';
