// import { IUser } from "./models/user";
// import { IQuery } from "./models/query";
// import { createUsers } from "./utils/users";

// type RowByKey = {
//   [key: string]: any;
// };

// const users = createUsers(25);

// class Collection {
//   private keyColumn: keyof IUser = "id";
//   private rows: IUser[];
//   private indexedByKey: RowByKey = {};

//   private static returnAfterMs(value: any, ms = 100) {
//     return new Promise(resolve => setTimeout(() => resolve(value), ms));
//   }

//   constructor(rows: IUser[], keyColumn?: keyof IUser) {
//     this.rows = rows;
//     if (keyColumn) {
//       this.keyColumn = keyColumn;
//     }
//     rows.forEach(row => {
//       const key = row[this.keyColumn];
//       this.indexedByKey[key as string] = row;
//     });
//   }

//   async findOne(id: string) {
//     return await Collection.returnAfterMs(this.indexedByKey[id]);
//   }

//   async findAll(query?: IQuery) {
//     if (!query) {
//       return await Collection.returnAfterMs(this.rows);
//     }

//     const { search } = query;
//     let rows = this.rows;
//     if (query.filter) {
//       rows = rows.filter(row => row.login.includes(search));
//     }
//     if (query.sort) {
//       const direction = query.sort;
//       this.sortUsers(rows, direction);
//     }
//     if (query.limit) {
//       rows = this.rows.slice(0, query.limit);
//     }
//     return await Collection.returnAfterMs(rows);
//   }

//   private sortUsers(rows: IUser[], direction = "asc") {
//     const loginArray = rows.map(row => row.login);
//     const sortedLogins = loginArray.sort((a: string, b: string) => {
//       let result;
//       if (direction === "asc") {
//         result = a > b ? 1 : -1;
//       } else {
//         result = a > b ? -1 : 1;
//       }
//       return result;
//     });

//     return sortedLogins.map(login => rows.find(row => row.login === login));
//   }

//   async update(entity: IUser) {
//     const key = entity[this.keyColumn];
//     if (this.indexedByKey[key as string]) {
//       const fields = Object.keys(entity);
//       for (const field of fields) {
//         this.indexedByKey[key as string][field] = entity[field as keyof IUser];
//       }
//       return await Collection.returnAfterMs(this.indexedByKey[key as string]);
//     }
//     this.indexedByKey[entity.id] = entity;
//     return await Collection.returnAfterMs(this.indexedByKey[entity.id]);
//   }

//   async delete(id: string) {
//     this.indexedByKey[id].isDeleted = true;
//     return await Collection.returnAfterMs(this.indexedByKey[id]);
//   }
// }

// export const userCollection = new Collection(users);
