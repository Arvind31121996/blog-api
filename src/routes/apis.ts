import { NextFunction, Router, Request, Response } from "express";
import articleAPI from "./article";
import commentAPI from "./comment";

const router = Router({ caseSensitive: false });

router.use(sanatizeCreatedAt);
router.use(articleAPI);
router.use(commentAPI);

export default router;

function sanatizeCreatedAt(req: Request, _res: Response, next: NextFunction) {
  delete req.body["id"];
  delete req.body["createdAt"];
  delete req.body["modifiedAt"];
  next();
}
