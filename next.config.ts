/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  typescript: {
    // !! WARN !!
    // This will suppress TypeScript errors during build
    // Only use this if you're confident about your type safety
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
