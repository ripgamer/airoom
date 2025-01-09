// drizzle.config.js
export default {
  schema: './config/schema.js',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
      connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};