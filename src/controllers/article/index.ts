import { Request, Response } from "express";
import { Article } from "../../entities/mysql/Article";
import { DI } from "../..";
import {
  generateSortOptions,
  getFilterQueryOptions,
  getSelectedFields,
} from "../../helpers";
import { QueryOrder, wrap } from "@mikro-orm/core";
import {
  generateResponse,
  internalServerErrorResponse,
  notFoundResponse,
} from "../../helpers/response";

export async function getArticleById(req: Request, res: Response) {
  const em = DI.em.fork();
  const id = req.params["id"];
  const data = await em.findOne(Article, { id });
  if (!data) {
    return notFoundResponse(res);
  }

  return res.status(200).json(generateResponse(200, "success", data));
}

export async function getAllArticleList(req: Request, res: Response) {
  const em = DI.em.fork();

  let limit = 10;
  if (req.query["limit"]) {
    limit = Math.abs(+req.query["limit"]) || 20;
  }
  let offset = 0;
  if (req.query["page"]) {
    let page = Math.abs(+req.query["page"]) || 1;
    offset = (page - 1) * limit;
  }

  const ArticleFields = ["id", "title", "nickname", "created_at"];

  const filterQueryOptions = getFilterQueryOptions(ArticleFields, req.query);

  let fields = undefined;
  if (req.query["fields"]) {
    fields = getSelectedFields(ArticleFields, String(req.query["fields"]));
  } else {
    fields = ["id", "title", "nickname", "created_at"];
  }

  console.log(req.query["sort"]);
  let orderBy = {};
  if (req.query["sort"]) {
    const sort = String(req.query["sort"]).split(",");
    orderBy = generateSortOptions(ArticleFields, sort);
  } else {
    orderBy = { id: QueryOrder.DESC };
  }
  console.log(orderBy);

  const [data, totalCount] = await em.findAndCount(
    Article,
    filterQueryOptions,
    {
      limit,
      offset,
      orderBy,
      fields,
    }
  );
  return res
    .status(200)
    .json(generateResponse(200, "success", { articleList: data, totalCount }));
}

export async function createArticle(req: Request, res: Response) {
  try {
    const em = DI.em.fork();
    const article = new Article();
    wrap(article).assign(req.body);
    await em.persist(article).flush();
    return res
      .status(200)
      .json(generateResponse(200, "Article Added Successfull"));
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res);
  }
}
