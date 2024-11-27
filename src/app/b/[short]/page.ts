import { permanentRedirect, redirect } from 'next/navigation';

import { getPostByShort } from '#content';


export default async function ShortRedirect({ params }: { params: Promise<{ short: string }> }) {
    const { short } = await params;
    const post = getPostByShort(short);

    if (post) {
        permanentRedirect(post.permalink);
    } else {
        redirect('/blog');
    }
}
