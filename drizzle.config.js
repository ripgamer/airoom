import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://airoom_owner:0adlcZE1xWJY@ep-restless-glade-a1c2zuzb.ap-southeast-1.aws.neon.tech/airoom?sslmode=require',
  },
});
