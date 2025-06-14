import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */theme: {
    extend: {
      backdropBlur: {
        xs: '1px',
      }
    }
  }
};

export default nextConfig;
