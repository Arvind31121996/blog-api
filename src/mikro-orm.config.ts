import { Options } from "@mikro-orm/core";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

const options: Options = {
  type: "mysql",
  entities: ["./dist/entities/**"],
  debug: true,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dbName: DB_NAME,
  cache: { enabled: false },
  forceUtcTimezone: true,
  // validate: true,
  // strict: true,
};

export default options;
