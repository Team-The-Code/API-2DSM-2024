import pool from "./db";


async function query(sql: string, params?: any[]) {
  try {
    const res = await pool.query(sql, params);
    if (res.command == "INSERT") {
      return res.rows[0];
    } else if (res.command == "SELECT") {
      return res.rows;
    } else if (res.command == "DELETE" || res.command == "UPDATE") {
      return { rowcount: res.rowCount };
    } else {
      return { sql };
    }
  } catch (e: any) {
    return { message: e.message };
  }
}
export default query;

async function init() {
  return await query(`
        START TRANSACTION;

        DROP TYPE IF EXISTS perfil_enum;
        CREATE TYPE profile_enum AS ENUM ('revisor', 'editor');

        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            mail VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL,
            profile profile_enum
        );

        COMMIT;
    `);
}
init()
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
