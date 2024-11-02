/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbxt.replicate.delivery",
      "replicate.delivery",
      "res.cloudinary.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
    serverActions: true,
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
