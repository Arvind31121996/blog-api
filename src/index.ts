import * as dotenv from "dotenv";
dotenv.config();

import { MikroORM, EntityManager } from "@mikro-orm/core";
import express, { Request, Response, NextFunction } from "express";
import options from "./mikro-orm.config";
import apis from "./routes/apis";
import { generateResponse, notFoundResponse } from "./helpers/response";
import { PORT } from "./config";
import cors from "cors";
const app = express();

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};
(async () => {
  DI.orm = await MikroORM.init(options);
  DI.em = DI.orm.em;
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    (
      error: Error,
      _request: Request,
      _response: Response,
      next: NextFunction
    ) => {
      if (error instanceof SyntaxError) {
        return generateResponse(400, "Invalid request");
      }
      return next();
    }
  );

  app.use("/api", apis);
  app.use((_req, res) => notFoundResponse(res));

  app.listen(PORT, () => {
    console.log(`Listening in ${PORT}`);
    app.emit("appStarted");
  });
})();

export { app };
