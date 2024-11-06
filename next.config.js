// next.config.js
export default {
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "https://cashhh.onrender.com/socket.io/:path*",
      },
    ];
  },
};
