/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: 'http://localhost:5000/api'
    // API_URL: 'http://10.0.90.76:5000/api'
  }
}

module.exports = nextConfig
