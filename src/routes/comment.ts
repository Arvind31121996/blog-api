import { Router } from "express";
import {
  getAllComments,
  createComment,
  commentOnComment,
} from "../controllers/comment";
import {
  createValidations,
  createCommentOnCommentValidations,
} from "../controllers/comment/validation";
import { validate } from "../middlewares/validator";
const router = Router();

router.post("/v1/comment", createValidations, validate, createComment);
router.get("/v1/article-comment/:articleId", getAllComments);

// route for comment on comment
router.post(
  "/v1/comment-comment",
  createCommentOnCommentValidations,
  validate,
  commentOnComment
);

export default router;
