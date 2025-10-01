import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [{ hostname: 'static.wixstatic.com' }],
      formats: ['image/avif', 'image/webp'],
   },
   serverExternalPackages: ['@wix/sdk', '@wix/data'],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
