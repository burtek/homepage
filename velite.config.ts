import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import rehypeSlug from 'rehype-slug';
import { defineConfig, s } from 'velite';


const execAsync = promisify(exec);
const timestamp = (type: 'created' | 'modified') =>
    s
        .custom<string | undefined>(i => i === undefined || typeof i === 'string')
        .transform<string>(async (value, { meta, addIssue }) => {
            const command = `git log --format=%cd ${type === 'created' ? '--reverse' : ''} ${meta.path} | head -n1`;
            if (value) {
                addIssue({ fatal: false, code: 'custom', message: '`s.timestamp()` schema will resolve the value from `git log` command' });
            }
            const { stdout } = await execAsync(command);
            return stdout ? new Date(stdout).toISOString() : '';
        });

export default defineConfig({
    root: 'src/content',
    collections: {
        posts: {
            name: 'Post',
            pattern: 'posts/*/index.mdx',
            schema: s
                .object({
                    title: s.string(),
                    short: s.slug('posts-short').optional(),
                    tags: s.array(s.string()),

                    created: timestamp('created'),
                    updated: timestamp('modified'),
                    slug: s.path(),
                    metadata: s.metadata(),
                    excerpt: s.excerpt(),
                    code: s.mdx(),
                    toc: s.toc(),
                    md: s.markdown()
                })
                .transform(data => {
                    const id = data.slug.split('/').at(-1);
                    return {
                        ...data,
                        id,
                        permalink: `/blog/${id}`
                    };
                })
        }
    },
    mdx: {
        rehypePlugins: [rehypeSlug],
        development: process.argv.includes('dev')
    }
});
