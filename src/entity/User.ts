import { users } from "./../../seeders/users.seed";
import { Group } from "./Group";
import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
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

  @DeleteDateColumn({ name: "deleted" })
  deletedAt?: Date;

  @ManyToMany(
    (type) => Group,
    (group) => group.users
  )
  @JoinTable({ name: "UserGroup" })
  groups: Group[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
