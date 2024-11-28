/* eslint-disable no-undef */
// @ts-check


/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: { silenceDeprecations: ['legacy-js-api'] },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx']
};

const isDev = process.argv.includes('dev');
const isBuild = process.argv.includes('build');
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1';
    const { build } = await import('velite');

    // https://github.com/zce/velite/issues/262
    const { warn } = console;
    // eslint-disable-next-line no-console
    console.warn = (...args) => {
        warn(...args);
        if (typeof args[1] === 'string' && args[1].startsWith('issues:')) {
            if (args[1].split('\n').some(line => line.startsWith(' error '))) {
                if (!isDev) {
                    throw new Error('Schema validation failed');
                }
            }
        }
    };
    await build({ watch: isDev, clean: !isDev /* , strict: !isDev */ });
    // eslint-disable-next-line no-console
    console.warn = warn;
}

export default nextConfig;
