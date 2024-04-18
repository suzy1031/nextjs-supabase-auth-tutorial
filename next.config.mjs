/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["bkjgerykolmgvrnhelrf.supabase.co"],
  },
};

export default nextConfig;
