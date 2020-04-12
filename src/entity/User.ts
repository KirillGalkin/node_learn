import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryColumn
} from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "text" })
  login: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ type: "boolean" })
  isDeleted: boolean;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
