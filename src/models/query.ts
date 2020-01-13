export interface IQuery {
  filter: {
    field: string;
    search: string;
  };
  sort: string || {
    field: string
    direction: ||
  };
  limit: number;
  offset: number;
}
