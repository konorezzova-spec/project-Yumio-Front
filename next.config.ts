import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["https://console.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ftp.goit.study" },
    ],
  },
  async headers() {
    return [
      {
        source: "/recipes/filter/:slug", // маршрут сторінки
        locale: false,
        headers: [
          {
            key: "Cache-Control", // Заголовок
            value: "public, max-age=300, must-revalidate", // кешуємо на 5 хв
          },
        ],
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
