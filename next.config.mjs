/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwqmxfuyxdqtxrvneent.supabase.co",
      },
    ],
  },
};

export default nextConfig;
