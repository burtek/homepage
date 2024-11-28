import type { FC, PropsWithChildren } from 'react';

import type { Post } from '#content';
import { useMDX } from '#velite';

import { Tags } from '../components/tag';

import styles from './blogpost.module.scss';
import { BlogPublishTime } from './published';


const Idea: FC<PropsWithChildren> = ({ children }) => <blockquote className={styles.idea}>{children}</blockquote>;
// eslint-disable-next-line @typescript-eslint/naming-convention
const mdxComponents = { Idea };

export function BlogPost({ post }: { post: Post }) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Content } = useMDX(post.code);

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

    return (
        <article className={styles.post}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.published}>
                <BlogPublishTime post={post} />
            </p>
            <Tags
                tags={post.tags}
                className={styles.tags}
            />
            {post.toc.length > 0 && (
                <article className={styles.toc}>
                    <h2>Spis treści</h2>
                    <ol>
                        {post.toc.map(renderTocEntry)}
                    </ol>
                </article>
            )}
            <article className={styles.main}>
                <Content components={mdxComponents} />
            </article>
        </article>
    );
}
