import { AnyEntity, EntityName, QueryOrder } from "@mikro-orm/core";
import { DI } from "..";

export function getFilterQueryOptions(fields: string[], query: any) {
  const queryOptions: any = {};
  fields.forEach((field) => {
    if (query[field]) {
      queryOptions[field] = query[field];
    }
  });
  return queryOptions;
}
export function generateSortOptions(fields: string[], params: string[]) {
  const options: any = {};
  params.forEach((param) => {
    const parameter = param.trim();
    if (parameter.startsWith("-") && fields.includes(parameter.substring(1))) {
      options[parameter.substring(1)] = QueryOrder.DESC;
    } else if (fields.includes(parameter)) {
      options[parameter] = QueryOrder.ASC;
    }
  });
  return options;
}
export function getSelectedFields(
  fields: string[],
  param: string
): string[] | undefined {
  const options: string[] = [];
  const params = param.split(",");
  params.forEach((param) => {
    if (fields.includes(param)) {
      options.push(param);
    }
  });
  if (options === []) {
    return undefined;
  } else {
    return options;
  }
}

export async function isEntityValueValid<T extends AnyEntity<T>>(
  value: string,
  entity: EntityName<T>,
) {
  let options: any = { id: value };
  const em = DI.em.fork();
  const result = await em.findOne(entity, options);
  return result ? true : false;
}
