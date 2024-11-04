/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value:
              "interest-cohort=(),private-state-token-redemption=(),private-state-token-issuance=(),browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default config;
