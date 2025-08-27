import type { NextConfig } from "next";
import { withBetterStack } from "@logtail/next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withBetterStack(withNextIntl(nextConfig));
