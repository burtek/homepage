'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { posts } from '#content';

import { formatTime } from '../dayjs';

import styles from './blog.module.scss';
import { Tags } from './components/tag';


function Blog() {
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');

    return posts
        .filter(post => !tag || post.tags.includes(tag))
        .map(post => (
            <div
                key={post.slug}
                className={styles.post}
            >
                <Link href={post.permalink}>
                    <h2 className={styles.title}>{post.title}</h2>
                </Link>
                <p className={styles.date}>{formatTime(post.created)}</p>
                <p className={styles.excerpt}>{post.excerpt}...</p>
                <Tags tags={post.tags} />
            </div>
        ));
}

export default function BlogPage() {
    return (
        <Suspense>
            <Blog />
        </Suspense>
    );
}
