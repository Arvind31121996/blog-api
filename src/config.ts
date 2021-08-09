const {
  PORT: port,
  DB_HOST: db_host,
  DB_USER: db_user,
  DB_NAME: db_name,
  DB_PORT: db_port,
  DB_PASSWORD: db_password,
} = process.env;

if (!port) {
  console.log("port number is not set");
  process.exit(-1);
}
if (!db_host || !db_user || !db_name || !db_port || !db_password) {
  console.log("one of the database details is missing");
  process.exit(-1);
}

const PORT = +port;
const DB_HOST = db_host;
const DB_USER = db_user;
const DB_NAME = db_name;
const DB_PORT = db_port;
const DB_PASSWORD = db_password;

export { DB_HOST, DB_USER, DB_NAME, DB_PORT, DB_PASSWORD, PORT };
