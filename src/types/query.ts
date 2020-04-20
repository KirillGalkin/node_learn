export interface IQuery {
  search: string;
  sort: "ASC" | "DESC";
  limit?: number;
}
