export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedPayload<T> = {
  items: T[];
  meta: Meta;
};

export type NonPaginatedPayload<T> = T[];

export type ObjectPayload<T> = T;

// 🎯 Tres variantes: "paginated", "array", "object"
export default interface IGeneralResponse<
  T,
  IsPaginated extends true | false | undefined = undefined
> {
  success: boolean;
  statusCode: number;
  message: string;
  data: IsPaginated extends true
    ? PaginatedPayload<T> // listado con meta
    : IsPaginated extends false
    ? NonPaginatedPayload<T> // array sin meta
    : ObjectPayload<T>; // objeto plano
}
