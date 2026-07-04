/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v9qoelznu6.ufs.sh",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
