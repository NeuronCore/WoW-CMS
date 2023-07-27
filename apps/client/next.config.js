require('dotenv').config({ path: '../../.env' });
const nextTranslate = require('next-translate-plugin');

const nextConfig =
{
    webpack(config)
    {
        config.module.rules.push
        ({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images:
    {
        remotePatterns:
        [
            {
                protocol: 'https',
                hostname: 'wallpaper-mania.com',
                port: ''
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000'
            }
        ]
    },
    transpilePackages: ['../common'],
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextTranslate(nextConfig);
