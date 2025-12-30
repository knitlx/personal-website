/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        // Добавляем localhost для отладки
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Указываем порт, если он используется
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
