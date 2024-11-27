'use server';
import { permanentRedirect, redirect } from 'next/navigation';

import { posts } from '#content';


export default async function ShortRedirect({ params }: { params: Promise<{ short: string }> }) {
    const { short } = await params;
    const post = posts.find(p => p.short === short);

    if (post) {
        permanentRedirect(post.permalink);
    } else {
        redirect('/blog');
    }
}
