
export default interface IActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}