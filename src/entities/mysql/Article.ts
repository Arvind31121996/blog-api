import { 
  Entity, 
  Property, 
  PrimaryKey,
} from "@mikro-orm/core";
import moment from "moment";


@Entity({ tableName: "article" })
export class Article {
  @PrimaryKey({ fieldName: "id"})
  id: string | number;

  @Property({ fieldName: "title" })
  title: string;

  @Property({ fieldName: "content" })
  content: string;

  @Property({ fieldName: "nickname" })
  nickname: string;

  @Property({ fieldName: "is_active" })
  isActive: number;

  @Property({ fieldName: "is_deleted" })
  isDeleted: number;

  @Property({ fieldName: "created_at" })
  createdAt:  Date = moment().utc().toDate();

  @Property({ fieldName: "modified_at" })
  modifiedAt: Date = moment().utc().toDate();
}
