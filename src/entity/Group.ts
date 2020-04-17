import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  BeforeInsert,
} from "typeorm";
import { v4 } from "uuid";

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

@Entity({ name: "Groups" })
export class Group extends BaseEntity {
  constructor(group: Partial<Group>) {
    super();
    Object.assign(this, group);
  }
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({
    type: "enum",
    enum: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
    default: "READ",
  })
  permissions: Permission[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
