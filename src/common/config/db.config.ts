export default () => ({
  database: {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    host: 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    name: process.env.DB_NAME || 'VKR',
    sync: true, // !!process.env.DB_SYNCHRONIZE,
    logging: 'all',
  },
});
