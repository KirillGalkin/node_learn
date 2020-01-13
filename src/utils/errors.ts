export class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(404, message || "Not found");
  }
}
