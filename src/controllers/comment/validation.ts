import { body } from "express-validator";
import { Article } from "../../entities/mysql/Article";
import { Comment } from "../../entities/mysql/Comment";

import { isEntityValueValid } from "../../helpers";

export const createValidations = [
  body("content").notEmpty().bail().isString(),
  body("nickname").notEmpty().bail().isString(),
  body("articleId")
  .notEmpty()
  .bail()
  .custom(async (articleId) => {
    const result = await isEntityValueValid(articleId, Article);
    if (!result) {
      throw new Error("articleId does not exist.");
    }
  }),];

  export const createCommentOnCommentValidations = [
    body("content").notEmpty().bail().isString(),
    body("commentId")
    .notEmpty()
    .bail()
    .custom(async (commentId) => {
      const result = await isEntityValueValid(commentId, Comment);
      if (!result) {
        throw new Error("commentId does not exist.");
      }
    }),]
