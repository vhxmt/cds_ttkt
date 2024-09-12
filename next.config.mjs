/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'seee.hust.edu.vn',
            },
        ],
    },
};

export default nextConfig;
