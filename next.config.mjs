// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   /* config options here */
//    images: {
//     domains: ['i.ibb.co.com', 'i.ibb.co', 'images.unsplash.com'],
//      unoptimized: true,
//   },
//    trailingSlash: true,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  /* config options here */
  images: {
    domains: ['i.ibb.co.com', 'i.ibb.co', 'images.unsplash.com'],
    unoptimized: true,
  },
  trailingSlash: true, // Change to false to avoid trailing slash issues
  
  // Add this to handle rewrites (only works in development)
  async rewrites() {
    return [
      {
        source: '/product/:slug',
        destination: '/product?id=:slug',
      },
    ];
  },
};

export default nextConfig;