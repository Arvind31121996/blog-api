import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  const orm = await MikroORM.init({
    debug: true,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    dbName: DB_NAME,
    type: "mysql",
    entities: ["./dist/entities/**"],
    cache: { enabled: false },
  });
  const generator = orm.getEntityGenerator();
  const dump = await generator.generate({
    save: true,
    baseDir: process.cwd() + "/my-entities",
  });
  console.log(dump);
  await orm.close(true);
})();
