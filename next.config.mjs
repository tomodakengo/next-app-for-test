/** @type {import('next').NextConfig} */
const SUB_DIRECTORY = "/next-app-for-test";
const isProd = process.env.NODE_ENV == "production"

const nextConfig = {
  basePath: SUB_DIRECTORY,
  output: "export",
  // assetPrefix: isProd === "production" ? SUB_DIRECTORY : "",
  // publicRuntimeConfig: {
  //   basePath: isProd ? SUB_DIRECTORY : "",
  // }
};

export default nextConfig;
