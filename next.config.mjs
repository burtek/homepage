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
    await build({ watch: isDev, clean: !isDev });
}

export default nextConfig;
