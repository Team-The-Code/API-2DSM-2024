import query from "./db";
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
