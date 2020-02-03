export interface IQuery {
  filter: {
    search: string;
  };
  sort: {
    direction?: "asc" | "desc";
  };
  limit?: number;
}
