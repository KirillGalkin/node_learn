import { IUser } from "./models/user";
import { IQuery } from "./models/query";
import { createUsers } from "./utils/users";

type RowByKey = {
  [key: string]: any;
};

const users = createUsers(25);

class Collection {
  private rows: IUser[];
  private indexedByKey: RowByKey = {};

  private static returnAfterMs(value: any, ms = 100) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
  }

  constructor(rows: IUser[]) {
    this.rows = rows;
    rows.forEach(row => {
      const key = row.id;
      this.indexedByKey[key] = row;
    });
  }

  async findOne(id: string) {
    return await Collection.returnAfterMs(this.indexedByKey[id]);
  }

  async findAll(query?: IQuery) {
    if (!query) {
      return await Collection.returnAfterMs(this.rows);
    }
    return await Collection.returnAfterMs(this.rows);

    // TODO
  }

  //   async insert(entity: IUser) {
  //     this.rows.push(entity);
  //     this.indexedByKey[this.keyColumn] = entity;
  //     return await Collection.returnAfterMs(true);
  //   }

  // async update(entity) {
  //     if (this.indexedByKey[]) {
  //         const keyValue = entity[this.keyColumn];
  //         this.rows = this.rows.map(e => {
  //             const key = e[this.keyColumn];
  //             if (key === keyValue) {
  //                 return entity;
  //             }
  //             return e;
  //         });
  //         this.indexedByKey[keyValue] = entity;
  //         return await Collection.returnAfterMs(true);
  //     }
  //     return await Collection.returnAfterMs(false);
  // }

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
