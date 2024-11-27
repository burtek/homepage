'use client';
import type { Post } from '#content';

import { formatTime } from '../../dayjs';


export function BlogPublishTime({ post }: { post: Post }) {
    return (
        <>
            {'Opublikowano: '}
            <time dateTime={post.created}>{formatTime(post.created)}</time>
            {post.created !== post.updated && (
                <>
                    {', '}
                    <a href={`https://github.com/burtek/homepage/commits/master/src/content/posts/${post.id}`}>
                        zaktualizowano
                    </a>
                    {': '}
                    <time dateTime={post.updated}>{formatTime(post.updated)}</time>
                </>
            )}
        </>
    );
}
