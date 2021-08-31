module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("PG_HOST", "127.0.0.1"),
        port: env.int("PG_PORT", 5432),
        database: env("PG_DATABASE", "my-strapi-project"),
        username: "postgres",
        password: env("PG_PASSWORD", "testing"),
        ssl: false,
      },
    },
    option: {
      ssl: false,
      pool: {
        min: 0,
        max: 15,
        idleTimoutMillis: 30000,
        createTimoutMillis: 30000,
        acquireTimoutMillis: 30000,
      },
    },
  },
});
