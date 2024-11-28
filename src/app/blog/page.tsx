import type { Metadata } from 'next';
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
        : [...posts];

    const sortedPosts = filteredPosts
        .sort((post1, post2) => -post1.created.localeCompare(post2.created));

    return (
        <Suspense>
            <Blog posts={sortedPosts} />
        </Suspense>
    );
}

export async function generateMetadata(
    { searchParams }: Props
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { tag } = await searchParams;

    const title = 'Blog - Dtrw.ovh';
    return { title: tag ? `#${tag} - ${title}` : title };
}
