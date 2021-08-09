import { Response } from "express";

export function generateResponse(
  statusCode: number,
  message: string,
  data: unknown = {}
) {
  const response = {
    response: {
      statusCode,
      message,
      data,
    },
  };
  return response;
}
export function generateErrorResponse(
  statusCode: number,
  message: string,
  errors: unknown = {}
) {
  const response = {
    response: {
      statusCode,
      message,
      errors,
    },
  };
  return response;
}
export function notFoundResponse(res: Response) {
  return res.status(404).json({
    response: {
      statusCode: 404,
      message: "failed",
      data: {},
    },
  });
}
export function internalServerErrorResponse(res: Response) {
  return res.status(500).json({
    response: {
      statusCode: 500,
      message: "failed",
      data: {},
    },
  });
}
