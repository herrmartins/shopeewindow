/** @type {import('next').NextConfig} */
export const serverActions = {
  bodySizeLimit: '10mb',
};
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
