
export default interface IServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}