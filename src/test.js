class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message || "Not found");
  }
}

const err = new NotFoundError();
console.log(err instanceof ApiError);
