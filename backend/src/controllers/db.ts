import { Pool } from "pg";

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bdabp',
  password: '123',
  port: 5432
});

export default pool;