/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const moduleReplacement = new webpack.NormalModuleReplacementPlugin(
      /(.*)theme-a(\.*)/,
      function (resource) {
        resource.request = resource.request.replace(/theme-a/, `theme-b`);
      }
    );
    return {
      ...config,
      plugins: [...config.plugins, moduleReplacement],
    };
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
