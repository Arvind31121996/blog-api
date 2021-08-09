import { Router } from "express";
import {
  getArticleById,
  getAllArticleList,
  createArticle,
} from "../controllers/article";
import { createValidations } from "../controllers/article/validations";
import { validate } from "../middlewares/validator";
const router = Router();

router.get("/v1/article/:id", getArticleById);
router.post("/v1/article", createValidations, validate, createArticle);
router.get("/v1/article", getAllArticleList);

export default router;
