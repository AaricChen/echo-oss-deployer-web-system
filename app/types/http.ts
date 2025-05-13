export interface HttpResponse<T> {
  id: string;
  code: string;
  message: string;
  data: T;
}
