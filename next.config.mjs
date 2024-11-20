/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',  // This section allows images from any domain 
          },
        ],
      },
}

export default nextConfig;
