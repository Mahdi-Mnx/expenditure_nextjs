/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  serverExternalPackages: ["@supabase/supabase-js"],
  images: {
    domains: [
      "gfbgdcznzcegvutlncuv.supabase.co", // for Supabase Storage
      "lh3.googleusercontent.com", // for Google profile pictures
    ],
  },
};

module.exports = nextConfig;
