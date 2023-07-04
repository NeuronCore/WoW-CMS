require('dotenv').config({ path: '../.env' });

const nextConfig =
    {
        webpack(config)
        {
            config.module.rules.push({
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
                        }
                    ]
            },
        reactStrictMode: true,
        swcMinify: true
    };

module.exports = nextConfig;
