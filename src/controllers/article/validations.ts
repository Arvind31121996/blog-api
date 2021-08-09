import { body } from "express-validator";

export const createValidations = [
  body("title").notEmpty().bail().isString(),
  body("nickname").notEmpty().bail().isString(),
  body("content").notEmpty().bail().isString(),
];
