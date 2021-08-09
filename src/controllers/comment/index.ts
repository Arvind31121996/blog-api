import { Request, Response } from "express";
import { Comment } from "../../entities/mysql/Comment";
import { CommentHistory } from "../../entities/mysql/CommentHistory";
import { DI } from "../..";

import { wrap } from "@mikro-orm/core";
import {
  generateResponse,
  internalServerErrorResponse,
} from "../../helpers/response";

export async function getAllComments(req: Request, res: Response) {
  const id = req.params["articleId"];
  const connection = DI.em.getConnection();
  const data = await connection.execute(`select comment.content as comment, 
  comment_history.content as sub_comment
  from comment INNER JOIN comment_history 
  on comment.id = comment_history.comment_id and comment.article_id = ${id} group by comment_history.comment_id`);
  return res
    .status(200)
    .json(generateResponse(200, "success", { commentList: data }));
}

export async function createComment(req: Request, res: Response) {
  try {
    const em = DI.em.fork();
    const comment = new Comment();
    wrap(comment).assign(req.body);
    await em.persist(comment).flush();
    return res.status(200).json(generateResponse(200, "success"));
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res);
  }
}

export async function commentOnComment(req: Request, res: Response) {
  try {
    const em = DI.em.fork();
    const comment = new CommentHistory();
    wrap(comment).assign(req.body);
    await em.persist(comment).flush();
    return res.status(200).json(generateResponse(200, "success"));
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res);
  }
}
