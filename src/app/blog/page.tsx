import { Suspense } from 'react';

import { posts } from '#content';

import { Blog } from './content';


interface Props {
    // params: Promise<{}>;
    searchParams: Promise<Partial<{ tag: string }>>;
}

export default async function BlogPage({ searchParams }: Props) {
    const { tag } = await searchParams;
    const filteredPosts = posts.filter(post => !tag || post.tags.includes(tag));

    return (
        <Suspense>
            <Blog posts={filteredPosts} />
        </Suspense>
    );
}
