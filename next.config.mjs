/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "/next-app-for-test" : ""
};

export default nextConfig;
