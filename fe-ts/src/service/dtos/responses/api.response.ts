export type ApiResponse<T> = {
  status: string;
  message?: string;
  todos?: T[];
  todo?: T;
};
