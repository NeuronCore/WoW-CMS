require('dotenv').config({ path: '../.env' });
const webpack = require('webpack');

const nextConfig =
    {
        webpack(config)
        {
            config.module.rules.push({
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            });

            config.plugins.push(new webpack.EnvironmentPlugin(process.env));

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
                        }
                    ]
            },
        reactStrictMode: true,
        swcMinify: true
    };

module.exports = nextConfig;
