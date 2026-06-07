/** @type {import('next').NextConfig} */

// For GitHub Pages "project" sites the app is served from /<repo-name>.
// Set NEXT_PUBLIC_BASE_PATH=/<repo-name> at build time (the deploy workflow does this).
// Leave it empty for local dev or a user/org site (username.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
