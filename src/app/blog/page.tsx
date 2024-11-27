import { Suspense } from 'react';

import { getPostsByTag, posts } from '#content';

import { Blog } from './content';


interface Props {
    // params: Promise<{}>;
    searchParams: Promise<Partial<{ tag: string }>>;
}

export default async function BlogPage({ searchParams }: Props) {
    const { tag } = await searchParams;
    const filteredPosts = tag
        ? getPostsByTag(tag)
        : posts;

    return (
        <Suspense>
            <Blog posts={filteredPosts} />
        </Suspense>
    );
}
