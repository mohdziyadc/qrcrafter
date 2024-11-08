/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbxt.replicate.delivery",
      "replicate.delivery",
      "res.cloudinary.com",
      "pub-c39a57a5d64440d1a0abfeecdb85f452.r2.dev",
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
