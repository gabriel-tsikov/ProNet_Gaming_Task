interface PagedResponse<T> {
  data: T[];
  totalItems: number;
  page: number;
  pageSize: number;
}