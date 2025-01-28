import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port:'',
        pathname:'/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port:'',
        pathname:'/**',
      },
      {
        protocol: 'https',
        hostname: 'mtxfjljpgcgjpzkqcfjb.supabase.co',
        port:'',
        pathname:'/**'
      }
    ],
  },
};


module.exports = nextConfig
// export default nextConfig;
