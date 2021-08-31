module.exports = ({ env }) => ({
  host: env("PG_HOST", "127.0.0.1"),
  port: env.int("PORT", 1337),
  production: true,
  proxy: {
    enabled: false,
  },
  cron: {
    enabled: false,
  },
  admin: {
    autoOpen: false,
  },
});
