import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE;
const apiDomain = apiBaseUrl ? new URL(apiBaseUrl).hostname : null; // Extract the hostname
const nextConfig: NextConfig = {
  /* config options here */
  images:{
       domains: ["media.istockphoto.com", apiDomain,"3dda-182-93-84-47.ngrok-free.app"] // Ensures valid entries
  },
};

export default nextConfig;
