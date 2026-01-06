const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination: "http://localhost:3001/register",
        permanent: true,
      },
      {
        source: "/login",
        destination: "http://localhost:3001/login",
        permanent: true,
      },
      {
        source: "/user/:path*",
        destination: "http://localhost:3001",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
