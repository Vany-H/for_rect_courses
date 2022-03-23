module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5000,
  username: process.env.DB_MIGRATOR_USER || 'develop',
  password: process.env.DB_MIGRATOR_PASS || 'develop',
  database: process.env.DB_NAME || 'dochub',
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
