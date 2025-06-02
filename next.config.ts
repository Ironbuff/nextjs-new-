import type { NextConfig } from "next";


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE
const apiDomain = apiBaseUrl ? new URL(apiBaseUrl).hostname : null; // Extract the hostname
const nextConfig: NextConfig = {
  /* config options here */
  images:{
       domains: ["media.istockphoto.com", apiDomain] // Ensures valid entries
  },
};

export default nextConfig;
