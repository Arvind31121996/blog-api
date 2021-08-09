import { Entity, 
    Property, 
    PrimaryKey,
   } from "@mikro-orm/core";
  import moment from "moment";
  
  @Entity({ tableName: "comment_history" })
  export class CommentHistory {
    @PrimaryKey({ fieldName: "id"})
    id: string | number;
  
    @Property({ fieldName: "comment_id" })
    commentId: string | number;
  
    @Property({ fieldName: "content" })
    content: string;
  
    @Property({ fieldName: "is_active" })
    isActive: number;
  
    @Property({ fieldName: "is_deleted" })
    isDeleted: number;
  
    @Property({ fieldName: "created_at" })
    createdAt:  Date = moment().utc().toDate();
  
    @Property({ fieldName: "modified_at" })
    modifiedAt: Date = moment().utc().toDate();
  }
  