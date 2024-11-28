import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import rehypeSlug from 'rehype-slug';
import { defineConfig, s } from 'velite';


// import dictionaryPl from 'dictionary-pl';
// import remarkRetext from 'remark-retext';
// import retextLatin from 'retext-latin';
// import retextSpell from 'retext-spell';
// import { unified } from 'unified';

const isDev = process.argv.includes('dev');
// const isBuild = process.argv.includes('build');

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
            const date = stdout ? new Date(stdout) : new Date();
            return date.toISOString();
        });

// console.log(`Starting veliteJS${isBuild ? ' with spellchecking' : ''}`);
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
                    tocEnabled: s.boolean().optional(),

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
                    const [id] = data.slug.split('/').reverse();
                    return {
                        ...data,
                        id,
                        permalink: `/blog/${id}`
                    };
                })
        }
    },
    mdx: {
        // https://github.com/zce/velite/issues/261
        // remarkPlugins: [
        //     [
        //         remarkRetext,
        //         unified()
        //             .use(retextLatin)
        //             .use(retextSpell, dictionaryPl)
        //     ]
        // ],
        rehypePlugins: [rehypeSlug],
        development: isDev
    }
});
