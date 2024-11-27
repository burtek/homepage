import { permanentRedirect, redirect } from 'next/navigation';

import { getPostByShort, posts } from '#content';


export default async function ShortRedirect({ params }: { params: Promise<{ short: string }> }) {
    const { short } = await params;
    const post = getPostByShort(short);

    if (post) {
        permanentRedirect(post.permalink);
    } else {
        redirect('/blog');
    }
}

export function generateStaticParams() {
    return posts.map(post => post.short).filter(Boolean).map(short => ({ short }));
}
