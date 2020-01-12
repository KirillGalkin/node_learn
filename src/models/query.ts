export interface IQuery {
  filter: {
    field: string;
    search: string;
  };
  sort: string;
  limit: number;
}
