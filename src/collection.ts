import { IUser } from "./models/user";
import { IQuery } from "./models/query";
import { createUsers } from "./utils/users";

type RowByKey = {
  [key: string]: any;
};

const users = createUsers(25);

class Collection {
  private keyColumn: keyof IUser = "id";
  private rows: IUser[];
  private indexedByKey: RowByKey = {};

  private static returnAfterMs(value: any, ms = 100) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
  }

  constructor(rows: IUser[], keyColumn?: keyof IUser) {
    this.rows = rows;
    if (keyColumn) {
      this.keyColumn = keyColumn;
    }
    rows.forEach(row => {
      const key = row[this.keyColumn];
      this.indexedByKey[key as string] = row;
    });
  }

  async findOne(id: string) {
    return await Collection.returnAfterMs(this.indexedByKey[id]);
  }

  async findAll(query?: IQuery) {
    if (!query) {
      return await Collection.returnAfterMs(this.rows);
    }

    const { field, search } = query;
    let rows = this.rows;

    if (query.filter) {
      rows = rows.filter(row => row[field].includes(search));
    }
    if (query.sort) {
      rows = rows.sort();
    }
    if (query.limit) {
      rows = rows.slice();
    }

    return await Collection.returnAfterMs(rows);

    // TODO
  }

  async insert(entity: IUser) {
    this.rows.push(entity);
    this.indexedByKey[this.keyColumn] = entity;
    return await Collection.returnAfterMs(true);
  }

  async update(entity: IUser) {
    const key = entity[this.keyColumn];
    if (this.indexedByKey[key as string]) {
      const fields = Object.keys(entity);
      for (const field of fields) {
        this.indexedByKey[key as string][field] = entity[field as keyof IUser];
      }
      return await Collection.returnAfterMs(true);
    }
    return await Collection.returnAfterMs(false);
  }

  async delete(id: string) {
    this.indexedByKey[id].isDeleted = true;
    return await Collection.returnAfterMs(true);
  }
}

// get /user/:id
// get /user
// post /user
// put /uesr/:id
// delete /user/:id

export const userCollection = new Collection(users);
