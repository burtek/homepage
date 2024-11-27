'use client';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { createSelector } from 'reselect';

import type { Post } from '#content';
import { posts } from '#content';
import { useMDX } from '#velite';

import { formatTime } from '../../dayjs';
import { Tags } from '../components/tag';

import styles from './blogpost.module.scss';


const getPost = createSelector(
    (data: Post[]) => data,
    (_: Post[], id: string) => id,
    (data, id) => data.find(p => p.id === id)
);

function BlogPost() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const post = getPost(posts, id);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Content } = useMDX(post?.code);

    useEffect(() => {
        if (!post) {
            router.push('/blog');
        }
    }, [post]);

    function renderTocEntry(tocItem: Post['toc'][number]) {
        return (
            <li key={tocItem.url}>
                <a href={tocItem.url}>
                    {tocItem.title}
                </a>
                {tocItem.items.length > 0 && <ol>{tocItem.items.map(renderTocEntry)}</ol>}
            </li>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <article className={styles.post}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.published}>
                {'Opublikowano: '}
                <time dateTime={post.created}>{formatTime(post.created)}</time>
                {post.created !== post.updated && (
                    <>
                        {', zaktualizowano: '}
                        <time dateTime={post.updated}>{formatTime(post.updated)}</time>
                    </>
                )}
            </p>
            <Tags
                tags={post.tags}
                className={styles.tags}
            />
            <article className={styles.toc}>
                <h2>Spis treści</h2>
                <ol>
                    {post.toc.map(renderTocEntry)}
                </ol>
            </article>
            <article className={styles.main}>
                <Content />
            </article>
        </article>
    );
}

export default function BlogPostPage() {
    return (
        <Suspense>
            <BlogPost />
        </Suspense>
    );
}
