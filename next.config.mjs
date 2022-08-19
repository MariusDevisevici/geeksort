import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "i.ibb.co",
      "cdn.discordapp.com",
      "geeksort.vercel.app",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
});
