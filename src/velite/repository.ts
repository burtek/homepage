import { posts } from '../../.velite';


export const getPostById = (id: string) => posts.find(post => post.id === id);

export const getPostByShort = (short: string) => posts.find(post => post.short === short);

export const getPostsByTag = (tag: string) => posts.filter(post => post.tags.includes(tag));


export * from '../../.velite';
